import React from "react";
import ProductDetailComponent from "../../components/ProductDetailComponent/ProductDetailComponent";
import { useParams } from "react-router-dom";
function DetailProductPage() {
    const {id}= useParams();
    return ( 
        <div style={{background: '#eaf0f4', padding: '0 60px', minHeight: '100vh'}}>
            <span>Trang chủ / Chi tiết sản phẩm</span>
            <ProductDetailComponent idProduct={id}/>
            <span>Comment component</span>
        </div>
    );
}

export default DetailProductPage;