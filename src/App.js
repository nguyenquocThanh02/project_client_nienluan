import React, { Fragment,  useState} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { routes } from './routes';
import DefaultComponent from './components/DefaultComponent/DefaultComponent';
import { useEffect, useMutation } from 'react';
import axios from 'axios';
import {useQuery} from '@tanstack/react-query';
import { isJsonString } from './utils';
import { useDispatch, useSelector } from 'react-redux';
import jwt_decode from 'jwt-decode';
import * as UserService from './services/UserService';
import { updateUser, resetUser } from "./redux/slides/userSlide";
import Loading from './components/LoadingComponent/Loading';

function App() {
  const [isLoading, setIsLoading] = useState(false)
  // const user = useSelector((state) => state.user)
  const dispatch = useDispatch();

  useEffect(async () => {
    setIsLoading(true)
    const { storageData, decoded } = await handleDecode()
    if (decoded?.id) {
      handleGetDatailsUser(decoded?.id, storageData)
    }
    setIsLoading(false)
  }, []);

  const handleDecode = async () => {
    let storageData = localStorage.getItem('access_token');
    let decoded= {};
    
    if(storageData && isJsonString(storageData)){
      storageData = JSON.parse(storageData);
      decoded = jwt_decode(storageData)
    }
    return {decoded, storageData}
  }

  UserService.axiosJWT.interceptors.request.use(async (config) => {
    const currentTime= new Date()
    const {decoded} = await handleDecode();
    if(decoded?.exp < currentTime.getTime() / 1000){
      const data = await UserService.refreshToken()
      config.headers['token']= `Bearer ${data?.access_token}`;
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

  const handleGetDatailsUser = async (id, token) => {
    let storageRefreshToken = localStorage.getItem('refresh_token')
    const refreshToken = JSON.parse(storageRefreshToken)
    const res = await UserService.getDetailsUser(id, token)
    dispatch(updateUser({ ...res?.data, access_token: token, refreshToken: refreshToken}))

  }
  return (
    <Loading isLoading={isLoading}>
      <Router>
        <Routes>
        {
          routes.map((route, i)=>{
            const Page= route.page;
            const Layout= route.isShowHeader ? DefaultComponent : Fragment;
            return (
              <Route key={route.path} path={route.path} element={<Layout><Page /></Layout>}/>
            )
          })
        }
        </Routes>
      </Router>
    </Loading>
  );
}

export default App;
