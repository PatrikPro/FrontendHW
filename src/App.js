import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ShoppingListDetail from './components/ShoppingListDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/lists/:listId" element={<ShoppingListDetail />} />
      </Routes>
    </Router>
  );
}

export default App;




