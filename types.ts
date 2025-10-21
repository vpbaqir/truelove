export enum Region {
  SOUTH_ASIA = "South Asia",
  MIDDLE_EAST = "Middle East / Arabia",
  KHURASAN = "Khurasan",
  ANDALUSIA = "Andalusia",
  NORTH_AFRICA = "North Africa",
  ANATOLIA = "Anatolia / Turkey",
}

export enum Century {
  C2_HIJRI = "2nd Century Hijri",
  C3_HIJRI = "3rd Century Hijri",
  C5_HIJRI = "5th Century Hijri",
  C6_HIJRI = "6th Century Hijri",
  C7_HIJRI = "7th Century Hijri",
  C13_HIJRI = "13th Century Hijri",
}

export enum Tariqa {
  QADIRI = "Qadiri",
  CHISHTI = "Chishti",
  NAQSHBANDI = "Naqshbandi",
  SHADHILI = "Shadhili",
  SUHRAWARDI = "Suhrawardi",
  MEVLEVI = "Mevlevi",
  NONE = "N/A"
}

export interface Wali {
  id: number;
  name: string;
  title: string;
  honorifics: string;
  biography: string;
  teachings: string[];
  stories: { title: string; story: string }[];
  maqamLocation: string;
  maqamGmapsUrl: string;
  region: Region;
  century: Century;
  tariqa: Tariqa;
  deathDate: string; // e.g., "Rabi al-Thani 11"
}