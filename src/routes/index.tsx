import { CustomerLayout, OtherLayout } from '@/components/layout';

import { superAdminRoutes } from '@/routes/super-admin';
import { customerRoutes } from '@/routes/customer';
import { vendorRoutes } from '@/routes/vendor';

export const routes = [
  {
    path: '/admin',
    element: <OtherLayout />,
    children: superAdminRoutes,
  },
  {
    path: '/vendor',
    element: <OtherLayout />,
    children: vendorRoutes,
  },
  {
    path: '/',
    element: <CustomerLayout />,
    children: customerRoutes,
  },
];

export { superAdminRoutes, customerRoutes, vendorRoutes };
