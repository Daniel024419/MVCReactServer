import  Login from './views/auths/login';
import  Signup from './views/Signup';
import ErrorPage from './partials/ErrorPage';

// App.js
import React, { useState } from 'react';

//  protected dashboard component
import Dashboard from './views/dashboard/Home'; 
import ProfilePage from './views/dashboard/ProfilePage'; 
import UsersPage from './views/dashboard/UsersPage'; 
import AddNewUserPage from './views/dashboard/AddNewUserPage'; 
import EditUserProfilePage from './views/dashboard/EditUserProfilePage'; 


// end
import { BrowserRouter as Router,Routes, Route, Link ,Navigate  } from 'react-router-dom'; 
//import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

function App() {

 const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuthenticated')); // You should set this based on your authentication logic

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<ErrorPage />} />


        {isAuthenticated ? (

           <>
          <Route path="/auth/dashboard" element={<Dashboard />} />
          <Route path="/auth/dashboard/profile" element={<ProfilePage />} />
          <Route path="/auth/dashboard/users" element={<UsersPage />} />
          <Route path="/auth/dashboard/create-users" element={<AddNewUserPage />} />
          <Route path="/auth/dashboard/edit-user-profile" element={<EditUserProfilePage />} />
          </>

        ) : (
          <Route path="/auth/dashboard" element={ <Navigate to="/login" />} />
        )}

         
      </Routes>
    </Router>
  );
}

export default App;
