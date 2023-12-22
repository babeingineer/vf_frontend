import React, { useMemo, useState } from 'react';
import { useLocation, Link, useNavigate } from '@tanstack/react-location';
import clsx from 'clsx';

import { Logo } from '@/components/layout/other';

import { customerRoutes, routes } from '@/routes';

import styles from './Sidebar.module.scss';

export interface IRouteItem {
  title: string;
  path: string;
  leaf?: boolean;
  hide?: boolean;
  children?: IRouteItem[];
}

export function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.current.pathname;
  const prefixPath = useMemo(() => {
    const index = pathname.slice(1).indexOf('/');
    if (index === -1) return pathname;
    return pathname.slice(0, index + 1);
  }, [pathname]);
  const roleRoutes = useMemo(() => {
    return (
      routes.find((route: any) => route.path === prefixPath)?.children ||
      customerRoutes
    );
  }, [prefixPath]);

  const [active, setActive] = useState('');

  const showSubNavs = (parentItem: IRouteItem) => {
    setActive(parentItem.path === active ? '' : parentItem.path);
    if (!parentItem.children || parentItem.leaf) {
      navigate({ to: `${prefixPath}${parentItem.path}` });
    }
  };

  const renderChildRoute = (children: IRouteItem[], currentPath: string) => {
    return children.map((route: IRouteItem, index: number) =>
      route.children && !route.leaf ? (
        <div key={`${currentPath}/${route.path}`}>
          <p className={styles.subParentItem}>{route.title}</p>
          <div className={styles.childPanel}>
            {renderChildRoute(route.children, `${currentPath}${route.path}`)}
          </div>
        </div>
      ) : !route.hide ? (
        <p
          onClick={() => navigate({ to: `${currentPath}${route.path}` })}
          className={
            pathname.startsWith(`${currentPath}${route.path}`)
              ? clsx(styles.leafItem, styles.activeLeafItem)
              : styles.leafItem
          }
        >
          {route.title}
        </p>
      ) : (
        <></>
      ),
    );
  };

  return (
    <div className={styles.root}>
      <Logo size="small" />
      <div className={styles.brand}>
        <Logo size="medium" />
        <p>Sackett River Company</p>
      </div>
      <div className={styles.navbar}>
        {roleRoutes.map((route: any, index: number) => (
          <div key={`${route.path}-${index}`} className={styles.navItem}>
            <div
              className={
                pathname.startsWith(`${prefixPath}${route.path}`)
                  ? clsx(styles.parentItem, styles.activeParentItem)
                  : styles.parentItem
              }
              onClick={() => showSubNavs(route)}
            >
              {route.icon && <>{route.icon}</>}
              <p>{route.title}</p>
            </div>
            {active === route.path && route.children && !route.leaf && (
              <div className={styles.childPanel}>
                {renderChildRoute(route.children, `${prefixPath}${route.path}`)}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
