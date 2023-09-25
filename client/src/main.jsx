import ReactDOM from 'react-dom/client'
// import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import Home from './pages/Home';
import NoMatch from './pages/NoMatch';
import Login from './pages/Login';
import Signup from './pages/Signup';
import SlideComponent from './components/Slide/index.jsx';
import Slideshow from './components/Slideshow';
import SlideShowDemo from './components/SlideShowDemo';
import Fileupload from './components/FileUploadComponent/index.jsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    error: <NoMatch />,
    children: [
      {
        index: true, 
        element: <Home />,
      }, 
      {
        path: '/login',
        element: <Login />,
        errorElement: <NoMatch />
      }, {
        path: '/signup',
        element: <Signup />,
        errorElement: <NoMatch />
      },
       {
        path: '/home',
        element: <Home />
      }, 
      {
        path: '/ss/:id',
        element: <Slideshow />
      }, 
      {
        path: '/demo',
        element: <SlideShowDemo />
      }    
    // {
    //     path: '/orderHistory',
    //     element: <OrderHistory />
    //   }, {
    //     path: '/products/:id',
    //     element: <Detail />
    //   }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
