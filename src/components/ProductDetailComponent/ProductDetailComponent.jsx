import { Col, Row,Image, InputNumber, Divider } from "antd";
import React from "react";
import ImageLarge from "../../assets/images/detail-product.webp"
import ImageSmall from "../../assets/images/detail-product-small.webp"
import {WrapperStyleNameProduct,
     WrapperStyleTextSell,
     WrapperPriceProduct,
     WrapperAddressProduct, 
     WrapperQualityProduct,
     WrapperQualityBtn,
     WrapperBtnBuy 
    } from "./style";
import { StarFilled, PlusOutlined, MinusOutlined } from "@ant-design/icons";
import ButtonComponent from "../ButtonComponent/ButtonComponent";

function ProductDetailComponent() {
    const onChange= ()=>{};
    return ( 
        <Row style={{background: '#fff', padding: '14px'}}>
            <Col span={10} style={{paddingRight: '10px'}}>
                <Image src={ImageLarge} alt="Image product"/>
                <Row style={{padding: '10px 0', gap: '5px'}}>
                    <Col span={4}>
                        <Image src={ImageSmall} alt="Image product"/>
                    </Col>
                    <Col span={4}>
                        <Image src={ImageSmall} alt="Image product"/>
                    </Col>
                    <Col span={4}>
                        <Image src={ImageSmall} alt="Image product"/>
                    </Col>
                    <Col span={4}>
                        <Image src={ImageSmall} alt="Image product"/>
                    </Col>
                </Row>
            </Col>
            <Col span={14} style={{paddingLeft: '10px'}}>
                <WrapperStyleNameProduct>Cân Tiểu Ly Nhà Bếp Chống Nước Cao Cấp Khoảng Chính Xác 1g - 5kg</WrapperStyleNameProduct>
                <div>
                    <StarFilled style={{fontsSize: '12px', color: 'yellow'}} />
                    <StarFilled style={{fontsSize: '12px', color: 'yellow'}} />
                    <StarFilled style={{fontsSize: '12px', color: 'yellow'}} />
                    <WrapperStyleTextSell> | Da ban</WrapperStyleTextSell>
                </div>
                <WrapperPriceProduct>200.000</WrapperPriceProduct>
                <WrapperAddressProduct>
                    <span>Giao den</span>
                    <span className="address">th p Ho Chi Minh</span>
                    <span className="change-address">Doi dia chi</span>
                </WrapperAddressProduct>
                <div>
                    <div>số lượng</div>
                    <WrapperQualityProduct>
                        <WrapperQualityBtn><MinusOutlined /></WrapperQualityBtn>
                        <InputNumber size="small" defaultValue={3} onChange={onChange} style={{width: '60px'}}/>
                        <WrapperQualityBtn><PlusOutlined /></WrapperQualityBtn>
                    </WrapperQualityProduct>
                </div>
                <WrapperBtnBuy>
                    <div>
                        <ButtonComponent textBtn="Chon mua" typeBtn="primary" />
                    </div>
                    <div>
                        <ButtonComponent textBtn="Mua truoc tra sau"   />
                    </div>
                </WrapperBtnBuy>
            </Col>
        </Row>
     );
}

export default ProductDetailComponent;