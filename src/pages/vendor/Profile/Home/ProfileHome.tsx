import { Business, Security, SocialMedia, Store } from '@/components/vendor';

import { useProHomeStore } from '@/stores/vendor/profile/homeStore';

import styles from './ProfileHome.module.scss';
import { ShopOpen } from '@/components/vendor/Profile/Home/ShopOpen/ShopOpen';

export function ProfileHome() {
  const { business, socialUrls, isOpen, setOpen } = useProHomeStore();

  return (
    <div className={styles.root}>
      <Business data={business} />
      <Security />
      <SocialMedia data={socialUrls} />
      <Store />
      <ShopOpen isOpen={isOpen} setOpen={setOpen} />
    </div>
  );
}
