// API Types
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

// Search Types

export type Upon = Property | Race | null;

export interface Bonus {
  type: BonusType;
  value: number;
  upon: Upon;
  raw: string;
}

export interface SearchItem {
  id: number;
  name: string;
  refine: number;
  slot: number;
  amount: number;
  price: number;
  creator: string | null;
  cards: Cards[];
  bonus: Bonus[];
}

export interface SearchResult {
  shopId: number;
  vendorId: number;
  vendorName: string;
  shopName: string;
  location: string;
  item: SearchItem;
}

export interface SearchData {
  page: number;
  maxPages: number;
  perPage: number;
  total: number;
  interval: Interval;
  filters: Filters;
  results: SearchResult[];
}

// Data

export enum Race {
  humanoide = "Humanóide", // just because it was typed with and w/o accent
  planta = "Planta",
  mortovivo = "Morto-Vivo",
  anjo = "Anjo",
  demonio = "Demônio",
  amorfo = "Amorfo",
  inseto = "Inseto",
  dragao = "Dragão",
  peixe = "Peixe",
  bruto = "Bruto",
}

export enum Property {
  agua = "Água",
  fogo = "Fogo",
  vento = "Vento",
  terra = "Terra",
  fantasma = "Fantasma",
  sombrio = "Sombrio",
  sagrado = "Sagrado",
  neutro = "Neutro",
  maldito = "Maldito",
  veneno = "Veneno",
}

export enum BonusType {
  // TODO: differ both below
  ATQ = "ATQ",
  MATQ = "MATQ",
  PRECISAO = "Precisão",
  HP = "HP",
  SP = "SP",
  HP_REGEN = "Regeneração de HP",
  SP_REGEN = "Regeneração de SP",
  CURA = "Eficiência da Cura",
  CONJ_DELAY = "Redução Pós-Conjuração",
  CONJ_TIME = "Redução da Conjuração",
  DANO_DIST = "Dano à Distância",
  DEF = "Defesa",
  MDEF = "Defesa Mágica",
  CRIT = "Taxa Crítica",
  ASPD = "Velocidade de Ataque",
  INDESTRUCT = "Indestrutível",
  FOR = "FOR",
  VIT = "VIT",
  AGI = "AGI",
  INT = "INT",
  DES = "DES",
  SOR = "SOR",
  ATK_RACE = "Dano Físico em Raças",
  ATK_ELEMENT = "Dano Físico a Propriedade",
  DEF_RACE = "Redução de dano a Raça",
  DEF_ELEMENT = "Redução de dano a Propriedade",
  IGNORE_DEF_RACE = "Ignora Defesa da Raça",
  IGNORE_DEFM_RACE = "Ignora Defesa Mágica da Raça",
}
