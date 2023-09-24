import React, { Fragment, useState } from 'react';
import {UserOutlined, ShoppingCartOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import {Menu} from 'antd';
import HeaderAdminComponent from '../../components/HeaderAdminComponent/HeaderAdminComponent';
import AdminProductComponent from '../../components/AdminProductComponent/AdminProductComponent';
import AdminUserComponent from '../../components/AdminUserComponent/AdminUserComponent';
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
        getItem('Sản phẩm', 'sub2', <ShoppingCartOutlined />),
        getItem('Trợ giúp', 'sub3', <QuestionCircleOutlined />),
      ];
      const onClick = (e) => {
        setKeySub(e.key)
      }

      const renderComponent = (k) => {
        if(k === 'sub1') {
          return <AdminUserComponent/>;
        }else if(k === 'sub2') {
          return <AdminProductComponent/>;
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