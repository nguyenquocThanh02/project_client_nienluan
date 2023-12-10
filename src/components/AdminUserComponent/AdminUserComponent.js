import React, { useState } from 'react';
import { Button, Modal, Form, Input, Checkbox } from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import {useQuery} from "@tanstack/react-query";
import * as UserService from '../../services/UserService';
import Loading from "../../components/LoadingComponent/Loading";
import { useMutationHooks } from "../../hooks/useMutationHook";

import TableComponent from '../TableComponent/TableComponent';

const {TextArea} = Input;

function AdminUserComponent() {
    const [rowSelected, setRowSelected] = useState('');
    const [form] = Form.useForm();

    const inittial = () => ({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        isAdmin: false,
        isSeller: false
    })
    const [stateUser, setStateUser] = useState(inittial());

    const handleOnchange = (e) => {
        setStateUser({
            ...stateUser,
            [e.target.name]: e.target.value
        })
    }

    const mutation = useMutationHooks(
        data => UserService.SignUpUser(data)
    )

    const {data: dataUser, isLoading: isLoadingCreate}= mutation;

    const hanleCreate= ()=>{
        const params = {
            name: stateUser.name,
            email: stateUser.email,
            password: stateUser.password,
            confirmPassword: stateUser.confirmPassword,
            isAdmin: stateUser.isAdmin === 'true' ? true : false,
            isSeller: stateUser.isSeller === 'true' ? true : false
          }
        
        mutation.mutate(params)
        // console.log('mutation', mutation)
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
                <Modal title="Tài khoản mới" open={isModalOpen} onOk={handleOk} 
                    onCancel={handleCancel}>
                    <Form
                        name="basic" labelCol={{span: 6,}}
                        wrapperCol={{span: 18,}} style={{maxWidth: 600,}}
                        initialValues={{remember: false,}} autoComplete="off"
                        form={form}
                    >
                        
                        <Form.Item
                            label="Tên tài khoản"
                            name="name"
                            rules={[{ required: true, message: 'Không được bỏ trống'}]}
                        >
                            <Input value={stateUser['name']} onChange={handleOnchange} name="name"/>
                        </Form.Item>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: 'Không được bỏ trống'}]}
                        >
                            <Input value={stateUser.email} onChange={handleOnchange} name="email"/>
                        </Form.Item>
                        <Form.Item
                            label="Mật khẩu"
                            name="password"
                            rules={[{ required: true, message: 'Phải nhập mật khẩu'}]}
                        >
                            <Input value={stateUser.password} onChange={handleOnchange}  name="password"/>
                        </Form.Item>
                        <Form.Item
                            label="Nhập lại mật khẩu"
                            name="confirmPassword"
                            rules={[{ required: true, message: 'Không được bỏ trống'}]}
                        >
                            <Input value={stateUser.confirmPassword} onChange={handleOnchange} name="confirmPassword" />
                        </Form.Item>
                        <Form.Item
                            label="Tài khoản quản trị"
                            name="isAdmin"
                            rules={[{ required: true, message: 'Không được bỏ trống'}]}
                        >
                            <Input type="checkbox" value={stateUser.isAdmin} onChange={handleOnchange} name="isAdmin"/>

                        </Form.Item>
                        <Form.Item 
                            label="Tài khoản bán hàng"
                            name="isSeller"
                            rules={[{ required: true, message: 'Không được bỏ trống'}]}
                        >
                            <Input type="checkbox" value={stateUser.isSeller} onChange={handleOnchange} name="isSeller"/>
                        </Form.Item>
                        
                        <Loading isLoading={isLoadingCreate}>
                            <Form.Item
                                wrapperCol={{offset: 0,span: 24,}} 
                            >
                                <Button type="primary" htmlType="submit" onClick={hanleCreate} style={{width: '100%'}}>
                                    Tạo tài khoản
                                </Button>
                            </Form.Item>
                        </Loading>
                    </Form>
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