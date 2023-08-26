import HomePage from "../pages/HomePage/HomePage";
import ProductsPage from "../pages/ProductsPages/ProductsPage";
import OrderPage from "../pages/OrderPage/OderPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import TypeProductPage from "../pages/TypeProductPage/TypeProductPage";
import SignInPage from "../pages/SignInPage/SignInPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import DetailProductPage from "../pages/DetailProductPage/DetailProductPage";
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
        path: '/detail-product',
        page: DetailProductPage,
        isShowHeader: true,
    },
    {
        path: '/products',
        page: ProductsPage,
        isShowHeader: true,
    },
    {
        path: '/order',
        page: OrderPage,
        isShowHeader: true,
    },
    {
        path: '/type',
        page: TypeProductPage,
        isShowHeader: true,
    },
    {
        path: '*',
        page: NotFoundPage,
    }
]