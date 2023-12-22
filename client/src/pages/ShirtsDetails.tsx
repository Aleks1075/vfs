import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useApolloClient } from '@apollo/client';
import { GET_SHIRT_BY_ID } from '../queries/GetShirtById';
import { Shirts } from '../types';

const ShirtsDetails = () => {
    const { id } = useParams<{ id: string }>();
    const client = useApolloClient();
    const [shirt, setShirt] = useState<Shirts | null>(null);

    useEffect(() => {
        client.query({ query: GET_SHIRT_BY_ID, variables: { id } })
            .then(result => setShirt(result.data.shirt))
            .catch(error => console.error(error));
    }, [client, id]);

    if (!shirt) return <div>Loading or shirt not found...</div>;

    return (
        <div>
            <h2>{shirt.name}</h2>
            <p>Description: {shirt.description}</p>
            <p>Price: DKK{shirt.price.toFixed(2)}</p>
            <p>Available Sizes: {shirt.size.join(', ')}</p>
            <p>Country: {shirt.country}</p>
            <p>Year: {shirt.year}</p>
            <img 
                src={shirt.image} 
                alt={shirt.name} 
                onError={(e) => e.currentTarget.src = '../../images/image-coming-soon.png'}
            />
            <p>Rating: {shirt.ratingAvg}</p>
        </div>
    );
};

export default ShirtsDetails;