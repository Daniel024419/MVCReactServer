// App.js
import { BrowserRouter as Router,Routes, Route, Link ,Navigate  } from 'react-router-dom'; 
import { useState } from 'react';

import  Login from './views/auths/login';
import  Forgotpassword from './views/auths/Forgotpassword';

import Signup from './views/Signup';
import ErrorPage from './partials/ErrorPage';
import GoogleAuthLogin from './models/googleAuthLogin';

//  protected dashboard component
import Dashboard from './views/dashboard/Home'; 
import ProfilePage from './views/dashboard/ProfilePage'; 
import UsersPage from './views/dashboard/UsersPage'; 
import AddNewUserPage from './views/dashboard/AddNewUserPage'; 
import EditUserProfilePage from './views/dashboard/EditUserProfilePage'; 
import Artisans from './views/dashboard/Artisans'; 
import PreviewArtisan from './views/dashboard/PreviewArtisan';
import Buyers from './views/dashboard/Buyers'; 
import DashboardServices from './views/dashboard/dashboardServices'; 

//platform
import Platform from './views/platform/index';
import About from './views/platform/about';
import Contact from './views/platform/contact';
import Services from './views/platform/services';
import BookServices from './views/platform/bookServices'; 
import ServicesProviders from './views/platform/servicesProviders'; 
import HistoryPage from './views/platform/HistoryPage'; 


// end
function App() {

 const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuthenticated')); // You should set this based on your authentication logic

  return (
    <Router>
      <Routes>
        <Route path="/signup" element={< Signup />} />

      
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<Forgotpassword />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/auth/google/callback" element={<GoogleAuthLogin />} />


        <Route path="/" element={< Platform />} />
        <Route path="/about" element={< About />} />
        <Route path="/contact" element={< Contact />} />
        <Route path="/services" element={< Services />} />
        <Route path="/services-provider" element={< ServicesProviders />} />


        { isAuthenticated ? (

           <>
          <Route path="/auth/dashboard" element={<Dashboard />} />
          <Route path="/auth/dashboard/profile" element={<ProfilePage />} />
          <Route path="/auth/dashboard/users" element={<UsersPage />} />
          <Route path="/auth/dashboard/create-users" element={<AddNewUserPage />} />
          <Route path="/auth/dashboard/edit-user-profile" element={<EditUserProfilePage />} />
          

          <Route path="/auth/dashboard/artisans" element={<Artisans />} />
          <Route path="/auth/dashboard/preview-artisan" element={<PreviewArtisan />} />
          <Route path="/auth/dashboard/buyers" element={<Buyers />} />
          <Route path="/auth/dashboard/services" element={<DashboardServices />} />

          <Route path="/auth/customer/book-service" element={< BookServices />} />
          <Route path="/auth/customer/book-history" element={< HistoryPage  />} />
          </>

        ) : (
          <Route path="/auth/dashboard" element={ <Navigate to="/login" />} />
        )}

         
      </Routes>
    </Router>
  );
}

export default App;
