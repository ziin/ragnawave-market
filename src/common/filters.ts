// Redução de Dano contra Raças (1~5%)
// Redução de Dano contra Elementos (1~5%)
// Aumenta Dano Físico em Raças → 10~20%
// Ignora MDEF em Raças → 10~24%
// Ignora DEF em Raças → 10~35%
// Aumenta o Dano Físico em Elementos → 10~20%

export enum ToggleType {
  ATQ = "atk",
  MATQ = "matk",
  PRECISAO = "precision",
  HP = "hp",
  SP = "sp",
  SP_REGEN = "spregen",
  HP_REGEN = "hpregen",
  CURA = "cura",
  CONJ_DELAY = "conjdelay",
  CONJ_TIME = "conjtime",
  DANO_DIST = "danodist",
  DEF = "def",
  MDEF = "mdef",
  CRIT = "crit",
  ASPD = "aspd",
  INDESTRUCT = "indestruct",
  FOR = "for",
  VIT = "vit",
  AGI = "agi",
  INT = "int",
  DES = "des",
  SOR = "sor",
}

export enum SelectType {
  ATK_RACE = "atq_race",
  ATK_ELEMENT = "atk_element",
  DEF_RACE = "def_rance",
  DEF_ELEMENT = "def_element",
  IGNORE_DEF_RACE = "ignore_def_race",
  IGNORE_DEFM_RACE = "ignore_defM_race",
}

export interface ToggleFilter {
  label: string;
  key: ToggleType;
  active: boolean;
  filter: string;
}

export enum Races {
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

export enum Elements {
  agua = "agua",
  fogo = "fogo",
  vento = "vento",
  terra = "terra",
  fantasma = "fantasma",
  sombrio = "sombrio",
  sagrado = "sagrado",
  neutro = "neutro",
  maldito = "maldito",
  veneno = "veneno",
}

export type PropertyType = Races | Elements | "";

export interface LabelledProperty<T> {
  label: string;
  property: T;
}

export interface SelectFilter {
  key: SelectType;
  selected: boolean;
  value: PropertyType;
}

const mapSelectTypes = new Map<SelectType, string>([
  [SelectType.ATK_RACE, "Dano Físico contra a raça"],
  [SelectType.ATK_ELEMENT, "Dano físico contra a propriedade"],
  [SelectType.DEF_RACE, "dano causado por monstros da raça"],
  [SelectType.DEF_ELEMENT, "Resistência a propriedade"],
  [SelectType.IGNORE_DEF_RACE, "da DEF de monstros da raça"],
  [SelectType.IGNORE_DEFM_RACE, "da MDEF de monstros da raça"],
]);
const mapSelectProperties = new Map<PropertyType, string>([
  // Races
  [Races.mortovivo, "Morto-Vivo"],
  [Races.amorfo, "Amorfo"],
  [Races.inseto, "Inseto"],
  [Races.anjo, "Anjo"],
  [Races.bruto, "Bruto"],
  [Races.demonio, "Demônio"],
  [Races.peixe, "Peixe"],
  [Races.planta, "Planta"],
  [Races.humanoide, "Human"], // just because they are using this word with and w/o accent
  [Races.dragao, "Dragão"],
  // Elements
  [Elements.agua, "Água"],
  [Elements.fogo, "Fogo"],
  [Elements.terra, "Terra"],
  [Elements.vento, "Vento"],
  [Elements.sombrio, "Sombrio"],
  [Elements.sagrado, "Sagrado"],
  [Elements.fantasma, "Fantasma"],
  [Elements.maldito, "Maldito"],
  [Elements.veneno, "Veneno"],
  [Elements.neutro, "Neutro"],
]);

export function getFilterTermForSelectedType(
  key: SelectType,
  option: PropertyType
) {
  const prefix = mapSelectTypes.get(key);
  const suffix = mapSelectProperties.get(option);
  return `${prefix} ${suffix}`;
}

// Dano Físico contra a raça Inseto +12%
// Dano físico contra a propriedade Água +16%
// Reduz em 2% o dano causado por monstros da raça Bruto
// Resistência a propriedade Veneno +3%
// Ignora 12% da MDEF de monstros da raça Dragão
// Ignora 35% da DEF de monstros da raça Peixe
