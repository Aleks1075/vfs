import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../queries/CreateReview';
import { GET_ALL_SHIRTS } from '../queries/GetAllShirts';
import { useParams, useNavigate } from 'react-router-dom';

const ReviewForm = () => {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [rating, setRating] = useState(5);
    const { shirtId } = useParams();
    const [createReview] = useMutation(CREATE_REVIEW, {
      refetchQueries: [{ query: GET_ALL_SHIRTS }]
  });
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const userId = localStorage.getItem('userId');
            if (!userId) throw new Error("User not logged in");

            await createReview({
                variables: {
                    reviewInput: {
                        title,
                        text,
                        rating,
                        userId,
                        shirtsId: shirtId,
                    },
                },
            });
            navigate(`/shirts`);
        } catch (error) {
            console.error('Error creating review:', error);
        }
    };

    return (
        <div>
            <h1>Create Review</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Review Title"
                    required
                />
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Review Text"
                />
                <input
                    type="number"
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    min="1"
                    max="5"
                    required
                />
                <button type="submit">Submit Review</button>
            </form>
        </div>
    );
};

export default ReviewForm;