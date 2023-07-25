import { formatCurrency } from '../../Utilities/helpers';
import Button from '../../UI/Button';
import DeleteItem from './DeleteItem';
import UpdateItemQuantity from './UpdateItemQuantity';

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice, unitPrice } = item;

  return (
    <li className='py-3 sm:flex sm:items-center sm:justify-between'>
      <p className='mb-1 text-lg sm:mb-0'>
        {quantity}&times; {name}{' '}
        <span className='text-xs font-semibold'>
          ({formatCurrency(unitPrice)}/ea)
        </span>
      </p>
      <div className='flex items-center justify-between sm:gap-6 '>
        <p className='text-sm font-bold'>{formatCurrency(totalPrice)}</p>
        <UpdateItemQuantity pizzaId={pizzaId} />
        <DeleteItem pizzaId={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
