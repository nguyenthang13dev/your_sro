'use client'

import { ResponsePageInfo } from "@/interface/general";
import { tableSilkTichNapDataType, tableSilkTichNapSearchType } from "@/interface/QLSilkTichNap/QLSilkTichNap";
import { qlSilkTichNapService } from "@/services/SilkTichNap/SilkTichNap.service";
import { setIsLoading } from "@/store/general/GeneralSlice";
import { useSelector } from "@/store/hooks";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
const useQLSikTichNap = () =>
{
    const dispatch = useDispatch();
    const loading = useSelector(state => state.general.isLoading) ;
    const [ lstSilkTichNap, setLstSilkTichNap ] = useState<tableSilkTichNapDataType[]>( [] );   
    const [ searchData, setSearchData ] = useState<tableSilkTichNapSearchType>( {
        pageIndex: 1,
        pageSize: 20,
    });   
    const [ pageIndex, setPageIndex ] = useState<number>( 1 );
    const [pageSize, setPageSize] = useState<number>(20);
    const [ dataPage, setDataPage ] = useState<ResponsePageInfo>( );
    const [isPannelSearch, setIsPannelSearch] = useState<boolean>(false);
    const [ silktichNapSeleccted, setSilTichNapSelected ] = useState<tableSilkTichNapDataType>();


  const [currentTichNap, setCurrentTichNap] = useState<tableSilkTichNapDataType | null>();



    //hiển thị các cread or update

    const handleGetData = useCallback( async ( searchData: tableSilkTichNapSearchType ) =>
    {
        dispatch( setIsLoading( true ) );
        try {
            const data = await qlSilkTichNapService.GetData(searchData );
            if ( data.status )
            {
                setLstSilkTichNap( data.data.items );
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



    const handleSetSelected = ( record: tableSilkTichNapDataType ) =>
    {
        setSilTichNapSelected( record );
    }

    return {
        
        lstSilkTichNap,
        searchData,
        pageIndex,
        pageSize,
        isPannelSearch,
        loading, 
        dataPage,
        silktichNapSeleccted,
        currentTichNap, 

        setDataPage,
        setLstSilkTichNap,
        handleGetData,
        setSearchData,
        setPageIndex,
        setPageSize,
        setIsPannelSearch, 
        setSilTichNapSelected,
        handleSetSelected,
        setCurrentTichNap,

    }
}

export default useQLSikTichNap;