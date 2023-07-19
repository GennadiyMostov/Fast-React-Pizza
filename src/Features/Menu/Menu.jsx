import { useLoaderData } from 'react-router-dom';
import { getMenu } from '../../Services/apiRestaurant';
import MenuItem from './MenuItem';

function Menu() {
  const menu = useLoaderData();

  console.log(menu);

  return (
    <ul>
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}

const loader = async () => {
  const menu = await getMenu();
  return menu;
};

export { loader };
export default Menu;
