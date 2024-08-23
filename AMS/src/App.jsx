import './App.css';
import React, { Suspense, useState, useEffect } from 'react';
import Navbar from './Components/Navbar';
import LoadingPage from './Components/LoadingPage'; 
import { Routes, Route } from 'react-router-dom';

const StudentPage = React.lazy(() => import('./Components/StudentPage'));
const StudentRemove = React.lazy(() => import('./Components/StudentRemove'));
const StudentList = React.lazy(() => import('./Components/StudentList'));
const Home = React.lazy(() => import('./Components/Home'));

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000); 
  }, []);

  return (
    <>
      <Navbar />
      <Suspense fallback={<LoadingPage />}>
        <Routes>
          <Route path="/" element={loading ? <LoadingPage /> : <Home />} />
          <Route path="/Add" element={loading ? <LoadingPage /> : <StudentPage />} />
          <Route path="/remove" element={loading ? <LoadingPage /> : <StudentRemove />} />
          <Route path="/students" element={loading ? <LoadingPage /> : <StudentList />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
