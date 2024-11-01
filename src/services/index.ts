export * from './community';
export * from './order';
export * from './user';
export * from './user/user';

export interface PageReq<T> {
  pageInfo: {
    current: number;
    pageSize: number;
  };
  filter:T
}

export interface PageRes<T> {
  current: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  data: T;
}

export interface BaseDTO {
  id: number;
  createdAt: string;
  updatedAt: string | null;
  creatorId: number;
  isDeleted: number;
}