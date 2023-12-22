import React, { ChangeEvent, useState } from 'react';

import { Card, TableBody } from '@/components/common';
import { Input, Select, RadioGroup, Radio } from '@/components/forms';
import { MagnifierIcon } from '@/components/icons';

import { IRange, ITableColumn } from '@/interfaces';

import { formatDate } from '@/utils';

import ProductSvg from '/assets/admin/backs/Product.svg';
import styles from './CouponEdit.module.scss';
import { useMatch } from '@tanstack/react-location';

export type CouponType = 'Free Shipping' | 'Percent' | 'Tiered';
export type UsageType = 'Use Code' | 'Amount Spent';
export type WIFType =
  | 'Global Coupon'
  | 'Product Specific'
  | 'Customer Specific';

export interface ICouponEdit {
  type: CouponType;
  date: IRange;
  usageType: UsageType;
  amount: string | number;
  wifType: WIFType;
  data: any[];
  discount?: number;
  maximum?: number;
  minimum?: number;
}

const couponTypes: string[] = ['Free Shipping', 'Percent', 'Tiered'];

const customerColumns: ITableColumn[] = [
  {
    title: 'Select',
    name: 'select',
    width: 100,
    cell: (row: any) => <Radio value={row.id} />,
  },
  {
    title: 'Customer Name',
    name: 'name',
    width: 200,
  },
  {
    title: 'Email',
    name: 'email',
    width: 250,
  },
];

const productColumns: ITableColumn[] = [
  {
    title: 'Select',
    name: 'select',
    width: 100,
    cell: (row: any) => (
      <Radio label={<img src={ProductSvg} />} value={row.id} />
    ),
  },
  {
    title: 'Product Name',
    name: 'name',
    width: 200,
  },
  {
    title: 'Original Price',
    name: 'oprice',
    width: 150,
    cell: (row: any) => <span>${row.oprice}</span>,
  },
  {
    title: 'Discount',
    name: 'discount',
    width: 100,
    cell: (row: any) => <span>{row.discount ? `$${row.discount}%` : ''}</span>,
  },
  {
    title: 'Discounted Price',
    name: 'dprice',
    width: 200,
    cell: (row: any) => <span>${row.dprice}</span>,
  },
];

const initialCustomers: any[] = [
  {
    id: 1,
    name: 'Jenny Boom',
    email: 'brandon@gmail.com',
  },
  {
    id: 2,
    name: 'Will Smith',
    email: 'brandon@gmail.com',
  },
  {
    id: 3,
    name: 'William Defo',
    email: 'brandon@gmail.com',
  },
];

const initialProducts: any[] = [
  {
    id: 1,
    name: 'Black Polish Radish',
    oprice: 10,
    discount: 10,
    dprice: 9,
  },
  {
    id: 2,
    name: 'Black Polish Radish',
    oprice: 10,
    discount: 10,
    dprice: 9,
  },
  {
    id: 3,
    name: 'Black Polish Radish',
    oprice: 10,
    discount: 10,
    dprice: 9,
  },
];

const initialCoupon: ICouponEdit = {
  type: 'Free Shipping',
  date: {
    from: new Date(),
    to: new Date(),
  },
  usageType: 'Use Code',
  amount: '',
  wifType: 'Product Specific',
  data: initialProducts,
};

export function CouponEdit() {
  const {
    params: { id: couponId },
  } = useMatch();
  const [coupon, setCoupon] = useState<ICouponEdit>(initialCoupon);

  const updateStrForm = (field: string) => (value: string) => {
    if (field === 'wifType') {
      if (value === 'Product Specific') {
        setCoupon({
          ...coupon,
          data: initialProducts,
          [field]: value,
        });
      } else if (value === 'Customer Specific') {
        setCoupon({
          ...coupon,
          data: initialCustomers,
          [field]: value,
        });
      }
    }
    setCoupon(coupon => ({
      ...coupon,
      [field]: value,
    }));
  };

  const updateInputForm =
    (which: string) => (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (['discount', 'minimum', 'maximum'].includes(which)) {
        const num = Number(value.slice('% '.length));
        if (!value.startsWith('% ')) return;
        if (num.toString() !== value.slice('% '.length) || num > 100) return;
        setCoupon({
          ...coupon,
          [which]: Number(value.slice('% '.length)),
        });
      } else if (which === 'from' || which === 'to') {
        setCoupon({
          ...coupon,
          date: { ...coupon.date, [which]: new Date(value) },
        });
      } else {
        setCoupon({
          ...coupon,
          [which]: value,
        });
      }
    };

  return (
    <Card title="Coupon Center" className={styles.root}>
      <div className={styles.container}>
        <div className={styles.form}>
          <div className={styles.control}>
            <p>Coupon Type</p>
            <Select
              placeholder="Content Type"
              options={couponTypes}
              value={coupon.type}
              updateValue={updateStrForm('type')}
              className={styles.typeSelector}
            />
          </div>
          {coupon.type === 'Percent' && (
            <div className={styles.control}>
              <p>Code</p>
              <Input
                placeholder="Code"
                value={coupon.amount.toString()}
                updateValue={updateInputForm('amount')}
                className={styles.amountInput}
              />
            </div>
          )}
          <div className={styles.horizon}>
            <div className={styles.control}>
              <p>Start Date</p>
              <Input
                type="date"
                value={formatDate(coupon.date.from)}
                updateValue={updateInputForm('from')}
              />
            </div>
            <div className={styles.control}>
              <p>End Date</p>
              <Input
                type="date"
                value={formatDate(coupon.date.to)}
                updateValue={updateInputForm('to')}
              />
            </div>
          </div>
          {coupon.type === 'Free Shipping' && (
            <>
              <div className={styles.control}>
                <p>Coupon Use</p>
                <RadioGroup
                  value={coupon.usageType}
                  updateValue={updateStrForm('usageType')}
                >
                  <Radio label="Use Code" value="Use Code" />
                  <Radio label="Amount Spent" value="Amount Spent" />
                </RadioGroup>
              </div>
              <div className={styles.control}>
                <p>
                  {coupon.usageType === 'Use Code'
                    ? 'Code'
                    : 'Amount needed to spend'}
                </p>
                <Input
                  placeholder={coupon.usageType === 'Use Code' ? 'Code' : '$'}
                  value={coupon.amount.toString()}
                  updateValue={updateInputForm('amount')}
                  className={styles.amountInput}
                />
              </div>
            </>
          )}
          {coupon.type === 'Percent' ||
            (coupon.type === 'Tiered' && (
              <div className={styles.tiered}>
                <div className={styles.horizon}>
                  <div className={styles.control}>
                    <p>Discount</p>
                    <Input
                      placeholder="% Discount"
                      value={coupon.discount ? `% ${coupon.discount}` : '% '}
                      updateValue={updateInputForm('discount')}
                      className={styles.amountInput}
                    />
                  </div>
                  {coupon.type === 'Tiered' && (
                    <>
                      <div className={styles.control}>
                        <p>Minimum Spend</p>
                        <Input
                          placeholder="Minimum Spend"
                          value={coupon.minimum ? `% ${coupon.minimum}` : '% '}
                          updateValue={updateInputForm('minimum')}
                          className={styles.amountInput}
                        />
                      </div>
                      <div className={styles.control}>
                        <p>Maximum Spend</p>
                        <Input
                          placeholder="Minimum Spend"
                          value={coupon.maximum ? `% ${coupon.maximum}` : '% '}
                          updateValue={updateInputForm('maximum')}
                          className={styles.amountInput}
                        />
                      </div>
                    </>
                  )}
                </div>
                <div className={styles.tieredButton}>
                  <button>Add +</button>
                </div>
              </div>
            ))}
          <div className={styles.control}>
            <p>Who's it for?</p>
            <RadioGroup
              value={coupon.wifType}
              updateValue={updateStrForm('wifType')}
            >
              <Radio label="Global Coupon" value="Global Coupon" />
              <Radio label="Product Specific" value="Product Specific" />
              <Radio label="Customer Specific" value="Customer Specific" />
            </RadioGroup>
          </div>
          <div className={styles.control}>
            <p>
              {coupon.wifType === 'Customer Specific'
                ? 'Customers'
                : 'Products'}
            </p>
            <div className={styles.dataTable}>
              <Input
                placeholder="Search for a customer"
                size="large"
                adornment={{
                  position: 'right',
                  content: <MagnifierIcon />,
                }}
                rounded="full"
                className={styles.searchInput}
              />
              <RadioGroup value="">
                <TableBody
                  columns={
                    coupon.wifType === 'Customer Specific'
                      ? customerColumns
                      : productColumns
                  }
                  rows={coupon.data}
                />
              </RadioGroup>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.buttonBar}>
        <button className={styles.cancelButton}>Cancel</button>
        <button className={styles.addButton}>Add</button>
      </div>
    </Card>
  );
}
