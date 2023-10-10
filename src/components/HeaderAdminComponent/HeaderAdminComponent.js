import React from "react";
import {Col, Input as Popover} from 'antd';
import {
    WrapperHeader, WrapperTextHeader,
    WrapperHeaderAccount, WrapperHeaderPop
} from './style';
import {
    UserOutlined,
  } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import * as UserService from '../../services/UserService';
import { resetUser } from "../../redux/slides/userSlide";

function HeaderAdminComponent() {
    const navigate= useNavigate()
    // const user= useSelector((state)=>state.user)
    const dispatch= useDispatch();
    const handleNavigateLogin = ()=>{
        navigate('/sign-in')
    }
    // console.log('user', user)
    const handleLogout = async ()=>{
        await UserService.logoutUser();
        dispatch(resetUser())
        handleNavigateLogin()
    }
    return ( 
        <div>
           <WrapperHeader gutter={16}>
            <Col span={12}>
                <WrapperTextHeader onClick={() => navigate('/')}>Home</WrapperTextHeader>
            </Col>
            <Col span={12} style={{display: 'flex', gap: '20px', justifyContent: 'flex-end'}}>
                <WrapperHeaderAccount onClick={handleLogout}>
                    <UserOutlined style={{fontSize: '30px'}}/>
                    <WrapperHeaderPop onClick={handleLogout}>Thoát</WrapperHeaderPop>
                </WrapperHeaderAccount>
            </Col>
           </WrapperHeader>
        </div>
     );
}

export default HeaderAdminComponent;