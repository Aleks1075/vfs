import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { GET_REVIEWS_BY_SHIRTS } from '../queries/GetReviewsByShirts';
import '../styles/reviews.css';

const Reviews = () => {
  const { id } = useParams<{ id: string }>();
  const { loading, error, data } = useQuery(GET_REVIEWS_BY_SHIRTS, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading reviews: {error.message}</p>;

  return (
    <div className="reviews-container">
      <h1>Reviews</h1>
      {data.reviewsByShirts.map((review: any) => (
        <div key={review.id} className="review">
          <h3>{review.title}</h3>
          <p>{review.text}</p>
          <p>Rating: {review.rating}</p>
          <p>By: {review.user.username}</p>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
