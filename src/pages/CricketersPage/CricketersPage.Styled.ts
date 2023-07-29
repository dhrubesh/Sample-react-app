import styled from '@emotion/styled';
import { styled as muiStyled } from '@mui/system';
import TablePagination, {
  tablePaginationClasses as classes,
} from '@mui/base/TablePagination';
import { Paper as DefaultPaper } from '@mui/material';

export const Paper = styled(DefaultPaper)`
  border-radius: 0;
  border-bottom: 3px solid lightsalmon;
`;

export const CustomTablePagination = muiStyled(TablePagination)`
& .${classes.toolbar} {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;    
    padding: 24px;
    background: aliceblue;

    @media (min-width: 768px) {
      flex-direction: row;
      align-items: center;
    }
  }

  & .${classes.selectLabel} {
    margin: 0;
  }

  & .${classes.displayedRows} {
    margin: 0;

    @media (min-width: 768px) {
      margin-left: auto;
    }
  }

  & .${classes.spacer} {
    display: none;
  }

  & .${classes.actions} {
    display: flex;
    gap: 0.25rem;
  }
`;

export const Container = styled.div`
    border-radius: 20px;
    padding: 41px;
    background: linear-gradient(#e66465, #9198e5);
    box-shadow: 0 1px 45px 0 rgba(236, 116, 149, 0.75);
}`;
