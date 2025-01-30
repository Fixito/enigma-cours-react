import { Route, Routes } from 'react-router';

import DefaultLayout from './layouts/DefaultLayout.jsx';

import { About, Home, NoMatch, SingleCocktail } from './pages';

export default function App() {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route index element={<Home />} />
        <Route path='about' element={<About />} />
        <Route path='cocktails/:cocktailId' element={<SingleCocktail />} />
      </Route>
      <Route path='*' element={<NoMatch />} />
    </Routes>
  );
}
