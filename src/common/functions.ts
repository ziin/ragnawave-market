import { getItemsById, getItemsByName } from "../services/api";
import { SearchData, SearchResult, Shop } from "./types";

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

export function mapShopItemsToSearchResult(shops: Shop[]): SearchResult[] {
  return shops
    .map((shop) => {
      return shop.items.map((item) => ({
        shopId: shop.id,
        vendorId: shop.char_id,
        vendorName: shop.char_name,
        location: shop.mapname,
        shopName: shop.shop_name,
        item: item,
      }));
    })
    .flat();
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

export async function getItems(
  searchTerm: string
): Promise<SearchData | undefined> {
  // check if search term is an ID
  const isId = !!searchTerm.match(/^[0-9]*$/);

  const data = isId
    ? await getItemsById(searchTerm)
    : await getItemsByName(searchTerm);

  if (!data) return undefined;

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
