import HomePage from "../pages/HomePage/HomePage";
import ProductsPage from "../pages/ProductsPages/ProductsPage";
import OrderPage from "../pages/OrderPage/OderPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import TypeProductPage from "../pages/TypeProductPage/TypeProductPage";
import SignInPage from "../pages/SignInPage/SignInPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import DetailProductPage from "../pages/DetailProductPage/DetailProductPage";
import AdminPage from "../pages/AdminPage/AdminPage";
import SellerPage from "../pages/SellerPage/SellerPage";
import GetOrderOfUserPage from "../pages/GetOrderOfUserPage/GetOrderOfUserPage";


// Định tuyến 
export const routes= [
    {
        path: '/',
        page: HomePage,
        isShowHeader: true,
    },
    {
        path: '/sign-in',
        page: SignInPage,
        isShowHeader: false,
    },
    {
        path: '/sign-up',
        page: SignUpPage,
        isShowHeader: false,
    },
    {
        path: '/detail-product/:id',
        page: DetailProductPage,
        isShowHeader: true,
    },
    {
        path: '/product/:type',
        page: ProductsPage,
        isShowHeader: true,
    },
    {
        path: '/order',
        page: OrderPage,
        isShowHeader: true,
    },
    {
        path: '/get-ordered',
        page: GetOrderOfUserPage,
        isShowHeader: true,
    },
    {
        path: '/products/:type',
        page: TypeProductPage,
        isShowHeader: true,
    },
    {
        path: '/system/admin',
        page: AdminPage,
        isShowHeader: false,
        isPrivated: true
    },
    {
        path: '/system/seller',
        page: SellerPage,
        isShowHeader: false,
        isPrivated: true
    },
    {
        path: '*',
        page: NotFoundPage,
    }
]