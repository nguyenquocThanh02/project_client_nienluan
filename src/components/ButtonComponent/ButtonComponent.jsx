import React from "react";
import {Button} from "antd";

function ButtonComponent({textBtn, typeBtn, styleBtn}) {
    return ( 
        <div>
            <Button type={typeBtn} style={{...styleBtn}}>
                {textBtn}
            </Button>
        </div>
     );
}

export default ButtonComponent;