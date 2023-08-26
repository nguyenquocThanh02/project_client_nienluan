import React from "react";
import {Badge, Col, Input as Search} from 'antd';
import {
    WrapperHeader, WrapperTextHeader,
    WrapperHeaderAccount,
} from './style';
import {
    UserDeleteOutlined,
    CaretDownOutlined,
    ShoppingCartOutlined
  } from '@ant-design/icons';
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";
function HeaderComponent() {
    return ( 
        <div>
           <WrapperHeader gutter={16}>
            <Col span={5}>
                <WrapperTextHeader>Logo</WrapperTextHeader>
            </Col>
            <Col span={13}>
                <ButtonInputSearch
                    placeholder="input search text"
                    size="large"
                    textButton="Tìm kiếm"
                />
            </Col>
            <Col span={6} style={{display: 'flex', gap: '20px'}}>
                <WrapperHeaderAccount>
                    <UserDeleteOutlined style={{fontSize: '30px'}}/>
                    <div>
                        <span>Đăng nhâp/ Đăng ký</span>
                        <div>
                            <span>Tài khoản</span>
                            <CaretDownOutlined />
                        </div>
                    </div>
                </WrapperHeaderAccount>
                <WrapperHeaderAccount>
                    <Badge count={4} size="small" >
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