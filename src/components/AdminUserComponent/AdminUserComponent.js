import React, { useState } from 'react';
import { Button, Table, Modal } from 'antd';
import {PlusOutlined} from '@ant-design/icons'
function AdminUserComponent() {
    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
        },
        {
          title: 'Age',
          dataIndex: 'age',
        },
        {
          title: 'Address',
          dataIndex: 'address',
        },
    ];
    const data = [];
    for (let i = 0; i < 46; i++) {
        data.push({
            key: i,
            name: `Edward King ${i}`,
            age: 32,
            address: `London, Park Lane no. ${i}`,
        });
    }

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
            <div
                style={{
                marginBottom: 16,
                }}
            >   
                <p>Danh sách các tài khoản</p>
                <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
                    Reload
                </Button>
                <span
                style={{
                    marginLeft: 8,
                }}
                >
                    {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                </span>
            </div>
            <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
        </div>
     );
}

export default AdminUserComponent;