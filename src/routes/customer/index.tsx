import { Outlet } from '@tanstack/react-location';

import { Login, Signup as CustomerSignup } from '@/pages/customer';
import {
  Dashboard,
  Market,
  VendorSales,
  ProductDetails,
  Checkout,
  About,
  VendorSignup,
} from '@/pages/customer';
import {
  Home as CommunityHome,
  CommunityLayout,
  CommunityAbout,
  CommunityVendors,
} from '@/pages/customer/VendorCommunities';

export const customerRoutes = [
  {
    // index: true,
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/sign-up/customer',
    element: <CustomerSignup />,
  },
  {
    path: '/sign-up/vendor',
    element: <VendorSignup />,
  },
  {
    path: '/sell',
    element: <VendorSales />,
  },
  {
    path: '/market',
    element: <Market />,
  },
  {
    element: <Outlet />,
    path: '/communities',
    children: [
      {
        path: '/',
        element: <CommunityHome />,
      },
      {
        path: '/:id',
        element: <CommunityLayout />,
        children: [
          {
            path: '/vendors',
            element: <CommunityVendors />,
          },
          {
            path: '/about',
            element: <CommunityAbout />,
          },
        ],
      },
      {},
    ],
  },
  {
    path: '/productdetails/:id',
    element: <ProductDetails />,
  },
  {
    path: '/checkout',
    element: <Checkout />,
  },
  {
    path: '/about',
    element: <About />,
  },
];
