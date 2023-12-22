import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ALL_SHIRTS } from '../queries/GetAllShirts';
import { CREATE_SHIRT } from '../queries/CreateShirt';
import { UPDATE_SHIRT } from '../queries/UpdateShirt';
import { DELETE_SHIRT } from '../queries/DeleteShirt';
import { Shirts } from '../types';
import '../styles/simpleCards.css';
import '../styles/adminShirts.css';

const AdminShirts = () => {
    const [shirts, setShirts] = useState<Shirts[]>([]);
    const [newShirtData, setNewShirtData] = useState({
        id: '',
        name: '',
        description: '',
        country: '',
        year: '',
        price: '',
        size: '',
        image: '',
        ratingAvg: '',
    });

    const { loading, error, data } = useQuery(GET_ALL_SHIRTS);
    const [createShirt] = useMutation(CREATE_SHIRT, {
        refetchQueries: [{ query: GET_ALL_SHIRTS }],
    });
    const [updateShirt] = useMutation(UPDATE_SHIRT, {
        refetchQueries: [{ query: GET_ALL_SHIRTS }],
    });
    const [deleteShirt] = useMutation(DELETE_SHIRT, {
        refetchQueries: [{ query: GET_ALL_SHIRTS }],
    });

    useEffect(() => {
        if (data && data.shirts) {
            setShirts(data.shirts);
        }
    }, [data]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewShirtData({ ...newShirtData, [name]: value });
    };

    const handleAddOrUpdateShirt = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        const shirtInput = {
            id: newShirtData.id,
            name: newShirtData.name,
            description: newShirtData.description,
            country: newShirtData.country,
            year: parseInt(newShirtData.year),
            price: parseFloat(newShirtData.price),
            size: newShirtData.size.split(',').map(size => size.trim()),
            image: newShirtData.image,
            ratingAvg: parseFloat(newShirtData.ratingAvg),
        };
    
        try {
            if (newShirtData.id) {
                await updateShirt({ variables: { input: shirtInput } });
            } else {
                await createShirt({ variables: { input: shirtInput } });
            }
            // Reset the form fields
            setNewShirtData({
                id: '',
                name: '',
                description: '',
                country: '',
                year: '',
                price: '',
                size: '',
                image: '',
                ratingAvg: '',
            });
        } catch (error) {
            console.error('Error processing shirt:', error);
        }
    };    

    const handleUpdateShirt = (shirtId: string) => {
        const shirtToUpdate = shirts.find(shirt => shirt.id === shirtId);
        if (!shirtToUpdate) {
          console.error('Product not found!');
          return;
        }
      
        setNewShirtData({
          ...shirtToUpdate,
          price: shirtToUpdate.price.toString(),
          size: shirtToUpdate.size.join(','),
          ratingAvg: shirtToUpdate.ratingAvg.toString(),
          year: shirtToUpdate.year.toString()
        });
      };

    const handleDeleteShirt = async (shirtId: string) => {
        try {
            await deleteShirt({ variables: { id: shirtId } });
            setShirts(prevShirts => prevShirts.filter(shirt => shirt.id !== shirtId));
        } catch (error) {
            console.error('Error deleting shirt:', error);
        }
    };

    return (
        <div>
            <h1>Admin Shirts Page</h1>
            <form onSubmit={handleAddOrUpdateShirt} className="admin-shirt-form">
            <div className="form-group">
                <input
                    type="text"
                    name="name"
                    placeholder="Shirt Name"
                    value={newShirtData.name}
                    onChange={handleInputChange}
                />
                </div>
                <div className="form-group">
                <textarea
                    name="description"
                    placeholder="Description"
                    value={newShirtData.description}
                    onChange={handleInputChange}
                />
                </div>
                <div className="form-group">
                <input
                    type="text"
                    name="country"
                    placeholder="Country"
                    value={newShirtData.country}
                    onChange={handleInputChange}
                />
                </div>
                <div className="form-group">
                <input
                    type="number"
                    name="year"
                    placeholder="Year"
                    value={newShirtData.year}
                    onChange={handleInputChange}
                />
                </div>
                <div className="form-group">
                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={newShirtData.price}
                    onChange={handleInputChange}
                />
                </div>
                <div className="form-group">
                <input
                    type="text"
                    name="size"
                    placeholder="Sizes (comma-separated)"
                    value={newShirtData.size}
                    onChange={handleInputChange}
                />
                </div>
                <div className="form-group">
                <input
                    type="text"
                    name="image"
                    placeholder="Image URL"
                    value={newShirtData.image}
                    onChange={handleInputChange}
                />
                </div>
                <div className="form-group">
                <input
                    type="number"
                    name="ratingAvg"
                    placeholder="Rating Average"
                    value={newShirtData.ratingAvg}
                    onChange={handleInputChange}
                />
                </div>
                <button type="submit">Submit</button>
            </form>
            <div className="shirts-list">
                {shirts.map((shirt) => (
                    <div key={shirt.id} className="shirt-item">
                        <h3>{shirt.name}</h3>
                        <p>{shirt.description}</p>
                        <p>Country: {shirt.country}</p>
                        <p>Year: {shirt.year}</p>
                        <p>Price: {shirt.price}</p>
                        <p>Sizes: {shirt.size.join(', ')}</p>
                        <p>Rating: {shirt.ratingAvg}</p>
                        <button onClick={() => handleUpdateShirt(shirt.id)}>Edit</button>
                        <button onClick={() => handleDeleteShirt(shirt.id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdminShirts;