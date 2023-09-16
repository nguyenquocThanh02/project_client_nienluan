import React, { useState, useEffect } from 'react';
import { Button, Table, Modal,Form, Input, Upload} from 'antd';
import {PlusOutlined} from '@ant-design/icons';

import {WrapperUploadFile} from "./style";
import { useNavigate } from "react-router-dom";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as ProductService from '../../services/ProductService';
import * as message from '../../components/Message/Message';
import Loading from "../../components/LoadingComponent/Loading";
import TableComponent from '../TableComponent/TableComponent';
import { getBase64 } from '../../utils';
import {useQuery} from "@tanstack/react-query";

const { TextArea } = Input;

function AdminProductComponent() {
    // Add product function
    const inittial = () => ({
        name: '',
        price: '',
        description: '',
        rating: '',
        image: '',
        type: '',
        countInStock: '',
        ntype: '',
        discount: '',
    })
    const [stateProduct, setStateProduct] = useState(inittial())

    const [form] = Form.useForm();

    const handleOnchange = (e) => {
        setStateProduct({
        ...stateProduct,
        [e.target.name]: e.target.value
        })
    }

    const mutation = useMutationHooks(
        data => ProductService.CreateProduct(data)
    )

    const { data, isLoading } = mutation

    useEffect(() => {
        if (data?.status === 'ERR') {
            message.error()
        } else if(data?.status === 'OK'){
            message.success()
            handleCancel();
        }
    }, [data?.status])


    const hanleHienthi= ()=>{
        const params = {
            name: stateProduct.name,
            price: stateProduct.price,
            description: stateProduct.description,
            rating: stateProduct.rating,
            image: stateProduct.image,
            type: stateProduct.type,
            countInStock: stateProduct.countInStock,
            discount: stateProduct.discount
          }
        mutation.mutate(params)
    }

    const handleOnchangeAvatar = async ({ fileList }) => {
        const file = fileList[0]
        if (!file?.url && !file?.preview) {
          file.preview = await getBase64(file.originFileObj);
        }
        setStateProduct({
          ...stateProduct,
          image: file.preview
        })
      }
    
    //   get all products
    const fetchAllProduct = async () => {
        const res= await ProductService.getAllProduct();
        return res;
    }
    const {isLoading: isLoadingAllProduct, data: products} = useQuery(['product'], fetchAllProduct, {retry: 3, retryDelay: 1000})

    const renderPerform= () => {
        return (
            <div style={{display: 'flex', color: 'blue', gap: '2px'}}>
                <span>Sửa</span>
                <span>/</span>
                <span>Xoá</span>
            </div>
        )
    }
    const columns = [
        {
          title: 'Tên sản phẩm',
          dataIndex: 'name',
        },
        {
          title: 'Loại',
          dataIndex: 'type',
        },
        {
          title: 'Giá',
          dataIndex: 'price',
        },
        {
            title: 'Số lượng hàng',
            dataIndex: 'countInstock',
        },
        {
            title: 'Thực hiện',
            dataIndex: '',
            render: renderPerform
        },
    ];
    const dataTable = products?.data?.map(product => {
        return {...product, key: product._id}
    })

    //   Modal 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setStateProduct(inittial())
        form.resetFields();
    };
    return ( 
        <div>
            <div style={{display: 'flex', alignItems: 'center', gap: '10px' }}>
                <p>Thêm sản phẩm mới</p>
                <Button type="primary" onClick={showModal}>
                    <PlusOutlined />
                </Button>
                <Modal 
                    title="Thông tin sản phẩm" 
                    open={isModalOpen} 
                    onCancel={handleCancel}
                    footer={null}
                >
                    <Form
                        name="basic" labelCol={{span: 6,}}
                        wrapperCol={{span: 18,}} style={{maxWidth: 600,}}
                        initialValues={{remember: false,}} autoComplete="off"
                        form={form}
                    >
                        
                        <Form.Item
                            label="Tên sản phẩm"
                            name="name"
                            rules={[{ required: true, message: 'Không được bỏ trống'}]}
                        >
                            <Input placeholder="Tên sản phẩm"  value={stateProduct['name']} onChange={handleOnchange} name="name"/>
                        </Form.Item>
                        <Form.Item
                            label="Loại sản phẩm"
                            name="type"
                            rules={[{ required: true, message: 'Không được bỏ trống'}]}
                        >
                            <Input placeholder="Loại sản phẩm" value={stateProduct.type} onChange={handleOnchange} name="type" />
                        </Form.Item>
                        <Form.Item
                            label="Giá bán"
                            name="price"
                            rules={[{ required: true, message: 'Phải nhập giá sản phẩm'}]}
                        >
                            <Input placeholder="Giá sản phẩm" value={stateProduct.price} onChange={handleOnchange}  name="price"/>
                        </Form.Item>
                        <Form.Item
                            label="Số lượng hàng"
                            name="countInStock"
                            rules={[{ required: true, message: 'Không được bỏ trống'}]}
                        >
                            <Input placeholder="Số lượng hàng" value={stateProduct.countInStock} onChange={handleOnchange} name="countInStock" />
                        </Form.Item>
                        <Form.Item
                            label="Số sao"
                            name="rating"
                            rules={[{ required: true, message: 'Không được bỏ trống'}]}
                        >
                            <Input placeholder="Nhập số sao" value={stateProduct.rating} onChange={handleOnchange} name="rating"  />
                        </Form.Item>
                        <Form.Item 
                            label="Mô tả sản phẩm"
                            name="description"
                            rules={[{ required: true, message: 'Không được bỏ trống'}]}
                        >
                            <TextArea placeholder='Mô tả sản phẩm' rows={4} value={stateProduct.description} onChange={handleOnchange} name="description"/>
                        </Form.Item>
                        <Form.Item
                            label="Giảm giá"
                            name="discount"
                            rules={[{ required: true, message: 'Phải nhập giảm giá hoặc 0'}]}
                        >
                            <Input placeholder="Giảm giá"  value={stateProduct.discount} onChange={handleOnchange} name="discount" />
                        </Form.Item>
                        <Form.Item
                            label="Ảnh sản phẩm"
                            name="image"
                            rules={[{ required: true, message: 'Phải chọn ảnh cho sản phẩm' }]}
                            >
                            <WrapperUploadFile onChange={handleOnchangeAvatar} maxCount={1}>
                                <div style={{display: 'flex', alignItems: 'center'}}>
                                    <Button ><PlusOutlined /></Button>
                                    {stateProduct?.image && (
                                    <img src={stateProduct?.image} style={{
                                        height: '60px',
                                        width: '60px',
                                        objectFit: 'cover',
                                        marginLeft: '10px'
                                    }} alt="product" />
                                    )}
                                </div>
                            </WrapperUploadFile>
                        </Form.Item>
                        
                        <Loading isLoading={isLoading}>
                            <Form.Item
                                wrapperCol={{offset: 0,span: 24,}} 
                            >
                                <Button type="primary" htmlType="submit" onClick={hanleHienthi} style={{width: '100%'}}>
                                    Thêm sản phẩm
                                </Button>
                            </Form.Item>
                        </Loading>
                    </Form>
                </Modal>
            </div>
            <hr/>
           <TableComponent columns={columns} isLoading={isLoadingAllProduct} data={dataTable}/>
        </div>
     );
}

export default AdminProductComponent;