import { useState } from 'react';
import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import { createOrder } from '../../Services/apiRestaurant';
import Button from '../../UI/Button';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart, getCart, getTotalCartPrice } from '../Cart/cartSlice';
import EmptyCart from '../Cart/EmptyCart';
import store from '../../store';
import { formatCurrency } from '../../Utilities/helpers';
import { fetchAddress } from '../User/userSlice';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const {
    username,
    status: addressStatus,
    position,
    address,
    error: errorAddress,
  } = useSelector((state) => state.user);

  const isLoadingAddress = addressStatus === 'loading';

  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getTotalCartPrice);

  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  const formErrors = useActionData();
  const dispatch = useDispatch();

  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  if (!cart.length) return <EmptyCart />;

  return (
    <div className='px-4 py-6'>
      <h2 className='mb-8 text-xl font-semibold'>
        Ready to order? Let&apos;s go!
      </h2>
      {/* <Form method='POST' action='/order/new'> */}
      {/* For Reference if posting to a specific URL, default is Form posts to closest URL match*/}

      <Form method='POST' action='/order/new'>
        <div className='mb-5 flex flex-col gap-2 sm:flex-row sm:items-center'>
          <label className='sm:basis-40'>First Name</label>
          <input
            className='input grow'
            type='text'
            name='customer'
            defaultValue={username}
            required
          />
        </div>

        <div className='mb-5 flex flex-col gap-2 sm:flex-row sm:items-center'>
          <label className='sm:basis-40'>Phone number</label>
          <div className='grow'>
            <input className='input w-full' type='tel' name='phone' required />
            {formErrors?.phone && (
              <p className='mt-2 rounded-md bg-red-100 p-2 text-center text-xs text-red-700'>
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className='relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center'>
          <label className='sm:basis-40'>Address</label>
          <div className='grow'>
            <input
              className='input w-full'
              type='text'
              name='address'
              disabled={isLoadingAddress}
              defaultValue={address}
              required
            />
            {addressStatus === 'error' && (
              <p className='mt-2 rounded-md bg-red-100 p-2 text-center text-xs text-red-700'>
                {errorAddress}
              </p>
            )}
          </div>
          {!position.latitude && !position.longitude && (
            <span className='absolute right-[3px] top-[35px] z-50 sm:right-[3px] sm:top-[3px] md:right-[5px] md:top-[5px]'>
              <Button
                type='small'
                disabled={isLoadingAddress}
                onClick={(event) => {
                  event.preventDefault();
                  dispatch(fetchAddress());
                }}
              >
                Get Position
              </Button>
            </span>
          )}
        </div>

        <div className='items center mb-12 flex gap-5'>
          <input
            type='checkbox'
            name='priority'
            id='priority'
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
            className='h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2 '
          />
          <label className='font-medium' htmlFor='priority'>
            Add Priority Delivery?
          </label>
        </div>

        <div>
          <input type='hidden' name='cart' value={JSON.stringify(cart)} />
          <input
            type='hidden'
            name='position'
            value={
              position.longitude && position.longitude
                ? `${position.latitude}, ${position.longitude}}`
                : ''
            }
          />
          <Button disabled={isSubmitting || isLoadingAddress} type='primary'>
            {isSubmitting ? 'Placing Order' : 'Order now'}
          </Button>
          {` Total: ${formatCurrency(totalPrice)}`}
        </div>
      </Form>
    </div>
  );
}

const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'true',
  };

  const errors = {};
  if (!isValidPhone(order.phone)) {
    errors.phone = 'Please Provide A Valid Phone Number';
  }
  if (Object.keys(errors).length > 0) return errors;
  //If All form fields are valid. create new order and redirect to order page.
  // console.log(order);
  const newOrder = await createOrder(order);

  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`); //ID Is generated by the API on the backend
};

export { action };

export default CreateOrder;
