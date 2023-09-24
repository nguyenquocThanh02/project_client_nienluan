import React from "react";
import {Button} from "antd";

function ButtonComponent(props) {
    const {textBtn, typeBtn, styleBtn, htmlTypeBtn, size}= props;
    return ( 
        <div>
            <Button type={typeBtn} style={{...styleBtn}} htmlType={htmlTypeBtn} size={size} {...props}>
                {textBtn}
            </Button>
        </div>
     );
}

export default ButtonComponent;