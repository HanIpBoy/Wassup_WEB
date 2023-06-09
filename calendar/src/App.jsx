import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import NotFound from './pages/NotFound';
import Calendar from './pages/Calendar';
import { ErrorBoundary } from 'react-error-boundary';
import Error from './pages/Error';
import Group from './pages/Group';
import GroupDetail from './pages/GroupDetail';
import NotLogin from './pages/NotLogin';
import Alirm from './pages/Alirm';

function App() {
  return (
    <ErrorBoundary FallbackComponent={Error}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          {/* <Route exact path="/edit/:id" element= {<Edit  />} /> */}
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/groups" element={<Group />} />
          <Route path="/notlogin" element={<NotLogin />} />
          <Route path="/groups/:groupId" element={<GroupDetail />} />
          <Route path="/alirms" element={<Alirm />} />
          <Route element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App;
