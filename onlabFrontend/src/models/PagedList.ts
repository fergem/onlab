export interface PagedList<T> {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  data: T[];
}
