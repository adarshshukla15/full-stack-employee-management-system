import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('user'));
    } catch {
      return null;
    }
  });
  const navigate = useNavigate();

  useEffect(() => {
    // if logged in and on root, navigate to role dashboard
    if (user) {
      const path = window.location.pathname;
      if (path === '/' || path === '/login') {
        navigate(user.role === 'admin' ? '/admin' : '/employee', { replace: true });
      }
    }
  }, [user, navigate]);

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    const token = res.data.data.token;
    const userData = res.data.data.user;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    return userData;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/', { replace: true });
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
