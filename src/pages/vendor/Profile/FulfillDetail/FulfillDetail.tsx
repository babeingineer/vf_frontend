import { useState } from 'react';
import { Outlet, useLocation, useNavigate } from '@tanstack/react-location';
import clsx from 'clsx';

import { Card } from '@/components/common';

import styles from './FulfillDetail.module.scss';

interface INavItem {
  title: string;
  path: string;
}

const navItems: INavItem[] = [
  { title: 'Pickup', path: '/pickup' },
  { title: 'Delivery', path: '/delivery' },
  { title: 'Partnered Pickup Location', path: '/location' },
];

const pathPrefix = '/vendor/profile/fulfillment';

export function FulfillDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.current.pathname;

  return (
    <Card className={styles.root}>
      <ul className={styles.nav}>
        {navItems.map((navItem: INavItem) => (
          <li
            key={navItem.path}
            className={clsx(
              styles.navItem,
              pathname === `${pathPrefix}${navItem.path}` ? styles.active : '',
            )}
            onClick={() => {
              navigate({ to: `${pathPrefix}${navItem.path}` });
            }}
          >
            {navItem.title}
          </li>
        ))}
      </ul>
      <Outlet />
    </Card>
  );
}
