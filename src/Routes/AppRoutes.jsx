// import React from 'react';
// import { createBrowserRouter } from 'react-router-dom';
// import App from './App';

// // Page Components
// import Home from '../Pages/Home/Home';
// import Snap from '../Pages/Snap/Snap';
// import Explore from '../Pages/Explore/Explore';
// import Gallery from '../Pages/Gallery/Gallery';
// import Profile from '../Pages/Profile/Profile';
// import Notifications from '../Pages/Notifications/Notifications';

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <App />, // Shared layout
//     children: [
//       { index: true, element: <Home /> },
//       { path: 'snap1', element: <Snap /> },
//       { path: 'explore', element: <Explore /> },
//       { path: 'gallery', element: <Gallery /> },
//       { path: 'profile', element: <Profile /> },
//       { path: 'notifications', element: <Notifications /> },
//     ],
//   },
// ]);

// export default router;
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Page components
import Home from '../Pages/Home/Home';
import Snap from '../Pages/Snap/Snap';
import Explore from '../Pages/Explore/Explore';
import Gallery from '../Pages/Gallery/Gallery';
import Profile from '../Pages/Profile/Profile';
import Notifications from '../Pages/Notifications/Notifications';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/snap" element={<Snap />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/notifications" element={<Notifications />} />
    </Routes>
  );
}
