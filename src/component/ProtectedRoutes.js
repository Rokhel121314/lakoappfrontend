import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useNavigate, Route, Navigate, Outlet } from 'react-router-dom';


function ProtectedRoutes({isAuth}) {

    
  return (
    isAuth == true ? <Outlet/> : <Navigate to='/user'/>
  );
}

export default ProtectedRoutes
