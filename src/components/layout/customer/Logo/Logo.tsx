import clsx from 'clsx';

import LogoPink from '/assets/common/icons/LogoPink.svg';

export interface ILogoProps {
  className?: string;
}

export function Logo({ className = '' }: ILogoProps) {
  return (
    <div
      className={clsx(
        'flex items-center gap-x-1 space-x-1 py-2.5 text-xl font-semibold',
        className,
      )}
    >
      <img src={LogoPink} />
      <span>Village Finds</span>
    </div>
  );
}
