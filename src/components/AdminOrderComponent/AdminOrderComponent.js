import React, { useState, useEffect, useRef } from 'react';
import {  Radio, Modal} from 'antd';

import * as OrderService from '../../services/OrderService';
import Loading from "../../components/LoadingComponent/Loading";
import TableComponent from '../TableComponent/TableComponent';
import {useQuery} from "@tanstack/react-query";
import {convertMoney} from "../../utils"; 
import { useMutationHooks } from "../../hooks/useMutationHook";
import {success} from '../../components/Message/Message';


function AdminOrderComponent() {
    const [rowSelected, setRowSelected] = useState('');
    const [stateDeliver, setStateDeliver] = useState(0);
    const [selectState, setSelectState] = useState(stateDeliver);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchAllOrdered = async () => {
        const res= await OrderService.GetAllOrder();
        return res;
    }
    const queryUser = useQuery({ queryKey: ['orders'], queryFn: fetchAllOrdered })
    const { isLoading: isLoadingAllOrdered, data: orders } = queryUser
    // console.log('orders', orders)
        
    const mutationUpdate = useMutationHooks(
        (data) => {
            const {id, state} = data;
            OrderService.updateDeliver(id, state)
        }
    )

    const handleCancelUpdateOrder = () => {
        setIsModalOpen(false);
    }

    const handleOkUpdateOrder = () => {
        mutationUpdate.mutate({id: rowSelected, state: selectState}, 
        {
            onSuccess: () => {
                success("Bạn đã cập nhật trạng thái thành công");
                queryUser.refetch();
            },
        });
        handleCancelUpdateOrder();
    }

    const handleDeliver = () => {
        setIsModalOpen(true);
    }

    const handleSetSelect = (e) => {
        setSelectState(e.target.value)
    }

    const renderPerform = () => {
        return (
            <div style={{display: 'flex', color: 'blue', gap: '2px'}}>
                <span style={{cursor: 'pointer'}} onClick={handleDeliver}>Xử lý</span>
            </div>
        )
    }
    const columns = [
        {
            title: 'Mã đơn',
            dataIndex: '_id'
        },
        {
            title: 'Trạng thái',
            dataIndex: 'isDelivered',
            render: (isDelivered) => (
                <span>
                    {(() => {
                    setStateDeliver(isDelivered);
                    switch (isDelivered) {
                        case 0:
                        return 'Đang xử lý';
                        case 1:
                        return 'Đang giao';
                        case 2:
                        return 'Đã giao';
                        default:
                        return 'Trạng thái không xác định';
                    }
                    })()}
                </span>
            ),
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
        <Modal 
            title="Cập nhật trạng thái" 
            open={isModalOpen} 
            onCancel={handleCancelUpdateOrder}
            onOk={handleOkUpdateOrder}
        >
            <Radio.Group defaultValue={stateDeliver} buttonStyle="solid" onChange={handleSetSelect}>
                <Radio.Button value={0} >Đang xử lý</Radio.Button>
                <Radio.Button value={1} >Đang giao</Radio.Button>
                <Radio.Button value={2} >Đã giao</Radio.Button>
            </Radio.Group>
        </Modal>

        </div>
     );
    
}

export default AdminOrderComponent;