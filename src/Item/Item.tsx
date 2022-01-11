import Button from '@material-ui/core/Button';
import {CartItemType} from '../Pages/MenuPage';
import {Wrapper} from './Item.styles';

type Props = {
    item: CartItemType;
    handleAddToCart: (clickedItem: CartItemType) => void;
  };
  
  const Item: React.FC<Props> = ({ item, handleAddToCart }) => (
    <Wrapper>
      <img src={item.productImageUrl} alt={item.productName} />
      <div>
        <h3>{item.productName}</h3>
        <p>{item.productDescription}</p>
        <h3>${item.productPrice}</h3>
      </div>
      <Button onClick={() => handleAddToCart(item)}>Add to Order</Button>
    </Wrapper>
  );
  
  export default Item;