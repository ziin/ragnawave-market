import axios from "axios";
import { ResponseData } from "@common/types";

const api = axios.create({
  baseURL: "https://ws.ragnawave.com.br/mercado/list",
  params: {
    rowsPerPage: 100,
    page: 1,
  },
});

export async function getItemsByName(
  name: string,
  page: number
): Promise<ResponseData | undefined> {
  try {
    const { data } = await api.get("", { params: { name, page } });
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function getItemsById(
  id: string,
  page: number
): Promise<ResponseData | undefined> {
  try {
    const { data } = await api.get("", { params: { nameid: id, page } });
    return data;
  } catch (error) {
    console.log(error);
  }
}
