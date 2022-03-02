import CartItem from '../CartItem/CartItem';
import {CartItemType} from './MenuPage';
import Button from '@material-ui/core/Button';
import React from 'react';
import Cart from '../Cart/Cart';
import Item from '../Item/Item';
type Props={
  order: CartItemType[];
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
  
}

var totalOrder: CartItemType[];


function setOrder(orderItems:CartItemType[]){
  totalOrder=orderItems;
}

const ReviewPage: React.FC<Props> = ({order,addToCart,removeFromCart}) => {
      return(<>
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
        
      </>)
  
  
  }

export default ReviewPage;