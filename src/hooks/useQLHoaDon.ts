'use client'

import { ResponsePageInfo } from "@/interface/general";
import { tableOrderDataType, tableOrderSearchVMDataType } from "@/interface/Order/Order";
import { orderService } from "@/services/order/order.service";
import { setIsLoading } from "@/store/general/GeneralSlice";
import { useSelector } from "@/store/hooks";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
const useQLHoaDon = () =>
{
    const dispatch = useDispatch();
    const loading = useSelector(state => state.general.isLoading) ;
    const [ lstOrders, setLstOrders ] = useState<tableOrderDataType[]>( [] );   
    const [ searchData, setSearchData ] = useState<tableOrderSearchVMDataType>();   
    const [ pageIndex, setPageIndex ] = useState<number>( 1 );
    const [pageSize, setPageSize] = useState<number>(20);
    const [ dataPage, setDataPage ] = useState<ResponsePageInfo>( );
    
    const [isPannelSearch, setIsPannelSearch] = useState<boolean>(false);
    
    const handleGetData = useCallback( async ( searchData: tableOrderSearchVMDataType ) =>
    {
        dispatch( setIsLoading( true ) );
        try {
            const data = await orderService.GetDate( searchData );
            if ( data.status )
            {
                setLstOrders( data.data.items );
                setDataPage( {
                    pageIndex: data.data.pageIndex,
                    pageSize: data.data.pageSize,
                    totalCount: data.data.totalCount,
                    totalPage: data.data.totalPage
                });
            }
        } catch (error) {
            toast.error( "Có lỗi xảy ra trong quá trình lấy dữ liệu" );
        } finally
        {
            dispatch( setIsLoading( false ) );
        }
    }, [searchData])


    return {
        
        lstOrders,
        searchData,
        pageIndex,
        pageSize,
        isPannelSearch,
        loading, 
        dataPage,
        setDataPage,
        setLstOrders,
        handleGetData,
        setSearchData,
        setPageIndex,
        setPageSize,
        setIsPannelSearch

    }
}

export default useQLHoaDon;