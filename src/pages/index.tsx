import React, { useEffect, useMemo, useState } from "react";
import Head from "next/head";
import { useForm } from "react-hook-form";

import { SearchData } from "@common/types";
import { formatPrice, getItems } from "@common/functions";
import ItemImage from "@components/ItemImage";

interface SearchQuery {
  searchTerm: string;
}

const defaultSearchQuery: SearchQuery = {
  searchTerm: "",
};

export default function Home() {
  const [data, setData] = useState<SearchData | null>(null);
  const [query, setQuery] = useState<SearchQuery>(defaultSearchQuery);
  const { register, handleSubmit } = useForm<SearchQuery>();

  function onSubmit(data: SearchQuery) {
    setQuery({ searchTerm: data.searchTerm.trim() });
  }

  // Check if results has some bonuses
  const hasBonus = useMemo(
    () => data?.results.some((result) => result.item.options.length > 0),
    [data]
  );

  // Request when query.name change
  useEffect(() => {
    async function doRequest() {
      const items = await getItems(query.searchTerm);
      setData(items || null);
    }

    if (query.searchTerm.length > 0) {
      doRequest();
    }
  }, [query.searchTerm]);

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
