import {useState} from 'react';
import {useQuery} from 'react-query';
import Drawer from '@material-ui/core/Drawer';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Badge from '@material-ui/core/Badge';
import {Wrapper,StyledButton} from './MenuPage.styles';
import Item from '../Item/Item';
import Cart from '../Cart/Cart';

export type CartItemType = {
	_id: number;
	productName: string;
	productDescription:string;
	productImageUrl: string;
	productPrice: number;
	amount: number;
	storeId: string;
  };
  
  const getProducts = async (): Promise<CartItemType[]> =>
	await (await fetch('http://localhost:8080/api/product/all')).json();
  
  const MenuPage = () => {
	const [cartOpen, setCartOpen] = useState(false);
	const [cartItems, setCartItems] = useState([] as CartItemType[]);
	const { data, isLoading, error } = useQuery<CartItemType[]>(
	  'products',
	  getProducts
	);
	
  
	const getTotalItems = (items: CartItemType[]) =>
	  items.reduce((ack: number, item) => ack + item.amount, 0);
  
	const handleAddToCart = (clickedItem: CartItemType) => {
	  setCartItems(prev => {
		const isItemInCart = prev.find(item => item._id === clickedItem._id);
  
		if (isItemInCart) {
		  return prev.map(item =>
			item._id === clickedItem._id
			  ? { ...item, amount: item.amount + 1 }
			  : item
		  );
		}
		return [...prev, { ...clickedItem, amount: 1 }];
	  });
	};

	
  
	const handleRemoveFromCart = (id: number) => {
	  setCartItems(prev =>
		prev.reduce((ack, item) => {
		  if (item._id === id) {
			if (item.amount === 1) return ack;
			return [...ack, { ...item, amount: item.amount - 1 }];
		  } else {
			return [...ack, item];
		  }
		}, [] as CartItemType[])
	  );
	};

  
	if (isLoading) return <LinearProgress />;
	if (error) return <div>Something went wrong ...</div>;
  
	return (
	  <Wrapper>
		<Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
		  <Cart
			cartItems={cartItems}
			addToCart={handleAddToCart}
			removeFromCart={handleRemoveFromCart}
		  />
		
		</Drawer>
		<StyledButton onClick={() => setCartOpen(true)}>
		  <Badge badgeContent={getTotalItems(cartItems)} color='error'>
			<AddShoppingCartIcon />
		  </Badge>
		</StyledButton>
		<Grid container spacing={3}>
		  {data?.map(item => (
			<Grid item key={item._id} xs={12} sm={4}>
			  <Item item={item} handleAddToCart={handleAddToCart} />
			</Grid>
		  ))}
		</Grid>
	  </Wrapper>
	);
  };

export default MenuPage;