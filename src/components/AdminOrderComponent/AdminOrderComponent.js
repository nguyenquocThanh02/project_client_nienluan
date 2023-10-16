import React, { useState, useEffect, useRef } from 'react';
import {  Input} from 'antd';

import * as OrderService from '../../services/OrderService';
import Loading from "../../components/LoadingComponent/Loading";
import TableComponent from '../TableComponent/TableComponent';
import {useQuery} from "@tanstack/react-query";
import {convertMoney} from "../../utils"; 


function AdminOrderComponent() {
    const [rowSelected, setRowSelected] = useState('');

    const fetchAllOrdered = async () => {
        const res= await OrderService.GetAllOrder();
        return res;
    }
    const queryUser = useQuery({ queryKey: ['orders'], queryFn: fetchAllOrdered })
    const { isLoading: isLoadingAllOrdered, data: orders } = queryUser
    console.log('orders', orders)
        
    const renderPerform= () => {
        return (
            <div style={{display: 'flex', color: 'blue', gap: '2px'}}>
                <span style={{cursor: 'pointer'}}>Xem</span>
                <span>/</span>
                <span style={{cursor: 'pointer'}}>Xử lý</span>
            </div>
        )
    }
    const columns = [
        {
            title: 'Mã đơn',
            dataIndex: '_id'
        },
        {
            title: 'Ngày đặt',
            dataIndex: 'createdAt',
            sorter: (a, b) => {
                const dateA = new Date(a.createdAt);
                const dateB = new Date(b.createdAt);
                return dateA.getTime() - dateB.getTime();
            },
        },
        {
            title: 'Người đặt',
            render: (record) => record.shippingAddress.fullName
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'itemsPrice',
            sorter: (a,b)=> a.itemsPrice - b.itemsPrice,
        },
        {
            title: 'Thực hiện',
            dataIndex: '',
            render: renderPerform
        },
              
        
    ];
    const dataTable = orders?.data?.map(order => {
        return {...order, key: order._id}
    })

    return ( 
        <div>
            <p>Tất cả đơn hàng</p>
            <TableComponent columns={columns} isLoading={isLoadingAllOrdered} data={dataTable} onRow={(record, i)=>{
                return {
                    onClick: e=>{
                        setRowSelected(record._id);
                    }
                }
           }}/>
        </div>
     );
    
}

export default AdminOrderComponent;