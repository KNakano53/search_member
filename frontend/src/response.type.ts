export type Meta = {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
};

export type Links = {
  first: string;
  previous: string;
  next: string;
  last: string;
};
