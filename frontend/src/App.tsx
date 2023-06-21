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
import axiosConfig from './config/axiosConfig';
import { SplashScreen } from './components/SplashScreen';

export default function App() {
  const [user, setUser] = React.useState<User | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  const userProviderValue = React.useMemo(
    () => ({ user, setUser }),
    [user, setUser],
  );

  React.useEffect(() => {
    const token = localStorage.getItem('access-token');
    if (token) {
      axiosConfig.get('/user/verify_token/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        setUser(res.data.user);
      }).catch((err) => {
        localStorage.removeItem('access-token');
        // eslint-disable-next-line no-console
        console.log(err);
      });
    }
    setIsLoading(false);
  }, []);

  return (
    
    <div className="mx-8 md:mx-20 h-full">
      <UserContext.Provider value={userProviderValue}>
        <BrowserRouter>
        {isLoading ? <SplashScreen /> : user === null ? (
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
