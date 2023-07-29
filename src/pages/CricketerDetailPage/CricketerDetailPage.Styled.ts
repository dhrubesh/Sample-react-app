import styled from '@emotion/styled';
import { Card as DefaultCard } from '@mui/material';
import { Link as DefaultLink } from 'react-router-dom';

export const Header = styled.div`
  font-size: 32px;
  font-weight: bold;
  margin-right: auto;
`;

export const Details = styled.div`
  margin-bottom: 16px;
  .property {
    font-size: 14px;
  }
  .value {
    font-size: 24px;
  }
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 6%;
`;

export const Link = styled(DefaultLink)`
  background: pink;
  height: 25px;
  color: brown;
  margin-top: 46px;
  padding: 10px;
`;

export const DetailCard = styled(DefaultCard)`
  padding: 36px;
  color: white;
  background: linear-gradient(#e66465, #9198e5);
  box-shadow: 0 4px 15px 0 rgba(236, 116, 149, 0.75);
  margin-right: 16px;
`;

export const Description = styled.div`
  font-size: 20px;
  line-height: 1.5;
`;

export const ListCard = styled(DefaultCard)`
  padding: 36px;
  background: linear-gradient(#e66465, #9198e5);
  box-shadow: 0 4px 15px 0 rgba(236, 116, 149, 0.75);
  text-align: right;
  color: white;
  .header {
    margin-bottom: 24px;
    margin-top: 8px;
    font-weight: bold;
  }

  .player {
    margin-bottom: 16px;
    color: white;
    display: block;
  }
`;
