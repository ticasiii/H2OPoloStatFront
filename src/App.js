import React from "react";
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import ErrorPage from './pages/Error';
import Home from "./pages/Home.js";
import Authentication, {action as authAction} from './pages/Authentication';
import RootLayout from './pages/Root';
import {action as logoutAction} from './pages/Logout';
import { checkAuthLoader, tokenLoader} from './util/auth';

localStorage.setItem('username', 'marko');
localStorage.setItem('password', 'marko1234');



//GLAVNA STRANICA JE ZA LOGIN, AKO SE ULOGUJE IDE NA HOME DRUGACIJE NE MOZE DA PRISTUPI HOME STRANICI
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id:'root',
    //loader: tokenLoader,
    children: [
    // { path:'home', element: <Home />, loader:checkAuthLoader },
      { path:'/', element: <Home /> },
      // {
      //   index:true,
      //   element: <Authentication/>,
      //   action:authAction,

      // },
      // {
      //   path: 'logout',
      //   action:logoutAction

      // },
    ]
  },
]);







function App() {



   return (

    <RouterProvider router={router} />
//      <React.Fragment>

// <Home></Home>
//      </React.Fragment>
   );
};
export default App;
