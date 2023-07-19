import { useLoaderData } from 'react-router-dom';
import { getMenu } from '../../Services/apiRestaurant';

function Menu() {
  const menu = useLoaderData();

  console.log(menu);

  return <h1>Menu</h1>;
}

const loader = async () => {
  const menu = await getMenu();
  return menu;
};

export { loader };
export default Menu;
