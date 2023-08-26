import React from "react";
import ProductDetailComponent from "../../components/ProductDetailComponent/ProductDetailComponent";
function DetailProductPage() {
    return ( 
        <div style={{background: '#ccc', padding: '0 60px'}}>
            <span>Trang chủ</span>
            <ProductDetailComponent />
        </div>
    );
}

export default DetailProductPage;