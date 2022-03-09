import CartItem from '../CartItem/CartItem';
import {Wrapper} from './Cart.styles';
import {Hidden} from './Cart.styles';
import {CartItemType} from '../Pages/MenuPage';
import Button from '@material-ui/core/Button';
import React from 'react';
import {useNavigate} from 'react-router-dom';
import ReviewPage from '../Pages/ReviewPage';


type Props = {
    cartItems: CartItemType[];
    addToCart: (clickedItem: CartItemType) => void;
    removeFromCart: (id: number) => void;
    
  };

var orderProducts:string[]=[];


async function sendOrder(order: CartItemType[]){


  var storeId:string;
  var tableId:string='61a79d4777fabcc990bbbd62';
  storeId=order[0].storeId;

  order.map(item=>{
    orderProducts.push(item.productName)
  });
  
  
   await fetch("http://localhost:8080/api/order", {
			
			method: "POST",
			body:JSON.stringify({orderProducts:orderProducts,storeId:storeId,tableId:tableId}),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => {
				if (res.status === 200) {
						console.log("Success");	
				} else {
					throw Error;
				}
			})
			.catch((err) => {
				console.error(err);

			});
      
    
}

  const Cart: React.FC<Props> = ({ cartItems, addToCart, removeFromCart }) => {
    
    const navigate=useNavigate();
    const calculateTotal = (items: CartItemType[]) =>
      items.reduce((ack: number, item) => ack + item.amount * item.productPrice, 0);
  
    return (
      
      <Wrapper>
     
        <h2>Your Order</h2>
        {cartItems.length === 0 ? <p>No items in your order...</p> : null}
        {cartItems.map(item => (
          <CartItem
            key={item._id}
            item={item}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            show={true}
          />
        ))}
        <h2>Total: ${calculateTotal(cartItems).toFixed(2)}</h2>
        {cartItems.length===0? <p>Select items from the menu to order</p>:<Button
        
          onClick={async ()=>{
          
          await sendOrder(cartItems);
          navigate('/reviews');
          }}>
          Complete Order</Button>}
      <Hidden>
    <ReviewPage order={cartItems} addToCart={addToCart} removeFromCart={removeFromCart} orderId={""}></ReviewPage>   
    </Hidden>
      </Wrapper>
    );
  };
  
  export default Cart;
