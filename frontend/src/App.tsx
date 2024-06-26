import { Route, Routes } from 'react-router';

import { Layout } from './components/Layout'
import { HomePage } from './pages/Home'

export const App = () => {

  return (
    <Routes >
      <Route path="/" element={<Layout />}>
        <Route path="/" index element={<HomePage />} />
      </Route>
    </Routes>
  )
}

export default App
