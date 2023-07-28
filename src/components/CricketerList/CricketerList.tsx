import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { CricketerListProps } from './CricketerList.Types';
import { TableHeaderKeys } from './CricketerList.Const';

const CricketerList = ({ players }: CricketerListProps) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {TableHeaderKeys.map((headerKey) => (
              <TableCell id={headerKey}>{headerKey.toUpperCase()}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {players.map((row) => {
            const dob = row.dob ? new Date(row.dob).toLocaleDateString() : '-';
            return (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell>{row.type || '-'}</TableCell>
                <TableCell>{row.points || '-'}</TableCell>
                <TableCell>{row.rank || '-'}</TableCell>
                <TableCell>{dob}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CricketerList;
