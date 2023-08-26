import React from "react";
import { WrapperLableText,
    WrapperTextValue, 
    WrapperContent,
    
} from "./style";
import { Checkbox, Rate } from "antd";
function NavBarComponent() {
    function renderContent(type, options){
        const onChange = () => {

        }
        switch(type){
            case 'text':
                return options.map((option)=>{
                    return (
                        <div>
                            <WrapperTextValue>{option}</WrapperTextValue>
                        </div>
                    )
                })
            case  'checkbox':
                return (
                    <Checkbox.Group style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }} onChange={onChange}>
                        {
                            options.map((option)=>{
                                return (
                                    <Checkbox value={option.value}>{option.label}</Checkbox>
                                )
                            })
                        }
                    </Checkbox.Group>
                )
                case 'star':
                    return options.map((option)=>{
                        return (
                            <div>
                                <Rate disabled defaultValue={option} />
                                <span>{`từ ${option} sao`}</span>
                            </div>
                        )
                    })
                case 'price':
                    return options.map((option)=>{
                        return (
                            <div style={{background: '#ccc', width: 'fit-content'}}>
                                {option}
                            </div>
                        )
                    })
            default: 
                return {}
        }
    }
    return ( 
        <div>
            <WrapperLableText>Lable</WrapperLableText>
            <WrapperContent>{renderContent('text', ['Viet Nam', 'Janpan', 'Korea'])}</WrapperContent>
            <WrapperContent>
                {renderContent('checkbox', [
                    { value: 'a', label: 'A'},
                    { value: 'b', label: 'B'},
                    { value: 'c', label: 'C'},
                ])}
            </WrapperContent>
            <WrapperContent>
                {renderContent('star', [
                    3,4,5
                ])}
            </WrapperContent>
            <WrapperContent>
                {renderContent('price', [
                    '3.000.000','4.000.000','500.000'
                ])}
            </WrapperContent>
        </div>
    );
}

export default NavBarComponent;