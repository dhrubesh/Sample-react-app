import data from '@/constants/players';

export type TMayBe<T> = T | null | undefined;

export type PlayerTypes = TMayBe<
  'batsman' | 'bowler' | 'allRounder' | 'wicketKeeper'
>;

export type TPlayer = {
  id?: TMayBe<string>;
  name?: TMayBe<string>;
  description?: TMayBe<string>;
  type?: PlayerTypes;
  points?: TMayBe<number>;
  rank?: TMayBe<number>;
  dob?: TMayBe<number>;
};

const getPlayers = (): Promise<TPlayer[]> => {
  return Promise.resolve<TPlayer[]>(
    (data as TPlayer[])
      .sort((a, b) => {
        const aPoints = a.points ?? 0;
        const bPoints = b.points ?? 0;

        return aPoints === bPoints ? 0 : bPoints > aPoints ? 1 : -1;
      })
      .map((it, index) => ({
        ...it,
        rank: index + 1,
      }))
  );
};

export default getPlayers;
