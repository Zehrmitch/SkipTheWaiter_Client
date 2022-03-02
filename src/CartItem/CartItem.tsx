import Button from '@material-ui/core/Button';
import {CartItemType} from '../Pages/MenuPage';
import {Wrapper} from './CartItem.styles';

type Props = {
    item: CartItemType;
    addToCart: (clickedItem: CartItemType) => void;
    removeFromCart: (id: number) => void;
    show: boolean;
  
  };

  const CartItem: React.FC<Props> = ({ item, addToCart, removeFromCart,show}) => (
    <Wrapper>
      <div>
        <h3>{item.productName}</h3>
        {show==true?
        <div className='information'>
          <p>Price: ${item.productPrice}</p>
          <p>Total: ${(item.amount * item.productPrice).toFixed(2)}</p>
        </div> :null}
        {show==true?
        <div className='buttons'>
          <Button
            size='small'
            disableElevation
            variant='contained'
            onClick={()=>removeFromCart(item._id)}
          >
            -
          </Button>
          <p>{item.amount}</p>
          <Button
            size='small'
            disableElevation
            variant='contained'
            onClick={() => addToCart(item)}
                        
          >
            +
          </Button>
        </div> :null}
      
      </div> 
        
      <img src={item.productImageUrl} alt={item.productName} />
    </Wrapper>
  );
  
  export default CartItem;
 
  