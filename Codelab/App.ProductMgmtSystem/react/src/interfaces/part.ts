export interface IPart {
  key?: number;
  id?: number;
  code?: string;
  name_en: string;
  project?: string;
  person?: IPerson;
  relatedDepartment?: string;
  relatedDesignGuide?: string;
}

export interface IPerson {
  name?: string;
  mail?: string;
}

export interface IBaseFilters {
  page?: number;
  pageSize?: number;
}

export interface IPartFilters extends IBaseFilters {
  name?: string;
  project?: string;
}

export interface IRelatedPartFilters {
  page?: number;
  pageSize?: number;
  name?: string;
  relation?: string;
  layoutValue?: string;
  dimensionValue?: string;
  materialValue?: string;
}

export interface IGetPartResponse {
  data: {
    page: number;
    pageSize: number;
    totalRecords: number;
    parts: IPart[];
  };
}

export interface IConcept {
  key?: number;
  id?: number;
  name: string;
  relatedPartCount?: number;
  author?: string;
  relatedParts?: IPart[];
  createdAt?: string;
}

export interface IGetConceptResponse {
  data: {
    concept: IConcept;
  };
}

export interface IGetConceptListResponse {
  data: {
    page: number;
    pageSize: number;
    totalRecords: number;
    concepts: IConcept[];
  };
}

export interface IConceptMailData {
  email: string;
  partNames: string[];
}
