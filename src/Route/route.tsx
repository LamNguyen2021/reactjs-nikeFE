import { PATH_NAME } from '../Config';
import MainLayout from '../Layout/MainLayout';
import { Page } from '../Model/IPage';
import AdminPage from '../Pages/Admin/AdminPage';
import CartPage from '../Pages/Cart/CartPage';
import DetailPage from '../Pages/Detail/DetailPage';
import UserOrderPage from '../Pages/User/UserOrderPage';
import UserProfilePage from '../Pages/User/UserProfilePage';

export const routesHome: Page[] = [
  { path: PATH_NAME.ROOT, exact: true, component: MainLayout },
  { path: PATH_NAME.USER_PROFILE, exact: false, component: UserProfilePage },
  { path: PATH_NAME.USER_ORDER, exact: false, component: UserOrderPage },
  { path: PATH_NAME.CART, exact: false, component: CartPage },
  { path: PATH_NAME.PRODUCT_DETAIL, exact: false, component: DetailPage },
];

export const routesAdmin: Page[] = [
  { path: PATH_NAME.ADMIN, exact: true, component: AdminPage },
];
