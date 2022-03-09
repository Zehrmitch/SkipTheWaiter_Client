import React, {useState} from 'react';
import './StarRating.css';
import {FaStar} from 'react-icons/fa';
import CartItem from '../CartItem/CartItem';
import ReviewPage from '../Pages/ReviewPage';


async function submitRating(rate,product){
    await fetch("http://localhost:8080/api/review", {
			
        method: "POST",
        body:JSON.stringify({reviewDescription:"",reviewStars:rate,productId:product}),
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


var enableClick=false;

const StarRating=(props)=>{
    var flag=false;
    var product=props.productId;
    var rate=props.rv;
    enableClick=props.click;
    const [rating,setRating]=useState(null);
    const [hover,setHover]=useState(null);

    return(<>
        

        <div className="format">
            {[...Array(5)].map((star,i)=>{
                const ratingValue=i+1;
                return (
                <td>
                <label>
                {enableClick==true?
                <input 
                disabled={flag}
                type="radio" 
                name="rating" 
                value={ratingValue}
                
            
                onClick={async()=>{
                    <ReviewPage orderId={product}></ReviewPage>
                    setRating(ratingValue);
                    await submitRating(ratingValue,product);
                    flag=true;
                
                }}
                
           
                />:null}
           
                {enableClick==true?
                <FaStar 
                className="star"
                color={ratingValue<=(hover||rating)?"#ffc107":"#e4e5e9"} 
                size={20}
                onMouseEnter={()=>setHover(ratingValue)}
                onMouseLeave={()=>setHover(null)}
                />:
                <FaStar 
                className="star"
                color={ratingValue<=(rate||rating)?"#ffc107":"#e4e5e9"} 
                size={20}
                
                />
                
                
                }
                </label>
                </td>)
            })}
        </div>




        
        
        </>
    )
}


export default StarRating;