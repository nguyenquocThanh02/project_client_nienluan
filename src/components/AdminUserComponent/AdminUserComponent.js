import React, { useState } from 'react';
import { Button, Table, Modal } from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import {useQuery} from "@tanstack/react-query";
import * as UserService from '../../services/UserService';

import TableComponent from '../TableComponent/TableComponent';

function AdminUserComponent() {
    const [rowSelected, setRowSelected] = useState('');

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
        const [loading, setLoading] = useState(false);
        const start = () => {
            setLoading(true);
            // ajax request after empty completing
            setTimeout(() => {
            setSelectedRowKeys([]);
            setLoading(false);
            }, 1000);
        };
        const onSelectChange = (newSelectedRowKeys) => {
            console.log('selectedRowKeys changed: ', newSelectedRowKeys);
            setSelectedRowKeys(newSelectedRowKeys);
        };
        const rowSelection = {
            selectedRowKeys,
            onChange: onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;

        // 
        const [isModalOpen, setIsModalOpen] = useState(false);
        const showModal = () => {
            setIsModalOpen(true);
        };
        const handleOk = () => {
            setIsModalOpen(false);
        };
        const handleCancel = () => {
            setIsModalOpen(false);
        };

        // 
        const fetchAllUsers = async () => {
            const res= await UserService.getAllUser();
            return res;
        }
        const queryUser = useQuery({ queryKey: ['users'], queryFn: fetchAllUsers })
        const { isLoading: isLoadingAllUser, data: users } = queryUser

        const renderPerform= () => {
            return (
                <div style={{display: 'flex', color: 'blue', gap: '2px'}}>
                    <span style={{cursor: 'pointer'}} >Sửa</span>
                    <span>/</span>
                    <span style={{cursor: 'pointer'}} >Xoá</span>
                </div>
            )
        }
     const columns = [
        {
          title: 'Tên tài khoản',
          dataIndex: 'name',
          sorter: (a,b)=> a.name.length - b.name.length
        },
        {
          title: 'email',
          dataIndex: 'email',
          sorter: (a,b)=> a.email.length - b.email.length
        },
        {
          title: 'phone',
          dataIndex: 'phone',
          sorter: (a,b)=> a.phone - b.phone
        },
        {
            title: 'Thực hiện',
            dataIndex: '',
            render: renderPerform
        },
    ];
    const dataTable = users?.data?.map(user => {
        return {...user, key: user._id}
    })

    return ( 
        <div>
            <div style={{display: 'flex', alignItems: 'center', gap: '10px' }}>
                <p>Thêm người dùng mới</p>
                <Button type="primary" onClick={showModal}>
                    <PlusOutlined />
                </Button>
                <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} 
                    onCancel={handleCancel}>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal>
            </div>
            <hr/>
            <p>Danh sách người dùng</p>
            <TableComponent columns={columns} isLoading={isLoadingAllUser} data={dataTable} onRow={(record, i)=>{
                return {
                    onClick: e=>{
                        setRowSelected(record._id);
                    }
                }
           }}/>
        </div>
     );
}

export default AdminUserComponent;