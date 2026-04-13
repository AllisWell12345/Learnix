import React from 'react'
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/common/HomePage'
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <Routes>

        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="mylecture" element={<MyLecturePage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="portfolio" element={<ProjectManagePage />} />
        </Route>
        <Route path="/student">
        </Route>
        <Route path="/teacher">
        </Route>
        
      </Routes>
    </>
  );
}

export default App;
