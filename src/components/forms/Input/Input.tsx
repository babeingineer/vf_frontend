import React, { ChangeEvent, forwardRef } from 'react';
import clsx from 'clsx';

import styles from './Input.module.scss';

export type RoundedType = 'full' | 'small';
export type BorderType = 'solid' | 'none';
export type BorderColorType = 'primary' | 'success';
export type SizeType = 'large' | 'medium';
export type BgColorType = 'primary' | 'secondary';
export type AdornmentType = 'left' | 'right';
export type SelectType = 'text' | 'none';

export interface IAdornment {
  position: AdornmentType;
  content: React.ReactNode | string;
}

export interface IInputProps {
  name?: string;
  type?: string;
  value?: string | number;
  defaultValue?: string;
  updateValue?: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  rounded?: RoundedType;
  border?: BorderType;
  borderColor?: BorderColorType;
  size?: SizeType;
  select?: SelectType;
  bgcolor?: BgColorType;
  adornment?: IAdornment;
  className?: string;
  disabled?: boolean;

  onClick?: () => void;
  onFocus?: () => void;
  onKeyDown?: (e: any) => void;
}

export const Input = forwardRef((props: IInputProps, ref: any) => {
  const {
    name = '',
    type = 'text',
    placeholder = '',
    rounded = 'small',
    border = 'solid',
    borderColor = 'primary',
    size = 'medium',
    bgcolor = 'primary',
    select = 'text',
    className = '',
    adornment = null,
    defaultValue = '',
    updateValue = () => {},
    onClick = () => {},
    onFocus = () => {},
    onKeyDown = () => {},
    ...nativeAttrs
  } = props;
  const classes = clsx(
    styles.root,
    rounded === 'full' ? styles.roundedFull : '',
    border === 'none' ? styles.borderNone : '',
    size === 'large' ? styles.sizeLarge : '',
    select === 'none' ? styles.selectNone : '',
    bgcolor === 'secondary' ? styles.bgColorSecondary : '',
    borderColor === 'success'
      ? styles.borderColorSuccess
      : borderColor === 'primary'
      ? styles.borderColorPrimary
      : '',
    adornment && adornment.position === 'right'
      ? styles.adornmentRight
      : adornment && adornment.position === 'left'
      ? styles.adornmentLeft
      : '',
    className,
  );

  return (
    <div className={classes}>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className={styles.input}
        onChange={updateValue}
        onClick={onClick}
        onFocus={onFocus}
        defaultValue={defaultValue}
        ref={ref}
        onKeyDown={onKeyDown}
        {...nativeAttrs}
      />
      {adornment ? (
        <span
          className={clsx(
            adornment.position === 'left'
              ? styles.leftAdorn
              : styles.rightAdorn,
            typeof adornment.content !== 'string'
              ? styles.circleBar
              : styles.textBar,
          )}
        >
          {adornment.content}
        </span>
      ) : (
        <></>
      )}
    </div>
  );
});
