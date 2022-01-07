import React from 'react';
import { Outlet } from 'react-router-dom';
import Loading  from '../Components/Loading';
import { useAuth0 } from '@auth0/auth0-react';



export default function ProtectedRoute({children}) {
    const {loginWithRedirect, isAuthenticated, isLoading} = useAuth0();
    console.log(isAuthenticated);
    return isAuthenticated && isLoading ? children : loginWithRedirect();
};

