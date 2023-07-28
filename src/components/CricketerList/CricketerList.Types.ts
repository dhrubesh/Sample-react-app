import { TPlayer, PlayerTypes } from '@/API/get-players';

export type Order = 'asc' | 'desc';

export type TorderBy = keyof Pick<TPlayer, 'name' | 'dob' | 'rank'> | null;

export interface CricketerListProps {
  players: TPlayer[];
  order: Order;
  orderBy: TorderBy;
  filterByType: PlayerTypes | null;
  onRequestFilterType: (f: PlayerTypes) => void;
  onRequestSort: (p: TorderBy) => void;
}
