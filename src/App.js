import React, { Fragment } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { routes } from './routes';
import DefaultComponent from './components/DefaultComponent/DefaultComponent';
import { useEffect, useMutation } from 'react';
import axios from 'axios';
import {useQuery} from '@tanstack/react-query';

function App() {
  


  // useEffect(()=>{
  //   fetchApi()
  // }, [])
  const fetchApi = async () => {
    const res= await axios.get(`http://localhost:3001/api/product/getAll`)
    return res.data;
  }
  const test = useQuery({
    queryKey: ['todos'],
    queryFn: fetchApi
  })

  console.log(test)
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
