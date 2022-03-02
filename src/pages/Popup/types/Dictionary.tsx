import { MaterialCoverImage } from './Materials';

type Language = 'en' | 'fi'

interface DictionaryTarg {
  targ: string
  lang: Language
}

interface DictionaryEntry {
  targs: DictionaryTarg[]
  phons: {phon: string}[] | []
  exmps: any[]
  sortKey: string
  games: boolean
  alpha: boolean
  head: string
  lang: Language
}

interface DictionarySection {
  sectionId: number
  sectionTitle: string
  entries: DictionaryEntry[]
}

interface DictionaryUnit {
  sections: DictionarySection
}

type Translation = {origin: string, translation: string, id: string}[]

interface Dictionary {
  state: string;
  hidden: boolean;
  version: string;
  primaryColor: string;
  language: string;
  bundleId: string;
  bundleTitle: string;
  materialTitle: string;
  materialId: string;
  productId: string;
  updatedAt: string;
  createdAt: string;
  coverImage: string;
  coverImages: MaterialCoverImage;
  units: DictionaryUnit[]
  alphaEntries: DictionaryEntry[]
  translations: Translation
}

export { Dictionary, DictionaryEntry, Translation }
