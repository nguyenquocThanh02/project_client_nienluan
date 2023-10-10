import React, {useState} from "react";
import {Badge, Col, Input as Search, Popover} from 'antd';
import {
    WrapperHeader, WrapperTextHeader,
    WrapperHeaderAccount, WrapperHeaderPop,
    WrapperTextContact
} from './style';
import {
    UserOutlined,HomeOutlined,
    ShoppingCartOutlined, WechatOutlined
  } from '@ant-design/icons';
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";
import { useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import * as UserService from '../../services/UserService';
import * as OrderService from '../../services/OrderService';
import { resetUser } from "../../redux/slides/userSlide";
import { searchProduct } from '../../redux/slides/productSlide';
import { useMutationHooks } from "../../hooks/useMutationHook";
import { useEffect } from "react";

function HeaderComponent() {
    const [search,setSearch] = useState('')

    const navigate= useNavigate()
    const user= useSelector((state)=>state.user)
    const order= useSelector((state)=>state.order)
    const dispatch= useDispatch();
    const handleNavigateLogin = ()=>{
        navigate('/sign-in')
    }
    const handleLogout = async ()=>{
        await UserService.logoutUser();
        dispatch(resetUser())
    }
    

    const handleGetOrderOfUser= ()=>{
        navigate('/get-ordered')
    }



    const content = (
        <div>
          {
            user?.isAdmin && <WrapperHeaderPop onClick={()=> navigate('/system/admin')}>Trang quản trị</WrapperHeaderPop>
          }
          <WrapperHeaderPop onClick={handleGetOrderOfUser}>Đơn hàng của tôi</WrapperHeaderPop>
          <WrapperHeaderPop>Xem hồ sơ</WrapperHeaderPop>
          <WrapperHeaderPop onClick={handleLogout}>Đăng xuất</WrapperHeaderPop>
        </div>
      );

    // Order page
    const handleMoveOrder = () => {
        if(user?.email){
            navigate('/order');
        }else{
            alert('Bạn phải đăng nhập để vào giỏ hàng')
            navigate('/sign-in');
        }
    }

    // Handle when search product
    const onSearch = (e) => {
        setSearch(e.target.value)
        dispatch(searchProduct(e.target.value))
    }
    return ( 
        <div>
           <WrapperHeader gutter={16}>
            <Col span={6} style={{gap: '30px', display: 'flex', alignItems: 'center'}}>
               <WrapperHeaderAccount onClick={()=>navigate('/')}>
                    <HomeOutlined style={{fontSize: '26px'}} />
                    Home
               </WrapperHeaderAccount>
                <WrapperHeaderAccount>
                    <WechatOutlined style={{fontSize: '30px'}}/>
                    Liên hệ
                </WrapperHeaderAccount>
            </Col>
            <Col span={12} style={{padding: '0  20px'}}>
                <ButtonInputSearch
                    placeholder="Nhập tên sản phẩm để tìm..."
                    size="medium"
                    onChange={onSearch}
                />
            </Col>
            <Col span={6} style={{display: 'flex', gap: '30px', justifyContent: 'flex-end' }}>
                <WrapperHeaderAccount>
                    <UserOutlined style={{fontSize: '27px'}}/>
                    {
                        user?.email ? 
                        (
                            <Popover content={content} trigger="hover">
                                <div style={{cursor: "pointer"}}>{user?.name || user?.email}</div>
                            </Popover>
                            
                        
                        ) :
                        (
                            <div onClick={handleNavigateLogin} style={{display: 'flex',flexDirection: 'column' ,cursor: "pointer"}}>
                                <span>Tài khoản</span>
                            </div>
                        )
                    }
                    
                </WrapperHeaderAccount>
                <WrapperHeaderAccount onClick={handleMoveOrder}>
                    <Badge count={order?.orderItems?.length} size="small" >
                        <ShoppingCartOutlined style={{ fontSize: '27px',color: '#fff'}}/>
                    </Badge>
                    <span>Giỏ hàng</span>
                </WrapperHeaderAccount>
            </Col>
           </WrapperHeader>
        </div>
     );
}

export default HeaderComponent;