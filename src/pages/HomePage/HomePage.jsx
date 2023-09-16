import React from "react";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import { WrapperTypeProduct, WrapperProduct } from "./style";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import slider4 from "../../assets/images/slider4.jpg";
import slider3 from "../../assets/images/slider3.jpg";
import CardComponent from "../../components/CardComponent/CardComponent";
import NavBarComponent from "../../components/NavBarComponent/NavBarComponent";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import * as ProductService from "../../services/ProductService";
import {useQuery} from "@tanstack/react-query";


function HomePage() {
    const arr= [];
    
    const fetchAllProduct = async () => {
        const res= await ProductService.getAllProduct();
        return res;
    }
    const {isLoading, data: products} = useQuery(['product'], fetchAllProduct, {retry: 3, retryDelay: 1000})
    return (  
        <div style={{}}>
            <div style={{padding: '0 60px', background: '#eaf0f4'}}>
                <WrapperTypeProduct>
                    {
                        arr.map((item, i)=>{
                            return (
                                <TypeProduct name={item} key={i}/>
                            )
                        })
                    }
                </WrapperTypeProduct>
            </div>
            <div style={{padding: '0 60px 20px', background: '#eaf0f4', }}>
                <SliderComponent arrImages={[slider4, slider3]}/>
                <WrapperProduct>
                {products?.data?.map((product) => {
                    return (
                        <CardComponent
                            key={product._id}
                            countInStock={product.countInStock}
                            description={product.description}
                            image={product.image}
                            name={product.name}
                            price={product.price}
                            rating={product.rating}
                            type={product.type}
                            selled={product.selled}
                            discount={product.discount}
                            id={product._id}
                        />
                    )
                })}
                </WrapperProduct>
                <div style={{textAlign: 'center'}}>
                    <ButtonComponent typeBtn="primary" textBtn="Thêm sản phẩm" styleBtn={{width: '200px'}}/>
                </div>
            </div>
        </div>
    );
}

export default HomePage;