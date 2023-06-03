import React from 'react';
import {
  BrowserRouter, Routes, Route, Navigate,
} from 'react-router-dom';
import { Home } from './pages/Home';
import Navbar from './components/Navbar';
// import { Footer } from "./components/Footer";
import './assets/styles/common.scss';
import { UserContext } from './context/UserContext';
import { UserFeed } from './pages/UserFeed';
import { User } from './types/User';

export default function App() {
  const [user, setUser] = React.useState<User | null>(null);

  const userProviderValue = React.useMemo(
    () => ({ user, setUser }),
    [user, setUser],
  );

  return (
    <div className="mx-8 md:mx-20">
      <UserContext.Provider value={userProviderValue}>
        <BrowserRouter>
          {user === null ? (
            <div>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/signup" element={<Home />} />
                <Route path="/login" element={<Home />} />
              </Routes>
            </div>
          ) : (
            <Routes>
              <Route path="/" element={<Navigate to="/home" replace />} />
              <Route path="/home" element={<UserFeed />} />
            </Routes>
          )}
          {/* <Footer /> */}
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}
