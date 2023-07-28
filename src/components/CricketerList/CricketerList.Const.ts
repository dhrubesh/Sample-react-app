import { TPlayer } from '@/API/get-players';

export const TableHeaderKeys: Array<keyof Omit<TPlayer, 'id'>> = [
  'name',
  'type',
  'points',
  'rank',
  'dob',
];
