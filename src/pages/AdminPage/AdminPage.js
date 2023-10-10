import React, { Fragment, useState } from 'react';
import {UserOutlined, ShoppingCartOutlined, QuestionCircleOutlined, BarcodeOutlined } from '@ant-design/icons';
import {Menu} from 'antd';
import HeaderAdminComponent from '../../components/HeaderAdminComponent/HeaderAdminComponent';
import AdminProductComponent from '../../components/AdminProductComponent/AdminProductComponent';
import AdminUserComponent from '../../components/AdminUserComponent/AdminUserComponent';
import AdminOrderComponent from '../../components/AdminOrderComponent/AdminOrderComponent';
import FooterComponent from '../../components/FooterComponent/FooterComponent';
import WelcomeAdminComponent from '../../components/WelcomeAdminComponent/WelcomeAdminComponent';
function AdminPage() {

      const [keySub, setKeySub]= useState('');
      function getItem(label, key, icon, children, type) {
        return {
          key,
          icon,
          children,
          label,
          type,
        };
      }
      const items = [
        getItem('Tài khoản người dùng', 'sub1', <UserOutlined />),
        getItem('Sản phẩm', 'sub2', <BarcodeOutlined />),
        getItem('Đơn hàng', 'sub3', <ShoppingCartOutlined />),
        getItem('Trợ giúp', 'sub4', <QuestionCircleOutlined />),
      ];
      const onClick = (e) => {
        setKeySub(e.key)
      }

      const renderComponent = (k) => {
        if(k === 'sub1') {
          return <AdminUserComponent/>;
        }else if(k === 'sub2') {
          return <AdminProductComponent/>;
        }else if(k === 'sub3'){
          return <AdminOrderComponent/>
        }
        return <WelcomeAdminComponent/>;
      }
    return ( 
        <div>
            <HeaderAdminComponent/>
            <div style={{display: 'flex', marginTop: '3px', minHeight: '120vh'}}>
              <Menu
                onClick={onClick}
                style={{
                    width: 220,
                    boxShadow: '0px 1px 1px #ccc',
                    height: '145vh',
                }}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                items={items}
                
              />
              <div style={{flex: 1, margin: '0 8px'}}>{renderComponent(keySub)}</div>
            </div>
            <FooterComponent/>
        </div>
     );
}

export default AdminPage;