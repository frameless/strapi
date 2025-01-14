export interface Antwoord {
  content: string;
  kennisartikelCategorie?: string;
}
export interface VacItem {
  uuid: string;
  vraag: string | null;
  antwoord: Antwoord[];
  status: string | null;
  doelgroep: string | null;
  afdelingen: string[];
  toelichting: string | null;
  trefwoorden: string[];
}

export interface AttributesVacItem {
  createdAt: string;
  updatedAt: string;
  vac: VacItem;
}

export interface DataVacItem {
  attributes: AttributesVacItem;
  id: string;
}

export type CreateVacResponse = {
  data: {
    createVac: {
      data: DataVacItem;
    };
  };
};
