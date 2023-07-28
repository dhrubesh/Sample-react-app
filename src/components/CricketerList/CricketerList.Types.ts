import { TPlayer, PlayerTypes } from '@/API/get-players';

export type Order = 'asc' | 'desc';

export type TorderBy = keyof Pick<TPlayer, 'name' | 'dob' | 'rank'> | null;

export interface TLocalStorageVal {
  page: number;
  filterByType: PlayerTypes | null;
  filterByName: string | null;
  rowsPerPage: number;
  order: Order;
  orderBy: TorderBy;
}
export interface CricketerListProps {
  players: TPlayer[];
  order: Order;
  orderBy: TorderBy | null;
  filterByType: PlayerTypes | undefined;
  searchByName: string | null;
  setSearchByName: (s: string | null) => void;
  onRequestFilterType: (f: PlayerTypes) => void;
  onRequestSort: (p: TorderBy) => void;
}
