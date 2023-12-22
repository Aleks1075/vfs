import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApolloClient } from '@apollo/client';
import { GET_ALL_SHIRTS } from '../queries/GetAllShirts';
import { Shirts } from '../types';
import '../styles/simpleCards.css';

const SimpleCards = () => {
    const client = useApolloClient();
    const [shirts, setShirts] = useState<Shirts[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        client.query({ query: GET_ALL_SHIRTS })
            .then(result => setShirts(result.data.shirts))
            .catch(error => console.error(error));
    }, [client]);

    const handleAddReview = (shirtId: string) => {
        navigate(`/reviews-form/${shirtId}`);
    };

    const navigateToReviews = (shirtId: string) => {
        navigate(`/reviews/${shirtId}`);
      };

    const ProductCard = ({ product }: { product: Shirts }) => {
        const goToProductDetail = () => {
            navigate(`/product/${product.id}`);
        };

        return (
            <div className="card">
                <img 
                    src={product.image} 
                    alt={product.name} 
                    className="card-image" 
                    onError={(e) => e.currentTarget.src = '../../images/image-coming-soon.png'}
                />
                <div className="card-content">
                    <h3 className="card-title">{product.name}</h3>
                    <p className="card-description">{product.description}</p>
                    <p className="card-price">DKK{product.price.toFixed(2)}</p>
                    <button onClick={goToProductDetail}>See More</button>
                    <button onClick={() => handleAddReview(product.id)}>Add Review</button>
                    <button onClick={() => navigateToReviews(product.id)}>See Reviews</button>
                    {/* <button onClick={() => addToCart(product.id)}>Add to Cart</button> */}
                </div>
            </div>
        );
    };

    return (
        <div className="card-container">
            {shirts.map((product) => (
                <ProductCard product={product} key={product.id} />
            ))}
        </div>
    );
};

export default SimpleCards;