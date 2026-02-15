import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import UsersPage from './pages/UsersPage';
import UserDetails from './pages/UserDetails';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <header className="app__header">
          <h1 className="app__title">user_list</h1>
        </header>
        <main className="app__content">
          <Routes>
            <Route path="/" element={<Navigate to="/users" replace />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/users/:id" element={<UserDetails />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
