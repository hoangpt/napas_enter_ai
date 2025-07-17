export interface IUser {
  id: number;
  id_opp: number;
  SalesPIC: string;
  customer_name: string;
  requirement: string;
  isActive: string;
  DU: string;
  lead_PIC: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string | null;
  updatedBy: string | null;
}

export interface IUserFilters {
  page?: number;
  pageSize?: number;
  query?: string;
  isActive?: string;
}

export interface IGetUserResponse {
  data: {
    result: {
      currentPage: number;
      pageSize: number;
      totalRecords: number;
      Users: IUser[];
    };
  };
}
