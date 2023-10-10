import { Col, Row,Image, InputNumber } from "antd";
import React from "react";
import {WrapperStyleNameProduct,
     WrapperStyleTextSell,
     WrapperPriceProduct,
     WrapperAddressProduct, 
     WrapperQualityProduct,
     WrapperBtnBuy 
    } from "./style";
import { StarFilled } from "@ant-design/icons";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import * as ProductService from '../../services/ProductService';
import {useQuery} from '@tanstack/react-query';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {addOrderProduct} from '../../redux/slides/orderSlide';

function ProductDetailComponent({idProduct}) {
    const [quanlityProduct, setQuanlityProduct]= useState('1');
    const onChange= (value)=>{ setQuanlityProduct(value)};
    const navigate= useNavigate();
    const user= useSelector((state)=>state.user);
    const order= useSelector((state)=>state.order);
    const dispatch= useDispatch();

    const fetchGetDetailsProduct = async (id) => {
        const res= await ProductService.getDetailsProduct(id);
        return res;
    }
    
    const { data } = useQuery(['product-details', idProduct], () =>
        fetchGetDetailsProduct(idProduct),
    );
    
    const renderStars = (num) => {
        const stars = [];
        for (let i = 0; i < num; i++) {
          stars.push(<StarFilled style={{fontsSize: '12px', color: 'yellow'}} key={i}/>);
        }
        return stars;
      };

    const handleMoveOrderPage = () => {
        if(!user?.id) {
            alert('Bạn phải đăng nhập mới có thể mua hàng')
            navigate('/sign-in')
        }else{
            const orderRedux = order?.orderItems?.find((item) => item.product === data?.data?._id)
            if((orderRedux?.amount + quanlityProduct) <= orderRedux?.countInstock || (!orderRedux && data?.data?.countInStock > 0)) {
                dispatch(addOrderProduct({
                    orderItem: {
                        name: data?.data?.name,
                        amount: quanlityProduct,
                        image: data?.data?.image,
                        price: data?.data?.price,
                        product: data?.data?._id,
                        discount: data?.data?.discount,
                        countInstock: data?.data?.countInStock
                    }
                }))
            } else {
                alert('Thêm sản phẩm không thành công. Hãy thử lại!');
            }
        }
    }
    
    return ( 
        <div style={{background: '#fff', padding: '14px', minHeight: '80vh'}}>
            <Row>
                <Col span={11} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', paddingLeft: '20px'}}>
                    <Image src={data?.data?.image} alt="Image product" style={{width: '100%',height: '100%', objectFit: 'cover',minWidth: '360px'}}/>
                     {/* <Row style={{padding: '10px 0', gap: '5px'}}>
                        <Col span={4}>
                            <Image src={data?.data?.image} alt="Image product"/>
                        </Col>
                        
                    </Row> */}
                </Col>
                <Col span={13} style={{paddingLeft: '30px'}}>
                    <WrapperStyleNameProduct>{data?.data?.name}</WrapperStyleNameProduct>
                    <div>
                        {renderStars(data?.data?.rating)}
                        <WrapperStyleTextSell>Đã bán {data?.data?.selled || 1000} +</WrapperStyleTextSell>
                    </div>
                    <WrapperPriceProduct>{data?.data?.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</WrapperPriceProduct>
                    <WrapperAddressProduct>
                        <span>Địa chỉ giao hàng:</span>
                        <span className="address">quận Phong Điền, Cần Thơ</span>
                        <span className="change-address">Địa chỉ khác</span>
                    </WrapperAddressProduct>
                    <div style={{margin: '10px 0'}}>
                        <span>Còn lại: {data?.data?.countInStock} sản phẩm</span>
                    </div>
                    <WrapperQualityProduct>
                        <span>Số lượng:</span>
                        <InputNumber value={quanlityProduct} size="small" min={1} max={data?.data?.countInStock} defaultValue={1} onChange={onChange} style={{width: '50px'}}/>
                    </WrapperQualityProduct>
                    <WrapperBtnBuy>
                        <ButtonComponent textBtn="Mua ngay" typeBtn="primary" size="large"/>
                        <ButtonComponent textBtn="Thêm vào giỏ hàng" size="large" onClick={handleMoveOrderPage}/>
                    </WrapperBtnBuy>
                </Col>
            </Row>
            <Row style={{display: 'flex', margin: '20px 24px', flexDirection: 'column', alignItems: 'center', borderTop: '1px solid #ccc'}}>
                <h3>Mô tả sản phẩm</h3>
                <p style={{textAlign: 'justify', lineHeight: '1.6'}}>{data?.data?.description}</p>
            </Row>
        </div>
    );
}

export default ProductDetailComponent;