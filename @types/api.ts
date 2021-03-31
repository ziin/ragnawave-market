export interface ResponseData {
  page: number;
  maxPages: number;
  rowsPerPage: number;
  totalRows: number;
  interval: Interval;
  filters: Filters;
  rows: Shop[];
}
export interface Interval {
  from: number;
  to: number;
}
export interface Filters {
  name: string;
}
export interface Shop {
  id: number;
  char_id: number;
  char_name: string;
  shop_name: string;
  mapname: string;
  items: Item[];
}
export interface Item {
  nameid: number;
  name: string;
  refine: number;
  slot: number;
  amount: number;
  price: number;
  creator: string | null;
  cards: Cards[];
  options: string[];
}
export interface Cards {
  card_id: number;
  card_name: string;
}
