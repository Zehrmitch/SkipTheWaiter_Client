import CartItem from '../CartItem/CartItem';
import {CartItemType} from './MenuPage';
import Button from '@material-ui/core/Button';
import React from 'react';
import Cart from '../Cart/Cart';
import Item from '../Item/Item';
import {useNavigate} from 'react-router-dom';
import StarRating from '../Components/StarRating';

type Props={
  order: CartItemType[];
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
  orderId:string;
  
}

var totalOrder: CartItemType[];


function setOrder(orderItems:CartItemType[]){
  totalOrder=orderItems;
}



const ReviewPage: React.FC<Props> = ({order,addToCart,removeFromCart,orderId}) => {
      
      const navigate=useNavigate();
      return(<>
      <h1>Please Leave us a Review on Your Order:</h1>
     
     {order==undefined?null:setOrder(order)}
     {totalOrder.map(item => (
          <CartItem
            key={item._id}
            item={item}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            show={false}
          />
        ))}
      <Button onClick={()=>{navigate('/menu')}}>Done</Button>
      </>)
  
  
  }

export default ReviewPage;