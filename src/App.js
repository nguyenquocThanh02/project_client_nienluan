import React, { Fragment } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { routes } from './routes';
import DefaultComponent from './components/DefaultComponent/DefaultComponent';
function App() {
  return (
    <Router>
      <Routes>
      {
        routes.map((route, i)=>{
          const Page= route.page;
          const Layout= route.isShowHeader ? DefaultComponent : Fragment;
          return (
            <Route path={route.path} element={<Layout><Page /></Layout>} key={i}/>
          )
        })
      }
      </Routes>
    </Router>
  );
}

export default App;
