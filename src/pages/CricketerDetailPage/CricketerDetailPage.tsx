import { getPlayers, TPlayerDetailer } from '@/API/get-players';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import { deepOrange } from '@mui/material/colors';

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
    ? new Date(playerDetails.dob).getFullYear() - new Date().getFullYear()
    : '-';
  return (
    <>
      <Link to="/">Go to list</Link>
      <Card sx={{ maxWidth: 350 }}>
        <CardContent>
          <Box display={'flex'}>
            <Avatar sx={{ bgcolor: deepOrange[500] }}>
              {playerDetails.rank}
            </Avatar>
            <div>{playerDetails.name}</div>
            <div>{playerDetails.type}</div>
            <div>{playerDetails.points}</div>
            <div>{dob}</div>
            <div>{age}</div>
          </Box>
          {playerDetails.description}
        </CardContent>
      </Card>
      <Card sx={{ maxWidth: 350 }}>
        <CardContent>
          {filteredPlayerType?.map((similarPlayer) => {
            return <div key={similarPlayer.id}>{similarPlayer.name}</div>;
          })}
        </CardContent>
      </Card>
    </>
  );
};

export default CricketerDetailPage;
