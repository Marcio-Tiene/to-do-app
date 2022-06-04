import { ReactElement } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import ProjectsPage from '../pages/ProjectPages';
import RegisterPage from '../pages/RegisterPage';
import ProtectRoute from './ProtectRoute';

export default function Router(): ReactElement {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={(
            <ProtectRoute>
              <ProjectsPage />
            </ProtectRoute>
      )}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>

  );
}
