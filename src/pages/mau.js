import { Row, Col, Image } from "antd";
import React, {useState} from "react";
import TableComponent from "../../components/TableComponent/TableComponent";
import {useQuery} from "@tanstack/react-query";
import * as UserService from '../../services/UserService';
import { useSelector, useDispatch } from "react-redux";
import {decreaseAmount, selectedOrder,
     increaseAmount, removeOrderProduct,
      removeAllOrderProduct
} from '../../redux/slides/orderSlide';

import {DownCircleOutlined, UpCircleOutlined, DeleteOutlined} from '@ant-design/icons';
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import {WrapperGroupPrice, WrapperBodyPrice, WrapperGroupSumPrice} from "./style";

function OrderPage() {
    const [loading, setLoading] = useState(false);
    const [rowSelected, setRowSelected] = useState('');
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const order= useSelector((state) => state.order);
    const dispatch= useDispatch();
    console.log('rowselectedUse', order?.orderItemsSlected);

    // const start = () => {
    //     setLoading(true);
    //     // ajax request after empty completing
    //     setTimeout(() => {
    //     setSelectedRowKeys([]);
    //     setLoading(false);
    //     }, 1000);
    // };
    const onSelectChange = (newSelectedRowKeys) => {
        setSelectedRowKeys(newSelectedRowKeys);
        dispatch(selectedOrder({newSelectedRowKeys}))
    };


    const rowSelectionUse = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    // const hasSelected = selectedRowKeys.length > 0;
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
                {(price*amounts).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
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
            render: (price) => <div>{price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</div>
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
          <Col span={6} style={{paddingTop: '35px', }}>
            <WrapperBodyPrice >
                <h3>Thanh toán</h3>
                {order?.orderItemsSlected.map((item, index) => {
                     
                    return (
                    <div key={index}>
                        <WrapperGroupPrice>
                        <p>Giá bán: </p>
                        <p>{item?.price}</p>
                        </WrapperGroupPrice>
                        <WrapperGroupPrice>
                        <p>Giảm giá: </p>
                        <p>- {(item?.price)*(item?.discount)/100} đ</p>
                        </WrapperGroupPrice>
                        <WrapperGroupPrice>
                        <p>Phí vận chuyển: </p>
                        <p>{item?.price*10/100}</p>
                        </WrapperGroupPrice>
                        <WrapperGroupSumPrice>
                        <p>Tổng: </p>
                        <p></p>
                        </WrapperGroupSumPrice>
                    </div>)
                })}
                <ButtonComponent textBtn="Đặt hàng" typeBtn="primary" size="large"/>
            </WrapperBodyPrice>
          </Col>
        </Row>
    );
}

export default OrderPage;