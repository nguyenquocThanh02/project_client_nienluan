import { Row, Col, Image, Form, Input, Button} from "antd";
import React, {useState, useEffect} from "react";
import TableComponent from "../../components/TableComponent/TableComponent";
import {useQuery} from "@tanstack/react-query";
import * as UserService from '../../services/UserService';
import { useSelector, useDispatch } from "react-redux";
import {decreaseAmount, selectedOrder,
     increaseAmount, removeOrderProduct,
      removeAllOrderProduct
} from '../../redux/slides/orderSlide';

import {DownCircleOutlined, UpCircleOutlined, DeleteOutlined, ShopOutlined} from '@ant-design/icons';
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import {WrapperGroupPrice, WrapperBodyPrice, WrapperGroupSumPrice,
     WrapperName, WrapperTitleOrder, WrapperBodyInfor, WrapperIconOrdered} from "./style";
import {convertMoney} from "../../utils"; 
import ModalComponent from '../../components/ModalComponet/ModalComponent';
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as OrderService from '../../services/OrderService';
import { updateUser } from "../../redux/slides/userSlide";
import * as message from '../../components/Message/Message';


const { TextArea } = Input;
function OrderPage() {

    const order= useSelector((state) => state.order);
    const user= useSelector((state) => state.user);

    const inittial = () => ({
        fullName: user?.name || '',
        phone: user?.phone || '',
        address: user?.address || '',
    })
    

    const [loading, setLoading] = useState(false);
    const [rowSelected, setRowSelected] = useState('');
    const [stateOrderAddress, setStateOrderAddress] = useState(inittial());
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [form] = Form.useForm();

    useEffect(()=>{
        form.setFieldsValue(stateOrderAddress)
    }, [form, stateOrderAddress])

    const dispatch= useDispatch();
    let sumPrice= 0;
    let total= 0;
    let shipPrice = 0;
    const onSelectChange = (newSelectedRowKeys) => {
        setSelectedRowKeys(newSelectedRowKeys);
        dispatch(selectedOrder({newSelectedRowKeys}))
    };

    const rowSelectionUse = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const handleDecreaseAmount = (idProduct) => {
        dispatch(decreaseAmount({idProduct}));
    }
    const handleIncreaseAmount = (idProduct) => {
        dispatch(increaseAmount({idProduct}));
    }
    const handleRemoveOrderProduct = (idProduct) => {
        dispatch(removeOrderProduct({idProduct}));
    }
    const deleteAll = () => {
        if(selectedRowKeys?.length>0)
        {
            dispatch(removeAllOrderProduct({selectedRowKeys}));
        }
    }
    const renderPerform= (amount, record) => {
        return (
            <div style={{display: 'flex', gap: '6px', alignItems: 'center'}}>
                <span style={{cursor: 'pointer'}} onClick={()=>handleDecreaseAmount(record?.product)}><DownCircleOutlined /></span>
                <span style={{fontSize: '16px'}}>{amount}</span>
                <span style={{cursor: 'pointer'}} onClick={()=>handleIncreaseAmount(record?.product)}><UpCircleOutlined /></span>
            </div>
        )
    }

    const renderSumPrice= (price, record) => {
        const amounts= record.amount
        return (
            <div>
                {convertMoney(price*amounts)}
            </div>
        )
    }
    const renderDelete= (record) => {
        return (
            <div>
                <DeleteOutlined onClick={()=>handleRemoveOrderProduct(record?.product)} style={{curdor: 'pointer'}}/>
            </div>
        )
    }
    const columns = [
        {
          title: 'Sản phẩm',
          dataIndex: 'name',
          ellipsis: true,
        },
        {
          title: 'Ảnh sản phẩm',
          dataIndex: 'image',
          render: (image) => <Image src={image} width={60} />,
        },
        {
            title: 'Đơn giá',
            dataIndex: 'price',
            render: (price) => <div>{convertMoney(price)}</div>
        },
        {
            title: 'Số lượng',
            dataIndex: 'amount',
            render: (amount, record) =>  renderPerform(amount, record)
        },
        {
            title: 'Tổng',
            dataIndex: 'price',
            render: (price, record) => renderSumPrice(price, record)
        },
        {
            title:  <a>Xoá</a>,
            dataIndex: '',
            onHeaderCell: () => {
                return {
                  onClick: () => {
                    deleteAll()
                  },
                }
            },
            render: (record) =>  renderDelete(record)
          },
    ];
    const dataTable = order?.orderItems?.map(o => {
        return {...o, key: o.product}
    })


    // show modal order product
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        if(order?.orderItemsSlected.length==0){
            alert('Vui lòng chọn sản phẩm trước khi thực hiện mua hàng')
        }else setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setStateOrderAddress(inittial())
        form.resetFields();
    };
    const handleOnchange= (e) => {
        setStateOrderAddress({
            ...stateOrderAddress,
            [e.target.name]: e.target.value
        })
    }
    // Order product
    
    const mutation = useMutationHooks(
        data => OrderService.CreateService(data)
    )

    const mutationUpdateUser = useMutationHooks(
        (data) => {
            const {id, ...rest} = data;
            UserService.updateUser(id,{...rest})
        }
    )
    const { data, isLoading } = mutation
    const { data: dataUpdateUser, isLoading: isLoadingUpdateUser } = mutationUpdateUser

    useEffect(() => {
        if (data?.status === 'ERR') {
          message.error(data?.message)
        } else if(data?.status === 'OK'){
          message.success('Bạn đã đặt thành công')
          handleCancel()
        }
    }, [data?.status])

    const handleCreate= ()=>{
        const paramsUser = {
            ...user,
            ...stateOrderAddress
        }
        mutationUpdateUser.mutate({id: user?.id,...paramsUser})
        const updateUserResult= dispatch(updateUser(paramsUser));

        if (!updateUserResult.error && stateOrderAddress?.fullName && stateOrderAddress?.address && stateOrderAddress?.phone) {
            const params = {
            orderItems: order?.orderItemsSlected,
            fullName: stateOrderAddress?.fullName,
            address: stateOrderAddress?.address,
            phone: stateOrderAddress?.phone,
            city: user?.city,
            itemsPrice: total,
            shippingPrice: shipPrice,
            totalPrice: sumPrice,
            user: user?.id,
            email: user?.email
            };

            // Create a new order
            mutation.mutate(params);
        } else {
            console.error('Error updating user in Redux');
        }
    }


    return (  
        <Row style={{padding: '0 60px', minHeight: '90vh', background: '#eaf0f4'}}>
            
          <Col span={18} style={{paddingRight: '10px'}}>
            <TableComponent rowSelectionUse={rowSelectionUse} columns={columns} isLoading={loading} data={dataTable} onRow={(record, i)=>{
                    return {
                        onClick: e=>{
                            setRowSelected(record.product);
                        }
                    }
            }}/>
          </Col>
          <Col span={6} style={{padding: '35px 0', }}>
            {/* <WrapperIconOrdered><ShopOutlined /></WrapperIconOrdered> */}
            <WrapperBodyPrice >
                <h3 style={{lineHeight: '0.2',  margin: '16px auto 10px'}}>Thanh toán</h3>
                {order?.orderItemsSlected.map((item, index) => {
                    shipPrice+= (item?.price)*10*(item?.amount)/100
                    total= (item?.amount)*(item?.price)*(100- item?.discount)/100 + shipPrice;
                    sumPrice+=total;
                    return (
                    <div key={index}>
                        <WrapperName>{item?.name}</WrapperName>
                        <WrapperGroupPrice>
                        <p>Giá bán: </p>
                        <p>{convertMoney(item?.price)} x {item?.amount}</p>
                        </WrapperGroupPrice>
                        <WrapperGroupPrice>
                        <p>Giảm giá: </p>
                        <p>- {convertMoney((item?.price)*(item?.discount)/100)}</p>
                        </WrapperGroupPrice>
                        <WrapperGroupPrice>
                        <p>Phí vận chuyển: </p>
                        <p>{convertMoney(item?.price*10/100)}</p>
                        </WrapperGroupPrice>
                        <WrapperGroupPrice>
                        <p>Tổng: </p>
                        <p style={{color: 'red'}}>{convertMoney(total)}</p>
                        </WrapperGroupPrice>
                        <p style={{borderTop: '1px solid #ccc', lineHeight: '0'}}></p>
                    </div>)
                })}
                <WrapperGroupSumPrice>
                    <p>Tất cả: </p>
                    <p style={{color: 'red', fontSize: '20px'}}>{convertMoney(sumPrice)}</p>
                </WrapperGroupSumPrice>
                <ButtonComponent textBtn="Mua hàng" typeBtn="primary" size="large" styleBtn={{width: '100%'}} onClick={showModal}/>
                <ModalComponent 
                    title="Thông tin đặt hàng" 
                    open={isModalOpen} 
                    onCancel={handleCancel}
                    footer={null}
                >   
                    
                    <Form
                        name="basic" labelCol={{}}
                        wrapperCol={{}} style={{maxWidth: 600,}}
                        initialValues={{remember: false,}} autoComplete="off"
                        form={form}
                    >
                        <WrapperTitleOrder>Thông tin người đặt (Bạn có thể chỉnh sửa)</WrapperTitleOrder>
                        <Form.Item
                            label="Tên"
                            name="fullName"
                            rules={[{ required: true, message: 'Không được bỏ trống'}]}
                        >
                            <Input value={stateOrderAddress.name} onChange={handleOnchange} name="fullName"/>
                        </Form.Item>
                        <Form.Item
                            label="Điện thoại"
                            name="phone"
                            rules={[{ required: true, message: 'Không được bỏ trống'}]}
                        >
                            <Input value={stateOrderAddress.phone} onChange={handleOnchange} name="phone" />
                        </Form.Item>
                        <Form.Item
                            label="Địa chỉ"
                            name="address"
                            rules={[{ required: true, message: 'Phải nhập giá sản phẩm'}]}
                        >
                            <TextArea rows={4} value={stateOrderAddress.address} onChange={handleOnchange}  name="address"/>
                        </Form.Item>
                        <WrapperTitleOrder>Sản phẩm: </WrapperTitleOrder>
                        {order?.orderItemsSlected.map((item) => (
                            <WrapperBodyInfor key={item.id}>
                                <div style={{display: 'flex', alignItems: 'center'}}>
                                    {item.name}  
                                    <img src={item.image} alt="san pham" style={{width: '80px', height: 'auto'}}/>
                                </div>
                                x {item.amount}
                            </WrapperBodyInfor>
                        ))}
                        <WrapperBodyInfor>
                            <WrapperTitleOrder>Tổng giá tiền: </WrapperTitleOrder>
                            <div style={{color: 'red', fontSize: '20px'}}>{convertMoney(sumPrice)}</div>
                        </WrapperBodyInfor>
                        <Form.Item
                            wrapperCol={{offset: 0,span: 24,}} 
                            style={{paddingTop: '10px'}}
                        >
                            <Button type="primary" htmlType="submit" onClick={handleCreate} style={{width: '100%'}}>
                                Đặt hàng
                            </Button>
                        </Form.Item>
                    </Form>
                    <p></p>
                </ModalComponent>
            </WrapperBodyPrice>
          </Col>
        </Row>
    );
}

export default OrderPage;