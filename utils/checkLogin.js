import { useState, useEffect } from 'react';

const useUserTokenAuth = () => {
  const [token, setToken] = useState(
    localStorage.getItem('panasend-token') ?? ''
  );

  useEffect(() => {
    localStorage.setItem('panasend-token', token);
  }, [token]);

  return [token, setToken];
};
