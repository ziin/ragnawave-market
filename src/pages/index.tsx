import axios from "axios";
import Head from "next/head";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import { ResponseData, Data } from "@common/types";
import { filterItemsFromShops, mapDataToItems } from "../common/functions";

export default function Home() {
  const [data, setData] = useState<Data | null>(null);
  const [param, setParam] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  async function handleSearch(e: FormEvent) {
    e.preventDefault();
    const value = inputRef.current?.value || "";
    setParam(value.toLowerCase());
  }

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
              <th>Item</th>
              <th>Preço</th>
              <th>Quantidade</th>
              <th>Localicação</th>
              <th>Vendedor</th>
              <th>Bônus</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.results.map(({ item, location, vendorName }, index) => (
                <tr key={index}>
                  <td>
                    <img
                      alt={item.name}
                      src={`http://www.ragnawave.com.br/dist/db/items/${item.nameid}.png`}
                    />
                    {item.name}
                  </td>
                  <td>{item.price}</td>
                  <td>{item.amount}</td>
                  <td>{location}</td>
                  <td>{vendorName}</td>
                  <td>
                    {item.options.reduce((acc, cur) => `${acc} | ${cur}`, "")}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
