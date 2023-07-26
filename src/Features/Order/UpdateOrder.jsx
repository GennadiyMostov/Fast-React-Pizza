import { updateOrder } from '../../Services/apiRestaurant';
import Button from '../../UI/Button';
import { useFetcher } from 'react-router-dom';

const UpdateOrder = () => {
  const fetcher = useFetcher();

  return (
    <fetcher.Form className='text-right' method='PATCH'>
      <Button type='primary'>Add Priorty Delivery!</Button>
    </fetcher.Form>
  );
};

export default UpdateOrder;

const action = async ({ req, params }) => {
  const data = { priority: true };
  await updateOrder(params.orderID, data);
  return null;
};

export { action };
