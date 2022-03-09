import {useState} from 'react';
import {useQuery} from 'react-query';
import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Badge from '@material-ui/core/Badge';
import {Wrapper,StyledButton} from './MenuPage.styles';
import Item from '../Item/Item';
import Cart from '../Cart/Cart';
import StarRating from '../Components/StarRating';

export type CartItemType = {
	_id: number;
	productName: string;
	productDescription:string;
	productImageUrl: string;
	productPrice: number;
	amount: number;
	storeId: string;
	review:number;
	
  };

export type ReviewType={
	_id:number;
	avgReview:number;
}

const tonyStoreId='61a79c8a77fabcc990bbbd60';
  
const getProducts = async (): Promise<CartItemType[]> =>
	await (await fetch('http://localhost:8080/api/product/'+tonyStoreId)).json();

const getReviews=async():Promise<ReviewType[]>=>
  	await (await fetch('http://localhost:8080/api/review/productsavgreview')).json();

	

  const MenuPage = () => {
	const [cartOpen, setCartOpen] = useState(false);
	const [cartItems, setCartItems] = useState([] as CartItemType[]);
	const {data:data1}=useQuery<CartItemType[]>('products',getProducts);
	const {data:data2}=useQuery<ReviewType[]>('reviews',getReviews);
	
	data2?.map((x)=>{
		x.avgReview=Math.floor(x.avgReview);
	})

	data1?.map((x)=>{
	var temp=0;
		data2?.map((y)=>{
			if(x._id==y._id){
				temp=y.avgReview;
			}
		})
		x.review=temp;
	})
	
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
		  {data1?.map((item) => (
			<Grid item key={item._id} xs={12} sm={4}>
			  <Item item={item} handleAddToCart={handleAddToCart}/>	
			  <StarRating click={false} rv={item.review}></StarRating> 
			</Grid>
		  ))}
		</Grid>
	  </Wrapper>
	);

  };

export default MenuPage;