import React, { useState, useEffect, useRef } from 'react';
import { Button, Modal,Form, Input, Space} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import { SearchOutlined } from '@ant-design/icons';


import {WrapperUploadFile} from "./style";
import { useNavigate } from "react-router-dom";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as ProductService from '../../services/ProductService';
import * as message from '../../components/Message/Message';
import Loading from "../../components/LoadingComponent/Loading";
import TableComponent from '../TableComponent/TableComponent';
import DrawerComponent from '../DrawerComponent/DrawerComponent';
import { getBase64 } from '../../utils';
import {useQuery} from "@tanstack/react-query";
import ModalComponent from '../ModalComponet/ModalComponent';

const { TextArea } = Input;

function AdminProductComponent() {

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
    const [stateProduct, setStateProduct] = useState(inittial());
    const [stateDetailsProduct, setStateDetailsProduct] = useState(inittial());
    const [isModalDeleteProduct, setIsModalDeleteProduct] = useState(false);
    const [rowSelected, setRowSelected] = useState('');
    const [isDrawerOpen, setIsDrawerOpen] = useState('');
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    const [form] = Form.useForm();
    const [formUpdate] = Form.useForm();

    // Add product function
    const handleOnchange = (e) => {
        setStateProduct({
            ...stateProduct,
            [e.target.name]: e.target.value
        })
    }

    const handleDetailsOnchange = (e) => {
        setStateDetailsProduct({
            ...stateDetailsProduct,
            [e.target.name]: e.target.value
        })
    }


    useEffect(()=>{
        if(rowSelected){
            fetchGetDetailsProduct(rowSelected)
        }
    }, [rowSelected])

    useEffect(()=>{
        formUpdate.setFieldsValue(stateDetailsProduct)
    }, [formUpdate, stateDetailsProduct])


    const mutation = useMutationHooks(
        data => ProductService.CreateProduct(data)
    )
    const mutationUpdate = useMutationHooks(
        (data) => {
            const {id, ...rest} = data;
            ProductService.updateProduct(id,{...rest})
        }
    )
    const mutationDelete = useMutationHooks(
        (data) => {
            const {id} = data;
            ProductService.deleteProduct(id)
        }
    )
    
    const { data, isLoading } = mutation
    const { data: dataUpdate, isLoading: isLoadingUpdate } = mutationUpdate
    const { data: dataDelete, isLoading: isLoadingDelete } = mutationDelete
    

    useEffect(() => {
        if (data?.status === 'ERR') {
            message.error()
        } else if(data?.status === 'OK'){
            message.success()
            handleCancel();
        }
    }, [data?.status])

    // Khi thanh cong của update
    useEffect(() => {
        if (dataUpdate?.reset?.status === 'ERR') {
            message.error()
        } else if(dataUpdate?.reset?.status === 'success'){
            message.success()
        }
    }, [dataUpdate?.reset?.status])

    // Khi thanh cong của delete
    // useEffect(() => {
    //     if (dataDelete?.reset?.status === 'ERR') {
    //         message.error()
    //     } else if(dataDelete?.reset?.status === 'success'){
    //         message.success()
    //     }
    // }, [dataDelete?.reset?.status])


    const hanleCreate= ()=>{
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
        // console.log('mutation', mutation)
    }

    const hanleUpdate= ()=>{
        const params = {
            name: stateDetailsProduct.name,
            price: stateDetailsProduct.price,
            description: stateDetailsProduct.description,
            rating: stateDetailsProduct.rating,
            image: stateDetailsProduct.image,
            type: stateDetailsProduct.type,
            countInStock: stateDetailsProduct.countInStock,
            discount: stateDetailsProduct.discount
          }
        mutationUpdate.mutate({id: rowSelected,...params})
        // console.log('dataUpdate', dataUpdate);
        // console.log('isLoadingUpdate', isLoadingUpdate)
        // console.log('mutationUpdate', mutationUpdate)
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
    const handleOnchangeAvatarDetails = async ({ fileList }) => {
        const file = fileList[0]
        if (!file?.url && !file?.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateDetailsProduct({
            ...stateDetailsProduct,
            image: file.preview
        })
    }
    
    //   get all products
    const fetchAllProduct = async () => {
        const res= await ProductService.getAllProduct();
        return res;
    }
    // const {isLoading: isLoadingAllProduct, data: products} = useQuery(['product'], fetchAllProduct, {retry: 3, retryDelay: 1000})
    const queryProduct = useQuery({ queryKey: ['products'], queryFn: fetchAllProduct })
    const { isLoading: isLoadingAllProduct, data: products } = queryProduct
    const fetchGetDetailsProduct = async () => {
        const res= await ProductService.getDetailsProduct(rowSelected);
        setStateDetailsProduct({
            name: res?.data?.name,
            price: res?.data?.price,
            description: res?.data?.description,
            rating: res?.data?.rating,
            image: res?.data?.image,
            type: res?.data?.type,
            countInStock: res?.data?.countInStock,
            discount: res?.data?.discount
        })
        return res;
    }
    const handleGetDetail = () => {
        if(rowSelected){
            fetchGetDetailsProduct();
        }
        setIsDrawerOpen(true)
    }

    
    const renderPerform= () => {
        return (
            <div style={{display: 'flex', color: 'blue', gap: '2px'}}>
                <span style={{cursor: 'pointer'}} onClick={handleGetDetail}>Sửa</span>
                <span>/</span>
                <span style={{cursor: 'pointer'}} onClick={()=> setIsModalDeleteProduct(true)}>Xoá</span>
            </div>
        )
    }

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
      };
      const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
      };
      const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
          <div
            style={{
              padding: 8,
            }}
            onKeyDown={(e) => e.stopPropagation()}
          >
            <Input
              ref={searchInput}
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
              style={{
                marginBottom: 8,
                display: 'block',
              }}
            />
            <Space>
              <Button
                type="primary"
                onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                icon={<SearchOutlined />}
                size="small"
                style={{
                  width: 90,
                }}
              >
                Search
              </Button>
              <Button
                onClick={() => clearFilters && handleReset(clearFilters)}
                size="small"
                style={{
                  width: 90,
                }}
              >
                Reset
              </Button>
              <Button
                type="link"
                size="small"
                onClick={() => {
                  confirm({
                    closeDropdown: false,
                  });
                  setSearchText(selectedKeys[0]);
                  setSearchedColumn(dataIndex);
                }}
              >
                Filter
              </Button>
              <Button
                type="link"
                size="small"
                onClick={() => {
                  close();
                }}
              >
                close
              </Button>
            </Space>
          </div>
        ),
        filterIcon: (filtered) => (
          <SearchOutlined
            style={{
              color: filtered ? '#1677ff' : undefined,
            }}
          />
        ),
        onFilter: (value, record) =>
          record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
          if (visible) {
            setTimeout(() => searchInput.current?.select(), 100);
          }
        },
      });
    const columns = [
        {
          title: 'Tên sản phẩm',
          dataIndex: 'name',
          sorter: (a,b)=> a.name.length - b.name.length,
           ...getColumnSearchProps('name'),
        },
        {
          title: 'Loại',
          dataIndex: 'type',
          sorter: (a,b)=> a.type.length - b.type.length,
           ...getColumnSearchProps('type'),
        },
        {
          title: 'Giá',
          dataIndex: 'price',
          sorter: (a,b)=> a.price - b.price,
           ...getColumnSearchProps('price'),
        },
        {
            title: 'Số lượng hàng',
            dataIndex: 'countInstock',
            sorter: (a,b)=> a.countInStock - b.countInStock,
             ...getColumnSearchProps('countInStock'),
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
    
    const handleCancelDeleteProduct= () => {
        setIsModalDeleteProduct(false);
    }

    const handleOKDeleteProduct = () => {
        mutationDelete.mutate({id: rowSelected})
        handleCancelDeleteProduct();
    }

    return ( 
        <div>
            <div style={{display: 'flex', alignItems: 'center', gap: '10px' }}>
                <p>Thêm sản phẩm mới</p>
                <Button type="primary" onClick={showModal}>
                    <PlusOutlined />
                </Button>
                <ModalComponent 
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
                                <Button type="primary" htmlType="submit" onClick={hanleCreate} style={{width: '100%'}}>
                                    Thêm sản phẩm
                                </Button>
                            </Form.Item>
                        </Loading>
                    </Form>
                </ModalComponent>
            </div>
            <hr/>
            <p>Danh sách tất cả sản phẩm</p>
           <TableComponent columns={columns} isLoading={isLoadingAllProduct} data={dataTable} onRow={(record, i)=>{
                return {
                    onClick: e=>{
                        setRowSelected(record._id);
                    }
                }
           }}/>
           <DrawerComponent
                title="Chi tiết sản phẩm" 
                isOpen={isDrawerOpen} 
                onClose={() => setIsDrawerOpen(false)}
            >
                <Form
                    name="basic" labelCol={{span: 6,}}
                    wrapperCol={{span: 18,}} style={{maxWidth: 800,}}
                    initialValues={{remember: false,}} autoComplete="off"
                    form={formUpdate}
                >
                    <Form.Item
                        label="Tên sản phẩm"
                        name="name"
                        rules={[{ required: true, message: 'Không được bỏ trống'}]}
                    >
                        <Input placeholder="Tên sản phẩm"  value={stateDetailsProduct['name']} onChange={handleDetailsOnchange} name="name"/>
                    </Form.Item>
                    <Form.Item
                        label="Loại sản phẩm"
                        name="type"
                        rules={[{ required: true, message: 'Không được bỏ trống'}]}
                    >
                        <Input placeholder="Loại sản phẩm" value={stateDetailsProduct.type} onChange={handleDetailsOnchange} name="type" />
                    </Form.Item>
                    <Form.Item
                        label="Giá bán"
                        name="price"
                        rules={[{ required: true, message: 'Phải nhập giá sản phẩm'}]}
                    >
                        <Input placeholder="Giá sản phẩm" value={stateDetailsProduct.price} onChange={handleDetailsOnchange}  name="price"/>
                    </Form.Item>
                    <Form.Item
                        label="Số lượng hàng"
                        name="countInStock"
                        rules={[{ required: true, message: 'Không được bỏ trống'}]}
                    >
                        <Input placeholder="Số lượng hàng" value={stateDetailsProduct.countInStock} onChange={handleDetailsOnchange} name="countInStock" />
                    </Form.Item>
                    <Form.Item
                        label="Số sao"
                        name="rating"
                        rules={[{ required: true, message: 'Không được bỏ trống'}]}
                    >
                        <Input placeholder="Nhập số sao" value={stateDetailsProduct.rating} onChange={handleDetailsOnchange} name="rating"  />
                    </Form.Item>
                    <Form.Item 
                        label="Mô tả sản phẩm"
                        name="description"
                        rules={[{ required: true, message: 'Không được bỏ trống'}]}
                    >
                        <TextArea placeholder='Mô tả sản phẩm' rows={4} value={stateDetailsProduct.description} onChange={handleDetailsOnchange} name="description"/>
                    </Form.Item>
                    <Form.Item
                        label="Giảm giá"
                        name="discount"
                        rules={[{ required: true, message: 'Phải nhập giảm giá hoặc 0'}]}
                    >
                        <Input placeholder="Giảm giá"  value={stateDetailsProduct.discount} onChange={handleDetailsOnchange} name="discount" />
                    </Form.Item>
                    <Form.Item
                        label="Ảnh sản phẩm"
                        name="image"
                        rules={[{ required: true, message: 'Phải chọn ảnh cho sản phẩm' }]}
                        >
                        <WrapperUploadFile onChange={handleOnchangeAvatarDetails} maxCount={1}>
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <Button ><PlusOutlined /></Button>
                                {stateDetailsProduct?.image && (
                                <img src={stateDetailsProduct?.image} style={{
                                    height: '60px',
                                    width: '60px',
                                    objectFit: 'cover',
                                    marginLeft: '10px'
                                }} alt="product" />
                                )}
                            </div>
                        </WrapperUploadFile>
                    </Form.Item>
                    
                    <Loading isLoading={isLoadingUpdate}>
                        <Form.Item
                            wrapperCol={{offset: 0,span: 24,}} 
                        >
                            <Button type="primary" htmlType="submit" onClick={hanleUpdate} style={{width: '100%'}}>
                                Cập nhật 
                            </Button>
                        </Form.Item>
                    </Loading>
                </Form>
            </DrawerComponent>
            <Modal 
                    title="Xoá sản phẩm" 
                    open={isModalDeleteProduct} 
                    onCancel={handleCancelDeleteProduct}
                    onOk={handleOKDeleteProduct}
                >
                <p>Bạn có chắc chắn muốn xoá sản phẩm này không?</p>
            </Modal>
        </div>
     );
}

export default AdminProductComponent;