import { useCallback, useEffect, useState } from 'react';
import { CricketerList } from '@/components';
import getPlayers, { TPlayer, PlayerTypes } from '@/API/get-players';
import { CustomTablePagination } from './CricketersPage.Styled';
import Paper from '@mui/material/Paper';
import {
  Order,
  TorderBy,
} from '@/components/CricketerList/CricketerList.Types';
import { getComparator } from '@/utils';

const CricketersPage = () => {
  const [data, setData] = useState<TPlayer[]>([]);
  const [page, setPage] = useState(0);
  const [filterByType, setFilterByType] = useState<PlayerTypes | null>(null);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<TorderBy>(null);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getData = useCallback(() => {
    getPlayers().then((_data) => {
      const orderedData = orderBy
        ? _data.sort(getComparator(order, orderBy))
        : _data.map((a) => ({ ...a }));

      setData(
        filterByType
          ? orderedData.filter((d) => d.type === filterByType)
          : orderedData
      );
    });
  }, [filterByType, order, orderBy]);

  const handleRequestSort = (property: TorderBy) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <>
      <CricketerList
        players={
          rowsPerPage > 0
            ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : data
        }
        order={order}
        orderBy={orderBy}
        onRequestSort={handleRequestSort}
        onRequestFilterType={setFilterByType}
        filterByType={filterByType}
      />
      <Paper>
        <CustomTablePagination
          rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
          colSpan={3}
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          slotProps={{
            select: {
              'aria-label': 'rows per page',
            },
            actions: {
              showFirstButton: true,
              showLastButton: true,
            },
          }}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
};

export default CricketersPage;
