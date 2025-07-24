import React, { createContext, useContext, useState, useEffect } from 'react';
import HoSoService from '../services/HoSoService';
import fixture from '../pages/CaseList/fixture';

const HoSoContext = createContext();

export const useHoSo = () => {
  const context = useContext(HoSoContext);
  if (!context) {
    throw new Error('useHoSo must be used within a HoSoProvider');
  }
  return context;
};

export const HoSoProvider = ({ children }) => {
  const [hoSoList, setHoSoList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const flagFixture = true; // Set to true to use fixture data

  const fetchHoSoList = async () => {
    setLoading(true);
    setError(null);

    try {
      if (flagFixture) {
        // Use mock data
        setHoSoList(fixture);
      } else {
        // Call API through service
        const mappedData = await HoSoService.getHoSoList();
        setHoSoList(mappedData);
      }
    } catch (err) {
      console.error('Error fetching ho so data:', err);
      setError(err.message);
      // Fallback to mock data if API fails
      setHoSoList(fixture);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHoSoList();
  }, []);

  const value = {
    hoSoList,
    loading,
    error,
    refetch: fetchHoSoList,
    flagFixture
  };

  return (
    <HoSoContext.Provider value={value}>
      {children}
    </HoSoContext.Provider>
  );
};

export default HoSoProvider;
