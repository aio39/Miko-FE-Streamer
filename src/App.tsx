import LoginStatus from 'components/display/LoginStatus';
import FullWidthHeightLayout from 'layout/FullWidthHeightLayout';
import SidebarWithHeader from 'layout/SidebarLayout';
import NotLoginGuard from 'pages/guard/NotLoginGuard';
import RequiredLoginGuard from 'pages/guard/RequiredLoginGuard';
import HomePage from 'pages/HomePage';
import LoginPage from 'pages/LoginPage';
import ConcertCreatePage from 'pages/my/ConcertCreatePage';
import ConcertListPage from 'pages/my/ConcertListPage copy';
import ConcertAdminPage from 'pages/my/concerts/ConcertAdminPage';
import EditMyPage from 'pages/my/EditMyPage';
import MyPage from 'pages/my/MyPage';
import Page404 from 'pages/Page404';
import SignPage from 'pages/SignPage';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <LoginStatus />
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
            </Route>
            <Route path="concerts/:concertId" element={<ConcertAdminPage />} />
          </Route>

          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
