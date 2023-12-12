import { createEffect, createEvent, createStore, sample } from 'effector';
import { getPayments } from '../../api/backend';
import { Category, createPaymentFx } from '../service/service';
import { Service } from '../../pages/services/types';

type S = Service & {
  category: Category;
};

export type Payment = {
  id: string;
  userId: string;
  amount: number;
  service: S;
  dateTime: string;
  walletId: string;
};
export const $paymentList = createStore<Payment[]>([]);

export const getPaymentsFx = createEffect(getPayments);

export const $filteredPayments = createStore<Payment[]>([]);
export const $filter = createStore<string>('all');
export const setFilter = createEvent<string>();

sample({
  clock: setFilter,
  target: $filter,
});

sample({
  clock: setFilter,
  target: $filter,
});

sample({
  clock: createPaymentFx.doneData,
  target: getPaymentsFx,
});

sample({
  clock: getPaymentsFx.doneData,
  target: $paymentList,
});

sample({
  clock: $paymentList.updates,
  target: $filteredPayments,
});

sample({
  clock: [$filter.updates, $paymentList.updates],
  source: {
    f: $filter,
    paymentList: $paymentList,
  },
  fn: ({ f, paymentList }) => {
    return paymentList
      .filter((p) => {
        if (f === 'all') return true;

        return p.service.category.id === f;
      })
      .reverse();
  },
  target: $filteredPayments,
});
