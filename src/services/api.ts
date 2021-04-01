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
  name: string
): Promise<ResponseData | undefined> {
  try {
    const { data } = await api.get("", { params: { name } });
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function getItemsById(
  id: string
): Promise<ResponseData | undefined> {
  try {
    const { data } = await api.get("", { params: { nameid: id } });
    return data;
  } catch (error) {
    console.log(error);
  }
}
