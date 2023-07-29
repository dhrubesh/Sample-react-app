import { getPlayers, TPlayerDetailer } from '@/API/get-players';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import { deepOrange } from '@mui/material/colors';
import * as Styled from './CricketerDetailPage.Styled';

import Avatar from '@mui/material/Avatar';

const CricketerDetailPage = () => {
  const { criketerId } = useParams();
  const [data, setData] = useState<TPlayerDetailer | null>(null);

  useEffect(() => {
    getPlayers().then((_data) => {
      const player = _data.filter((o) => o.id === criketerId);
      const filteredPlayerType = _data
        .filter((o) => o.type === player[0].type && o.id !== criketerId)
        .slice(0, 5);
      setData({ player: player[0], filteredPlayerType });
    });
  }, [criketerId]);

  if (!data) {
    return <></>;
  }
  const playerDetails = data.player || null;
  const filteredPlayerType = data.filteredPlayerType || [];
  const dob = playerDetails.dob
    ? new Date(playerDetails.dob).toLocaleDateString()
    : '-';
  const age = playerDetails.dob
    ? new Date().getFullYear() - new Date(playerDetails.dob).getFullYear()
    : '-';

  return (
    <Styled.Container>
      <Styled.Link to="/">Go Back to the list</Styled.Link>
      <Styled.DetailCard sx={{ maxWidth: '50%' }}>
        <CardContent>
          <Box display={'flex'}>
            <Styled.Header>{playerDetails.name}</Styled.Header>{' '}
            <Avatar sx={{ bgcolor: deepOrange[500] }}>
              {playerDetails.rank}
            </Avatar>
          </Box>
          <Box display={'flex'} mt={4}>
            <Box width="60%" mr={'auto'}>
              <Styled.Description>
                {playerDetails.description}
              </Styled.Description>
            </Box>
            <Box>
              <Styled.Details>
                <div className="value">{playerDetails.type}</div>
                <div className="property">Player Type</div>
              </Styled.Details>
              <Styled.Details>
                <div className="value">{playerDetails.points}</div>
                <div className="property">Points</div>
              </Styled.Details>
              <Styled.Details>
                <div className="value">{dob}</div>
                <div className="property">Date of Birth</div>
              </Styled.Details>
              <Styled.Details>
                <div className="value">{age}</div>
                <div className="property">Age</div>
              </Styled.Details>
            </Box>
          </Box>
        </CardContent>
      </Styled.DetailCard>
      <Styled.ListCard sx={{ width: 350 }}>
        <CardContent>
          <div className="header">People also looked into:</div>
          {filteredPlayerType?.map((similarPlayer) => {
            return (
              <Link
                key={similarPlayer.id}
                className="player"
                to={`/cricketer/${similarPlayer.id}`}
              >
                {similarPlayer.name}
              </Link>
            );
          })}
        </CardContent>
      </Styled.ListCard>
    </Styled.Container>
  );
};

export default CricketerDetailPage;
