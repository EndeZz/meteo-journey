import './styles/index.scss';
import React from 'react';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import NotFound from './pages/NotFound';
import City from './pages/City';
import Home from './pages/Home';
import Auth from './pages/Auth';

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/city/:name" element={<City />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
