import { useCallback, useEffect, useState } from 'react';
import { CricketerList } from '@/components';
import { TPlayer, getPlayers } from '@/API/get-players';
import { CustomTablePagination } from './CricketersPage.Styled';
import Paper from '@mui/material/Paper';
import {
  TorderBy,
  TLocalStorageVal,
} from '@/components/CricketerList/CricketerList.Types';
import { getComparator, localStorageUtils } from '@/utils';

const CricketersPage = () => {
  const [data, setData] = useState<TPlayer[]>([]);
  const { initialLSvalue, setLSvalue } = localStorageUtils<TLocalStorageVal>(
    'crickers-page-fn',
    {
      page: 0,
      filterByType: null,
      filterByName: null,
      rowsPerPage: 10,
      order: 'asc',
      orderBy: null,
    }
  );
  const [page, setPage] = useState(initialLSvalue.page || 0);
  const [filterByType, setFilterByType] = useState<
    TLocalStorageVal['filterByType']
  >(initialLSvalue.filterByType);
  const [filterByName, setFilterByName] = useState<
    TLocalStorageVal['filterByName']
  >(initialLSvalue.filterByName);
  const [rowsPerPage, setRowsPerPage] = useState(initialLSvalue.rowsPerPage);
  const [order, setOrder] = useState<TLocalStorageVal['order']>(
    initialLSvalue.order
  );
  const [orderBy, setOrderBy] = useState<TLocalStorageVal['orderBy']>(
    initialLSvalue.orderBy
  );

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
      let computerData = _data.map((a) => ({ ...a }));
      if (orderBy) {
        computerData = computerData.sort(getComparator(order, orderBy));
      }
      if (filterByType) {
        computerData = computerData.filter((d) => d.type === filterByType);
      }
      if (filterByName) {
        computerData = computerData.filter(
          (o) =>
            o.name && o.name.toLowerCase().includes(filterByName.toLowerCase())
        );
      }
      setData(computerData);
    });
  }, [filterByName, filterByType, order, orderBy]);

  const handleRequestSort = (property: TorderBy) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  useEffect(() => {
    getData();
  }, [getData]);

  useEffect(() => {
    setLSvalue({
      page,
      filterByName,
      filterByType,
      order,
      orderBy,
      rowsPerPage,
    });
  }, [
    filterByName,
    filterByType,
    order,
    orderBy,
    page,
    rowsPerPage,
    setLSvalue,
  ]);

  return (
    <>
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
      <CricketerList
        players={
          rowsPerPage > 0
            ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : data
        }
        searchByName={filterByName}
        order={order}
        setSearchByName={setFilterByName}
        orderBy={orderBy}
        onRequestSort={handleRequestSort}
        onRequestFilterType={setFilterByType}
        filterByType={filterByType}
      />
    </>
  );
};

export default CricketersPage;
