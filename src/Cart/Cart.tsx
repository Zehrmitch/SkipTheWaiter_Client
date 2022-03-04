import CartItem from '../CartItem/CartItem';
import {Wrapper} from './Cart.styles';
import {CartItemType} from '../Pages/MenuPage';
import Button from '@material-ui/core/Button';
import React from 'react';
import { loadStripe } from '@stripe/stripe-js';

var stripe : any = null;

(async function() {
  stripe = await loadStripe('pk_test_51HUmg1ABLPX73TqOgs3vYP0Q5cpY9NWY789qfksUzq1qE6cIjAgdCZgCbfcsrvVbE3VSTdTLGdWfLtpolPhHh1gf00XypK7Dhj');
  // → 🎉
}());

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

async function payForOrder(order: CartItemType[]){
  var orderProducts:any=[];
  var storeId:string;
  var tableId:string='61a79d4777fabcc990bbbd62';
  storeId=order[0].storeId;
  console.log(order)

  order.map(item => {
    orderProducts.push({
      productName: item.productName,
      productPrice: item.productPrice,
      productImageUrl: item.productImageUrl,
      productDescription: item.productDescription,
      productAmount: item.amount
    })
  });
  const res = await fetch("http://localhost:8080/api/payment/create-checkout-session", {
			method: "POST",
      mode: 'cors',
			body:JSON.stringify({orderProducts:orderProducts,storeId:storeId,tableId:tableId}),
			headers: {
				"Content-Type": "application/json",
			},
	})
  const body = await res.json()
  window.location.href = body.url
  return true
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
        {cartItems.length===0
          ? <p>Select items from the menu to order</p>
          :<Button disabled={disable} 
            onClick={async ()=>{
              setDisable(true);
              confirmationText=await sendOrder(cartItems);
              console.log(confirmationText)
            }}>
            Complete Order
          </Button>
        }
        {cartItems.length===0
          ? <p></p>
          :<Button disabled={disable} 
              onClick={async ()=>{
                setDisable(true);
                confirmationText=await payForOrder(cartItems);
                console.log(confirmationText)
              }}>
              Pay For Order
           </Button>
        }
          {confirmationText===false? null:
            cartItems.length===0? null :<p>Your order has been sent to the kitchen</p>}
      </Wrapper>
    );
  };
  
  export default Cart;
