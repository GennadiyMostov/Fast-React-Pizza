// Test ID: IIDSAT

import { useFetcher, useLoaderData } from 'react-router-dom';
import { getOrder } from '../../Services/apiRestaurant';
import OrderItem from './OrderItem';

import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from '../../Utilities/helpers';
import { useEffect } from 'react';

function Order() {
  const order = useLoaderData();

  const fetcher = useFetcher();

  useEffect(() => {
    if (!fetcher.data && fetcher.state === 'idle') fetcher.load('/menu');
  }, [fetcher]);

  console.log(fetcher.data);

  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;

  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className='space-y-8 px-4 py-6'>
      <div className='flex flex-col flex-wrap items-center justify-between gap-4 sm:flex-row'>
        <h2 className='text-xl font-semibold'>Order #: {id}</h2>

        <div className='space-x-2'>
          {priority && (
            <span className='rounded-full bg-red-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-red-50'>
              Priority
            </span>
          )}
          <span className='rounded-full bg-green-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-green-50'>
            {status} order
          </span>
        </div>
      </div>

      <div className='flex flex-wrap items-center justify-between gap-2 rounded-xl bg-stone-200 px-6 py-5'>
        <p className='font-medium'>
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : 'Order should have arrived'}
        </p>
        <p className='text-xs text-stone-500'>
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      <ul className='dive-stone-200 divide-y border-b border-t'>
        {cart.map((item) => (
          <OrderItem
            item={item}
            key={item.pizzaId}
            isLoadingIngredients={fetcher.state === 'loading'}
            ingredients={
              fetcher.data?.find((element) => {
                return element.id === item.pizzaId;
              })?.ingredients ?? []
            }
          />
        ))}
      </ul>

      <div className='space-y-2 rounded-xl bg-stone-200 px-6 py-5'>
        <p className='text-sm font-medium text-stone-600'>
          Order Cost: {formatCurrency(orderPrice)}
        </p>
        {priority && (
          <p className='text-sm font-medium text-stone-600'>
            Priority Delivery: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className='font-bold'>
          Due On Delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
    </div>
  );
}

const loader = async ({ params }) => {
  const order = await getOrder(params.orderID);
  return order;
};

export { loader };

export default Order;
