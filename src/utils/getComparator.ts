import descendingComparator from './descendingComparator';
import { Order } from '@/components/CricketerList/CricketerList.Types';
import { TMayBe } from '@/API/get-players';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]?: TMayBe<number> | TMayBe<string> },
  b: { [key in Key]?: TMayBe<number> | TMayBe<string> }
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export default getComparator;
