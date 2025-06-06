"use client";
import { HeaderNav } from "@/components/layout-components/HeaderNav";
import { SideNav } from "@/components/layout-components/SideNav";
import { MEDIA_QUERIES, TEMPLATE } from "@/constants/ThemeConstant";
import { useSelector } from "@/store/hooks";
import utils from "@/utils";
import styled from "@emotion/styled";
import { ConfigProvider, Grid, Layout } from "antd";

import "@/app/assets/css/ant-button.css";
import "@/app/assets/css/global.css";
import "react-toastify/dist/ReactToastify.css";
import "./layout.css";

import Loading from "@/components/shared-components/Loading";
import { UserType } from "@/interface/auth/User";
import { MenuDataType } from "@/interface/menu/menu";
import { authService } from "@/services/auth/auth.service";
import { setUserInfo } from "@/store/auth/AuthSlice";
import { setMenuData } from "@/store/menu/MenuSlice";
import { AppDispatch } from "@/store/store";
import { usePathname } from "next/navigation";
import { Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
//chuyển khu vực của antd về việt nam
import locale from "antd/locale/vi_VN";
import dayjs from "dayjs";
import "dayjs/locale/vi";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/effect-cube";
import "swiper/css/effect-fade";
import "swiper/css/effect-flip";
import "swiper/css/navigation";
import "swiper/css/pagination";

dayjs.locale("vi");

const { useBreakpoint } = Grid;
const { Content } = Layout;

const AppContent = styled("div")`
    padding: ${TEMPLATE.LAYOUT_CONTENT_GUTTER}px;
    margin-top: ${TEMPLATE.HEADER_HEIGHT}px;
    min-height: calc(100vh - ${TEMPLATE.CONTENT_HEIGHT_OFFSET}px);
    position: relative;
    @media ${MEDIA_QUERIES.MOBILE} {
        padding: ${TEMPLATE.LAYOUT_CONTENT_GUTTER_SM}px;
    }
    margin-bottom: 30px;
`;

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const dispatch = useDispatch<AppDispatch>();
    const navCollapsed = useSelector((state) => state.customizer.isCollapse);
    const screens = utils.getBreakPoint(useBreakpoint());
    const isMobile = screens.length === 0 ? false : !screens.includes("lg");
    const userInfo: UserType | null = useSelector((state) => state.auth.User);
    const menuData: MenuDataType[] | null = useSelector(
        (state) => state.menu.menuData,
    );

    const getLayoutGutter = () => {
        if (isMobile) {
            return 0;
        }
        return navCollapsed
            ? TEMPLATE.SIDE_NAV_COLLAPSED_WIDTH
            : TEMPLATE.SIDE_NAV_WIDTH;
    };

    const getLayoutDirectionGutter = () => {
        return { paddingLeft: getLayoutGutter() };
    };

    const handleGetUserInfo = async () => {
        try {
            const response = await authService.getInfo();
            if (response) {
                dispatch(setUserInfo(response));
                dispatch(setMenuData(response));
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (userInfo == null || menuData == null) {
            handleGetUserInfo();
        }
    }, []);
    const pathname = usePathname();
    return (
        <ConfigProvider locale={locale}>
            <Layout>
                <ToastContainer autoClose={3000} pauseOnFocusLoss />
                <HeaderNav />
                <SideNav />
                <Layout style={getLayoutDirectionGutter()}>
                    <AppContent>
                        {/* <PageHeader display={true} title={``} /> */}
                        <Content className="h-100">
                            <Suspense fallback={<Loading content="content" />}>
                                {children}
                            </Suspense>
                        </Content>
                    </AppContent>
                  
                </Layout>
            </Layout>
        </ConfigProvider>
    );
}
