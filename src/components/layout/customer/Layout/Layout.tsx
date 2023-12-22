import clsx from 'clsx';
import { useState, useEffect } from 'react';
import { Outlet, useLocation } from '@tanstack/react-location';

import { Topbar, Header, Navbar, Footer } from '@/components/layout/customer';

import { useWindowWidth } from '@/utils';

export function Layout() {
  const location = useLocation();
  const pathname = location.current.pathname;

  const [isScreen, setIsScreen] = useState(false);
  const [_, breakpoint] = useWindowWidth();

  const screenBlackLists = ['/login/customer', '/login/vendor'];
  const smallBPLists = ['none', 'xs'];

  return (
    <div
      className={
        isScreen || screenBlackLists.includes(pathname) ? 'h-screen' : ''
      }
    >
      <div
        className={clsx(
          'h-full',
          smallBPLists.includes(breakpoint as string) ? 'pt-[120px]' : 'pt-40',
        )}
      >
        <div
          className={clsx(
            'fixed top-0 z-50 w-full',
            isScreen ? 'flex h-full flex-col' : '',
          )}
        >
          <Topbar />
          <Header switchToScreen={setIsScreen} />
          <Navbar />
        </div>
        <Outlet />
        <Footer />
      </div>
    </div>
  );
}
