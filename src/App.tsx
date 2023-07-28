import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from '@/pages/ErrorPage';
import CricketersPage from '@/pages/CricketersPage';
import CricketerDetailPage from '@/pages/CricketerDetailPage';
import styled from '@emotion/styled';

const RootContainer = styled.div`
  padding: 15px;
`;

const router = createBrowserRouter([
  {
    path: '/',
    element: <CricketersPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/cricketer/:criketerId',
    element: <CricketerDetailPage />,
  },
]);

function App() {
  return (
    <RootContainer>
      <RouterProvider router={router} />
    </RootContainer>
  );
}

export default App;
