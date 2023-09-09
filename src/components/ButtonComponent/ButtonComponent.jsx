import React from "react";
import {Button} from "antd";

function ButtonComponent({textBtn, typeBtn, styleBtn, htmlTypeBtn}) {
    return ( 
        <div>
            <Button type={typeBtn} style={{...styleBtn}} htmlType={htmlTypeBtn}>
                {textBtn}
            </Button>
        </div>
     );
}

export default ButtonComponent;