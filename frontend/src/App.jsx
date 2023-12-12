import React from 'react'
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function App() {

  const location = useLocation();

  useEffect(() => {
    require('preline/preline');
  }, []);

  useEffect(() => {
    // @ts-ignore
    HSStaticMethods.autoInit();
  }, [location.pathname]);

  return (
    <div>App</div>
  )
}

export default App