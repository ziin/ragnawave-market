import axios from "axios";
import Head from "next/head";
import React, { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { ResponseData, Data } from "@common/types";
import {
  filterItemsFromShops,
  formatPrice,
  mapDataToItems,
} from "../common/functions";
import ItemImage from "../components/ItemImage";

export default function Home() {
  const [data, setData] = useState<Data | null>(null);
  const [param, setParam] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  async function handleSearch(e: FormEvent) {
    e.preventDefault();
    const value = inputRef.current?.value || "";
    setParam(value.toLowerCase());
  }

  // Check if results has some bonuses
  const hasBonus = useMemo(
    () => data?.results.some((result) => result.item.options.length > 0),
    [data]
  );

  // request when param change
  useEffect(() => {
    async function request() {
      const { data } = await axios.get<ResponseData>(
        `https://ws.ragnawave.com.br/mercado/list?rowsPerPage=100&page=1&name=${param}`
      );
      const filtered = filterItemsFromShops(data.rows, param);
      const formatted = {
        filters: data.filters,
        interval: data.interval,
        maxPages: data.maxPages,
        page: data.page,
        perPage: data.rowsPerPage,
        total: data.totalRows,
        results: mapDataToItems(filtered),
      };
      console.log(formatted);
      setData(formatted);
    }

    if (param.length > 0) {
      request();
    }
  }, [param]);

  // componentDidMount
  useEffect(() => inputRef.current?.focus(), []);

  return (
    <div>
      <Head>
        <title>Ragnawave Market</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <form onSubmit={handleSearch}>
          <input ref={inputRef} />
          <button type="submit">Buscar</button>
        </form>

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
            {data &&
              data.results.map(({ item }, index) => (
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
