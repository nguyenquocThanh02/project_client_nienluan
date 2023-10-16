import { Row, Col, Image, Form, Input, Button} from "antd";
import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import {decreaseAmount, selectedOrder,
     increaseAmount, removeOrderProduct,
      removeAllOrderProduct
} from '../../redux/slides/orderSlide';

import {DownCircleOutlined, UpCircleOutlined, DeleteOutlined, ShopOutlined} from '@ant-design/icons';
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import {WrapperInforOrdered, WrapperFollowOrdered, WrapperBodyOrdered} from "./style";
import {convertMoney} from "../../utils"; 
import ModalComponent from '../../components/ModalComponet/ModalComponent';
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as OrderService from '../../services/OrderService';
import { updateUser } from "../../redux/slides/userSlide";
import * as message from '../../components/Message/Message';
import Loading from "../../components/LoadingComponent/Loading";
import TableComponent from '../../components/TableComponent/TableComponent';
import {success} from '../../components/Message/Message';

const { TextArea } = Input;
function OrderPage() {

    const user= useSelector((state) => state.user);
    const [rowSelected, setRowSelected] = useState('');

    // Get all orders of user
    const mutation = useMutationHooks(
        data => OrderService.GetOrderOfUser(data)
    )

    const { data, isLoading } = mutation
    
    useEffect(()=>{
        mutation.mutate(user?.id)
    }, [])

    //Cancel
    const mutationCancel = useMutationHooks(
        (data) => {
          const { id , orderItems, userId } = data
          const res = OrderService.CancelOrder(id,orderItems, userId)
          return res
        }
    )

    const handleCancel= (idOrder, orderedItems, userOrder) => {
        mutationCancel.mutate({id : idOrder, orderItems: orderedItems, userId: userOrder},{
            onSuccess: () => {
              success('Bạn đã huỷ thành công đơn hàng này')
            }, })
    }
        
    useEffect(() => {
        if (mutationCancel.isSuccess) {
          mutation.mutate(user?.id);
        }
      }, [mutationCancel.isSuccess]);

    const renderProductColumn = (record) => (
        <div>
          {record.orderItems.map((item) => (
            <div style={{width: '400px'}}>
                <div key={item._id}>{item.name}</div>
                <img src={item.image} alt="" style={{width: '40px'}}/>
            </div>
          ))}
        </div>
    );
    const renderPerform= (record) => {
        return (
            <div style={{display: 'flex', color: 'blue', gap: '2px'}}>
                <span style={{cursor: 'pointer'}} onClick={()=>handleCancel(record?._id, record?.orderItems, record?.user)}>HUỶ</span>
            </div>
        )
    }
    const columns = [
        {
            title: 'Sản phẩm',
            render: renderProductColumn
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'totalPrice'
        },
        {
            title: 'Trạng thái đơn hàng',
            dataIndex: ''
        },
        {
            title: 'Thực hiện',
            dataIndex: '',
            render: (record) => renderPerform(record)
        },
    ];
    const dataTable = data?.data?.map(order => {
        return {...order, key: order._id}
    })

    return (  
        <Row style={{padding: '0 60px', minHeight: '90vh', background: '#eaf0f4', width: '100%'}}>
           <Col span={24}>
            <TableComponent columns={columns} isLoading={isLoading} data={dataTable} onRow={(record, i)=>{
                    return {
                        onClick: e=>{
                            setRowSelected(record._id);
                        }
                    }
            }}/>
          </Col>
        </Row> 
    );
}

export default OrderPage;