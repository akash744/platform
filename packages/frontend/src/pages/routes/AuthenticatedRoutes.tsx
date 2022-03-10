import React from 'react';
import { Routes } from 'react-router';
import { Navigate, Route } from 'react-router-dom';
import HomePage from '../public/HomePage';

interface AuthenticatedRoutesProps {
  alreadyInFlat: boolean;
}

const AuthenticatedRoutes: React.FC<AuthenticatedRoutesProps> = ({
  alreadyInFlat,
}: AuthenticatedRoutesProps) => {
  return (
    <Routes>
      <Route path="home" element={<HomePage alreadyInFlat={false}/>} />
      <Route path="join=:houseCode" element={<HomePage alreadyInFlat={alreadyInFlat}/>} />
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
};

export default AuthenticatedRoutes;
