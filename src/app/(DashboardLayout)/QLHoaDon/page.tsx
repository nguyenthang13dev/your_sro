'use client'

import Flex from "@/components/shared-components/Flex";
import AutoBreadcrumb from "@/components/util-compenents/Breadcrumb";
import useQLHoaDon from "@/hooks/useQLHoaDon";
import { CloseOutlined, SearchOutlined } from "@ant-design/icons";
import { Button } from "antd";
import classes from "./QLHoaDon.module.scss";
const QLHoaDon = () =>
{
    const {handleGetData, lstOrders, isPannelSearch} = useQLHoaDon()



    return (

        <Flex
            alignItems="center"
            justifyContent="space-between"
            className={classes.mgButton10}
        >
            <AutoBreadcrumb />
            <div>   
                <Button
                    type="primary"
                    className={classes.mgButton10}
                    icon={isPannelSearch ? <CloseOutlined /> : <SearchOutlined />}
                >
                    {/* {isPannelSearch ? ""} */}
                </Button>
            </div>
        </Flex>

    )

                
                
                
                


}


export default QLHoaDon;