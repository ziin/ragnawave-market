import { getItemsById, getItemsByName } from "../services/api";
import {
  BonusType,
  Bonus,
  Item,
  Upon,
  SearchData,
  SearchItem,
  SearchResult,
  Shop,
  Race,
  Property,
} from "./types";

const mapBonusTypes = new Map<BonusType, string>([
  [BonusType.ATQ, "ATQ +"],
  [BonusType.PRECISAO, "Precisão"],
  [BonusType.MATQ, "MATQ +"],
  [BonusType.HP, "Máx. HP"],
  [BonusType.SP, "Máx. SP"],
  [BonusType.HP_REGEN, "Recuperação de HP"],
  [BonusType.SP_REGEN, "Recuperação de SP"],
  [BonusType.CURA, "Aumenta a Cura de Habilidades"],
  [BonusType.DEF, "DEF +"],
  [BonusType.MDEF, "DEFM +"],
  [BonusType.CRIT, "Taxa de Ataques Críticos"],
  [BonusType.ASPD, "Velocidade de Ataque"],
  [BonusType.FOR, "FOR +"],
  [BonusType.VIT, "VIT +"],
  [BonusType.AGI, "AGI +"],
  [BonusType.INT, "INT +"],
  [BonusType.DES, "DES +"],
  [BonusType.SOR, "SOR +"],
  [BonusType.CONJ_DELAY, "Reduz o tempo do atraso"],
  [BonusType.DANO_DIST, "Aumenta o ATK a distância"],
  [BonusType.CONJ_TIME, "Reduz o tempo de lançamento"],
  [BonusType.INDESTRUCT, "Indestrutível em batalha"],
  [BonusType.ATK_RACE, "Dano Físico contra a raça"],
  [BonusType.ATK_ELEMENT, "Dano físico contra a propriedade"],
  [BonusType.DEF_RACE, "dano causado por monstros da raça"],
  [BonusType.DEF_ELEMENT, "Resistência a propriedade"],
  [BonusType.IGNORE_DEF_RACE, "da DEF de monstros da raça"],
  [BonusType.IGNORE_DEFM_RACE, "da MDEF de monstros da raça"],
]);

export function filterItemsFromVendorShopByName(
  shops: Shop[],
  name: string
): Shop[] {
  return shops.map((shop) => ({
    ...shop,
    items: shop.items.filter((item) =>
      item.name.toLowerCase().includes(name.toLowerCase())
    ),
  }));
}

export function filterItemsFromVendorShopById(
  shops: Shop[],
  id: number
): Shop[] {
  return shops.map((shop) => ({
    ...shop,
    items: shop.items.filter((item) => item.nameid === id),
  }));
}

function getBonusType(str: string): BonusType {
  const bonusType = Object.keys(BonusType).find((key) =>
    str.match(new RegExp(`\\b(${mapBonusTypes.get(BonusType[key])})`, "i"))
  );
  return BonusType[bonusType];
}

function getValue(str: string): number {
  const res = str.match(/\d+/g);
  if (!res) return 0;
  return Number(res.pop());
}

function getRace(str: string): Upon {
  // these two ifs below only exist due the inconsistent of the api
  if (str.includes("Humanoide")) {
    str = str.replace("Humanoide", Race.humanoide);
  }
  if (str.includes("Maldito")) {
    str = str.replace("Maldito", Race.mortovivo);
  }
  if (str.includes("Dêmonio")) {
    str = str.replace("Dêmonio", "Demônio");
  }
  const upon = Object.values(Race).find((race) => str.includes(race));
  return upon || null;
}

function getProperty(str: string): Upon {
  const property = Object.values(Property).find((property) =>
    str.includes(property)
  );
  return property || null;
}

function mapOptionsToBonus(options: string[]): Bonus[] {
  return options.map((option) => {
    const type = getBonusType(option);
    const value = getValue(option);

    let upon: Upon = null;
    if (
      type === BonusType.ATK_RACE ||
      type === BonusType.DEF_RACE ||
      type === BonusType.IGNORE_DEFM_RACE ||
      type === BonusType.IGNORE_DEF_RACE
    ) {
      upon = getRace(option);
    } else if (
      type === BonusType.ATK_ELEMENT ||
      type === BonusType.DEF_ELEMENT
    ) {
      upon = getProperty(option);
    }

    return {
      type: type,
      upon,
      value,
      raw: option,
    };
  });
}

function mapItemToSearchItem(item: Item): SearchItem {
  return {
    id: item.nameid,
    name: item.name,
    slot: item.slot,
    amount: item.amount,
    price: item.price,
    refine: item.refine,
    creator: item.creator,
    cards: item.cards,
    bonus: mapOptionsToBonus(item.options),
  };
}

export function mapShopItemsToSearchResult(shops: Shop[]): SearchResult[] {
  return shops
    .map((shop) => {
      return shop.items.map((item) => ({
        shopId: shop.id,
        vendorId: shop.char_id,
        vendorName: shop.char_name,
        location: shop.mapname,
        shopName: shop.shop_name,
        item: mapItemToSearchItem(item),
      }));
    })
    .flat();
}

export async function getItems(
  searchTerm: string
): Promise<SearchData | undefined> {
  // check if search term is an ID
  const isId = !!searchTerm.match(/^[0-9]*$/);

  let data = isId
    ? await getItemsById(searchTerm, 1)
    : await getItemsByName(searchTerm, 1);

  if (!data) return null;

  while (data.page < data.maxPages) {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const res = isId
      ? await getItemsById(searchTerm, data.page + 1)
      : await getItemsByName(searchTerm, data.page + 1);
    if (res) {
      data = { ...res, rows: data.rows.concat(res.rows) };
    }
  }

  const shopItemsFiltered = isId
    ? filterItemsFromVendorShopById(data.rows, Number(searchTerm))
    : filterItemsFromVendorShopByName(data.rows, searchTerm);

  const formatted: SearchData = {
    filters: data.filters,
    interval: data.interval,
    maxPages: data.maxPages,
    page: data.page,
    perPage: data.rowsPerPage,
    total: data.totalRows,
    results: mapShopItemsToSearchResult(shopItemsFiltered),
  };

  return formatted;
}

export function formatPrice(price: number): string {
  return Intl.NumberFormat().format(price);
}

export function getPriceColor(price: number) {
  switch (true) {
    case price < 100000:
      return "#FF18FF";
    case price < 1000000:
      return "#4948e8";
    case price < 10000000:
      return "#186A18";
    case price < 100000000:
      return "#FF0000";
    default:
      return "#FF18FF";
  }
}

export function getFiltersFromDataResult(data: SearchData) {
  return Array.from(
    Array.from(
      data.results
        .map((result) => result.item.bonus.map((bonus) => bonus))
        .reduce((acc, cur) => acc.concat(cur), [])
    )
      .reduce(
        (acc, bonus, _, arr) => (
          acc.set(bonus.type, {
            type: bonus.type,
            upon: bonus.upon
              ? Array.from(
                  new Set([
                    ...arr
                      .filter((b) => b.type === bonus.type)
                      .map((b) => b.upon)
                      .reduce((acc, cur) => acc.concat(cur), []),
                  ])
                )
              : null,
          }),
          acc
        ),
        new Map()
      )
      .values()
  );
}
