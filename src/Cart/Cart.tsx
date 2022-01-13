import CartItem from '../CartItem/CartItem';
import {Wrapper} from './Cart.styles';
import {CartItemType} from '../Pages/MenuPage';
import Button from '@material-ui/core/Button';
import React from 'react';

type Props = {
    cartItems: CartItemType[];
    addToCart: (clickedItem: CartItemType) => void;
    removeFromCart: (id: number) => void;
    
  };

var orderSent:boolean=false;
var flag:boolean=false;
var confirmationText:boolean=false;


async function sendOrder(order: CartItemType[]){
  var orderProducts:string[]=[];
  var storeId:string;
  var tableId:string='61a79d4777fabcc990bbbd62';
  storeId=order[0].storeId;

  order.map(item=>{
    orderProducts.push(item.productName)
  });
  //console.log(orderProducts);
  
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
          orderSent=true;
							
				} else {
					throw Error;
				}
			})
			.catch((err) => {
				console.error(err);

			});
      
     if(orderSent===false){
        return false;
      }
      else{
        return true;
      }
}
 
  const Cart: React.FC<Props> = ({ cartItems, addToCart, removeFromCart }) => {
    
    if(orderSent){
      flag=true;
      }
      if(!orderSent){
       flag=false;
      }

    const [disable,setDisable]=React.useState(flag);

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
          />
        ))}
        <h2>Total: ${calculateTotal(cartItems).toFixed(2)}</h2>
        {cartItems.length===0? <p>Select items from the menu to order</p>:<Button disabled={disable} 
          onClick={async ()=>{
          setDisable(true);
          confirmationText=await sendOrder(cartItems);
            console.log(confirmationText)
          }}>
          Complete Order</Button>}
          {confirmationText===false? null:
            cartItems.length===0? null :<p>Your order has been sent to the kitchen</p>}

      </Wrapper>
    );
  };
  
  export default Cart;
