import FullWidthHeightLayout from '@src/layout/FullWidthHeightLayout';
import SidebarWithHeader from '@src/layout/sidebarLayout/SidebarLayout';
import NotLoginGuard from '@src/pages/guard/NotLoginGuard';
import RequiredLoginGuard from '@src/pages/guard/RequiredLoginGuard';
import HomePage from '@src/pages/HomePage';
import LoginPage from '@src/pages/LoginPage';
import ConcertCreatePage from '@src/pages/my/ConcertCreatePage';
import ConcertListPage from '@src/pages/my/ConcertListPage';
import ConcertAdminPage from '@src/pages/my/concertsPage/ConcertAdminPage';
import EditMyPage from '@src/pages/my/EditMyPage';
import MyPage from '@src/pages/my/MyPage';
import Page404 from '@src/pages/Page404';
import SignPage from '@src/pages/SignPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import ConcertDetailPage from './my/concertDetailPage/ConcertDetailPage';
import GoodsPage from './my/concertDetailPage/GoodsPage';
import TicketListPage from './my/concertDetailPage/TicketListPage';

const MainRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<FullWidthHeightLayout />}>
          {/* Home Page */}
          <Route path="/" element={<HomePage />} />
          {/* Login & Sign */}
          <Route path="/" element={<NotLoginGuard />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="sign" element={<SignPage />} />
          </Route>
          {/* Required Login Pages */}
          <Route path="/my" element={<RequiredLoginGuard />}>
            <Route element={<SidebarWithHeader />}>
              <Route index element={<MyPage />} />
              <Route path="concerts" element={<ConcertListPage />} />
              <Route path="create" element={<ConcertCreatePage />} />
              <Route path="edit" element={<EditMyPage />} />
              <Route path="concerts/:concertId">
                <Route index element={<ConcertDetailPage />} />
                <Route path="goods" element={<GoodsPage />} />
                <Route path="tickets" element={<TicketListPage />} />
              </Route>
            </Route>
            <Route path="concerts/:concertId/admin/:ticketId" element={<ConcertAdminPage />} />
            {/* <Route path="concerts/:concertId" element={<ConcertAdminPage />} /> */}
          </Route>
          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default MainRouter;
