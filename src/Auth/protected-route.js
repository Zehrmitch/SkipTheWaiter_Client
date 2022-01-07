import { useAuth0, withAuthenticationRequired  } from '@auth0/auth0-react';
import { Route, Navigate } from 'react-router-dom';
import React from 'react';
import Loading from '../Components/Loading';

const ProtectedRoute = ({ component, ...args }) => (
    <Route
      component={withAuthenticationRequired(component, {
        onRedirecting: () => <Loading />,
      })}
      {...args}
    />
  );
  
  export default ProtectedRoute;


