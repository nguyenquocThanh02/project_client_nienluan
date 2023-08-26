import React from "react";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import { WrapperTypeProduct, WrapperProduct } from "./style";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import slider1 from "../../assets/images/slider1.webp";
import slider2 from "../../assets/images/slider2.webp";
import slider3 from "../../assets/images/slider3.webp";
import CardComponent from "../../components/CardComponent/CardComponent";
import NavBarComponent from "../../components/NavBarComponent/NavBarComponent";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
function HomePage() {
    const arr= ['oppo', 'redmi', 'samsung'];
    return (  
        <div>
            <div style={{padding: '0 60px', background: 'rgb(150 162 170)'}}>
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
            <div style={{padding: '0 60px', background: 'rgb(150 162 170)',}}>
                <SliderComponent arrImages={[slider1, slider2, slider3]}/>
                <WrapperProduct>
                    <CardComponent/>
                    <CardComponent/>
                    <CardComponent/>
                    <CardComponent/>
                    <CardComponent/>
                    <CardComponent/>
                    <CardComponent/>
                    <CardComponent/>
                </WrapperProduct>
                <div style={{textAlign: 'center', marginTop: '20px 0 10px 0'}}>
                    <ButtonComponent typeBtn="primary" textBtn="Thêm sản phẩm" styleBtn={{width: '200px'}}/>
                </div>
            </div>
        </div>
    );
}

export default HomePage;