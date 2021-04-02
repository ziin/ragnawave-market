import React, { useEffect, useMemo, useState } from "react";
import Head from "next/head";
import { useForm } from "react-hook-form";

import { SearchData } from "@common/types";
import { formatPrice, getItems } from "@common/functions";
import ItemImage from "@components/ItemImage";
import { filterValues } from "../common/filters";
import Checkbox from "../components/Checkbox";

interface Filters {
  atq: boolean;
  matq: boolean;
  precisao: boolean;
  hp: boolean;
  sp: boolean;
  spRegen: boolean;
  hpRegen: boolean;
  cura: boolean;
  conjuracaoDelay: boolean;
  conjuracaoTime: boolean;
  danoDistancia: boolean;
  def: boolean;
  mdef: boolean;
  critico: boolean;
  aspd: boolean;
  indestrutivel: boolean;
}

enum Races {
  humanoide = "humanoide",
  planta = "planta",
  mortovivo = "mortovivo",
  anjo = "anjo",
  demonio = "demonio",
  amorfo = "amorfo",
  inseto = "inseto",
  dragao = "dragao",
  peixe = "peixe",
  bruto = "bruto",
}

enum Elements {
  agua = "agua",
  fogo = "fogo",
  vento = "vento",
  terra = "terra",
  fantasma = "fantasma",
  sombrio = "sombrio",
  neutro = "neutro",
  maldito = "maldito",
  veneno = "veneno",
}

interface SelectFilters {
  danoFisicoRaca: Races | "nenhum";
  danoFisicoElemento: Races | "nenhum";
  reducaoDanoRaca: Races | "nenhum";
  reducaoDanoElemento: Elements | "nenhum";
  ignorarDefRaca: Races | "nenhum";
  ignorarDefMRaca: Races | "nenhum";
}

const defaultSelectFilters: SelectFilters = {
  danoFisicoRaca: "nenhum",
  danoFisicoElemento: "nenhum",
  reducaoDanoRaca: "nenhum",
  reducaoDanoElemento: "nenhum",
  ignorarDefRaca: "nenhum",
  ignorarDefMRaca: "nenhum",
};

interface FormFields {
  searchTerm: string;
}

const defaultFilters: Filters = {
  atq: false,
  matq: false,
  precisao: false,
  hp: false,
  sp: false,
  spRegen: false,
  hpRegen: false,
  cura: false,
  conjuracaoDelay: false,
  conjuracaoTime: false,
  danoDistancia: false,
  def: false,
  mdef: false,
  critico: false,
  aspd: false,
  indestrutivel: false,
};

// const _getKeyValue_ = (key: string) => (obj: Record<string, any>) =>
//   obj[key];
// const resolved = Object.keys(filters)
//   .filter((key) => _getKeyValue_(key)(filters))
//   .map((key) => filterMap.get(key));

export default function Home() {
  const [data, setData] = useState<SearchData | null>(null);
  const [dataFiltered, setDataFiltered] = useState<SearchData | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [selects, setSelects] = useState<SelectFilters>(defaultSelectFilters);
  const { register, handleSubmit } = useForm<FormFields>();

  function onSubmit(data: FormFields) {
    const { searchTerm } = data;
    console.log(searchTerm);

    setSearchTerm(searchTerm.trim());
  }

  function handleCheckboxFilterChange(key: keyof Filters) {
    setFilters({ ...filters, [key]: !filters[key] });
  }
  function handleSelectFilterChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setSelects({ ...selects, [e.target.name]: e.target.value });
  }

  // Check if results has some bonuses
  const hasBonus = useMemo(
    () => data?.results.some((result) => result.item.options.length > 0),
    [dataFiltered]
  );

  // Filtering
  useEffect(() => {
    // console.log(filters);
    // console.log(
    //   Object.keys(filters)
    //     .filter((key) => filters[key])
    //     .map((key) => filterValues[key])
    // );
    console.log(selects);

    if (data) {
      console.log("apply filter");

      const values = Object.keys(filters)
        .filter((key) => filters[key])
        .map((key) => filterValues[key]);

      const filtered = data.results.filter((result) => {
        return values.every((value) =>
          result.item.options.some((bonus) => bonus.includes(value))
        );
      });

      setDataFiltered({
        ...data,
        total: filtered.length,
        results: filtered,
      });
    }
  }, [data, filters, selects]);

  // Request when query.name change
  useEffect(() => {
    async function doRequest() {
      const items = await getItems(searchTerm);
      console.log("Requesting...");
      setData(items || null);
    }

    if (searchTerm.length > 0) {
      doRequest();
    }
  }, [searchTerm]);

  return (
    <div>
      <Head>
        <title>Ragnawave Market</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="searchTerm"
            name="searchTerm"
            ref={register}
          />

          <input type="submit" value="Pesquisar" />
        </form>
        <Checkbox
          label="ATQ"
          onClick={() => handleCheckboxFilterChange("atq")}
          checked={filters.atq}
        />

        <Checkbox
          label="ASPD"
          onClick={() => handleCheckboxFilterChange("aspd")}
          checked={filters.aspd}
        />

        <select onChange={handleSelectFilterChange} name="danoFisicoRaca">
          <option value="nenhum">Nenhum</option>
          <option value="humanoide">Humanóide</option>
          <option value="planta">Planta</option>
          <option value="mortovivo">Morto-Vivo</option>
          <option value="anjo">Anjo</option>
          <option value="demonio">Demônio</option>
          <option value="amorfo">Amorfo</option>
          <option value="inseto">Inseto</option>
          <option value="dragao">Dragão</option>
          <option value="peixe">Peixe</option>
          <option value="bruto">Bruto</option>
        </select>

        <table>
          <thead>
            <tr>
              <th>Qnt</th>
              <th>Item</th>
              {hasBonus && <th>Bônus</th>}
              <th>Preço</th>
            </tr>
          </thead>
          <tbody>
            {dataFiltered &&
              dataFiltered.results.map(({ item }, index) => (
                <tr key={index}>
                  <td>{item.amount}</td>
                  <td>
                    <ItemImage id={item.nameid} alt={item.name} />
                    {item.name}
                    <ul>
                      {item.cards &&
                        item.cards.map((card, i) => (
                          <li key={i}>
                            <ItemImage
                              id={card.card_id}
                              alt={card.card_name}
                              size={18}
                            />
                            {card.card_name}
                          </li>
                        ))}
                    </ul>
                  </td>
                  {hasBonus && (
                    <td>
                      <ul>
                        {item.options.map((bonus, i) => (
                          <li key={i}>{bonus}</li>
                        ))}
                      </ul>
                    </td>
                  )}
                  <td>{formatPrice(item.price)}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
