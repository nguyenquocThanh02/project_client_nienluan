import React from "react";
import { 
    WrapperCardStyle,
    StyleNameProduct,
    WrapperReportText,
    WrapperPriceText,
    WrapperDiscountText
} from "./style";
import { StarFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

function CardComponent(props) {
    const { countInStock, description, image, name, price, rating, type, selled, discount, id}= props;
    const navigate= useNavigate();

    const handleGetDetailsProduct = (id) => {
        navigate(`/detail-product/${id}`);
    }
    return ( 
        <div>
            <WrapperCardStyle
                key={id}
                hoverable
                headStyle={{width: '200px', height: '200px'}}
                style={{ width: 200 }}
                bodyStyle={{padding: '10px'}}
                cover={<img alt="example" src={image} />}
                onClick={()=>handleGetDetailsProduct(id)}
            >
                <StyleNameProduct>{name}</StyleNameProduct>
                <WrapperReportText>
                    <span>
                        <span>{rating}</span>
                        <StarFilled style={{fontSize: '12px', color: 'yellow', marginLeft: '1px'}}/>
                    </span>
                    <span>Đã bán {selled || 1000}+</span>
                </WrapperReportText>
                <WrapperPriceText>
                    {price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                    <WrapperDiscountText>
                        -{discount}%
                    </WrapperDiscountText>
                </WrapperPriceText>
            </WrapperCardStyle>
        </div>
     );
}

export default CardComponent;