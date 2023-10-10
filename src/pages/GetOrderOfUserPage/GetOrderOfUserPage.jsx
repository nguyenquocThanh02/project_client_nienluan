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


const { TextArea } = Input;
function OrderPage() {

    const user= useSelector((state) => state.user);
    const mutation = useMutationHooks(
        data => OrderService.GetOrderOfUser(data)
    )

    const { data, isLoading } = mutation
    
    useEffect(()=>{
        mutation.mutate(user?.id)
    }, [])

    console.log(data)

    return (  
        <Loading isLoading={isLoading}>
        <Row style={{padding: '0 60px', minHeight: '90vh', background: '#eaf0f4', width: '100%'}}>
            {data?.data?.map((ordered) => (
                <div key={ordered._id}>
                    <WrapperBodyOrdered>
                       <div>
                            {
                                ordered?.orderItems?.map((item) => (
                                    <WrapperInforOrdered>
                                        <div>{item?.name}</div>
                                        <img src={item?.image} alt="" style={{width: '60px'}}/>
                                        <div>x {item?.amount}</div>
                                        {/* <div>{item?.price}</div> */}
                                    </WrapperInforOrdered>
                                ))
                            }
                       </div>
                        <div>{ordered?.totalPrice}</div>
                    </WrapperBodyOrdered>
                    <WrapperFollowOrdered>
                    </WrapperFollowOrdered>
                </div>
            ))}
        </Row>
        </Loading>
    );
}

export default OrderPage;