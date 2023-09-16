import React from "react";
import {Badge, Col, Input as Search, Popover} from 'antd';
import {
    WrapperHeader, WrapperTextHeader,
    WrapperHeaderAccount, WrapperHeaderPop,
    WrapperTextContact
} from './style';
import {
    UserOutlined,
    ShoppingCartOutlined, WechatOutlined
  } from '@ant-design/icons';
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";
import { useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import * as UserService from '../../services/UserService';
import { resetUser } from "../../redux/slides/userSlide";

function HeaderComponent() {
    const navigate= useNavigate()
    const user= useSelector((state)=>state.user)
    const dispatch= useDispatch();
    const handleNavigateLogin = ()=>{
        navigate('/sign-in')
    }
    // console.log('user', user)
    const handleLogout = async ()=>{
        await UserService.logoutUser();
        dispatch(resetUser())
    }
    const content = (
        <div>
          {
            user?.isAdmin && <WrapperHeaderPop onClick={()=> navigate('/system/admin')}>Trang quản trị</WrapperHeaderPop>
          }
          <WrapperHeaderPop>Xem hồ sơ</WrapperHeaderPop>
          <WrapperHeaderPop onClick={handleLogout}>Đăng xuất</WrapperHeaderPop>
        </div>
      );
    return ( 
        <div>
           <WrapperHeader gutter={16}>
            <Col span={5} style={{gap: '30px', display: 'flex', alignItems: 'center'}}>
                <WrapperTextHeader onClick={()=>navigate('/')}>LOGO</WrapperTextHeader>
                <WrapperHeaderAccount>
                    <WechatOutlined style={{fontSize: '30px'}}/>
                    Liên hệ
                </WrapperHeaderAccount>
            </Col>
            <Col span={13}>
                <ButtonInputSearch
                    placeholder="input search text"
                    size="large"
                    textButton="Tìm kiếm"
                />
            </Col>
            <Col span={6} style={{display: 'flex', gap: '30px', justifyContent: 'flex-end' }}>
                <WrapperHeaderAccount>
                    <UserOutlined style={{fontSize: '30px'}}/>
                    {
                        user?.email ? 
                        (
                            <Popover content={content} trigger="hover">
                                <div style={{cursor: "pointer"}}>{user?.email}</div>
                            </Popover>
                            
                        
                        ) :
                        (
                            <div onClick={handleNavigateLogin} style={{display: 'flex',flexDirection: 'column' ,cursor: "pointer"}}>
                                <span>Tài khoản</span>
                            </div>
                        )
                    }
                    
                </WrapperHeaderAccount>
                <WrapperHeaderAccount>
                    <Badge count={1} size="small" >
                        <ShoppingCartOutlined style={{ fontSize: '30px',color: '#fff'}}/>
                    </Badge>
                    <span>Giỏ hàng</span>
                </WrapperHeaderAccount>
            </Col>
           </WrapperHeader>
        </div>
     );
}

export default HeaderComponent;