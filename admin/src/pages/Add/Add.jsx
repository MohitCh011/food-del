import React, { useState } from 'react';
import './Add.css';
import { assets, url } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const Add = () => {
    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Salad"
    });

    // Function to upload the image to Cloudinary
    const uploadImageToCloudinary = async (file) => {
        const formData = new FormData();
        formData.append("file", file); // Attach file
        formData.append("upload_preset", "unsigned_preset"); // Cloudinary upload preset

        try {
            const response = await axios.post(
                "https://api.cloudinary.com/v1_1/dxkbfeh6q/image/upload",
                formData
            );

            if (response.data.secure_url) {
                return {
                    imageUrl: response.data.secure_url,
                    imagePublicId: response.data.public_id
                };
            }
        } catch (error) {
            console.error("Error uploading image to Cloudinary", error);
            toast.error("Error uploading image");
            throw error;
        }
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        if (!image) {
            toast.error('Please upload an image');
            return;
        }

        try {
            // Upload image to Cloudinary
            const cloudinaryData = await uploadImageToCloudinary(image);
            const { imageUrl, imagePublicId } = cloudinaryData;

            // Send food details along with the Cloudinary image URL and public ID to backend
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("description", data.description);
            formData.append("price", Number(data.price));
            formData.append("category", data.category);
            formData.append("imageUrl", imageUrl); // Send Cloudinary image URL
            formData.append("imagePublicId", imagePublicId); // Send Cloudinary image public ID

            const response = await axios.post(`${url}/api/food/add`, formData);

            if (response.data.success) {
                toast.success(response.data.message);
                setData({
                    name: "",
                    description: "",
                    price: "",
                    category: "Salad"
                });
                setImage(null);
                setPreviewImage(null);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error("Failed to add food item");
        }
    };

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    const onImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    return (
        <div className='add'>
            <form className='flex-col' onSubmit={onSubmitHandler}>
                <div className='add-img-upload flex-col'>
                    <p>Upload image</p>
                    <input type="file" accept="image/*" id="image" hidden onChange={onImageChange} />
                    <label htmlFor="image">
                        <img src={previewImage || assets.upload_area} alt="Upload Preview" />
                    </label>
                </div>
                <div className='add-product-name flex-col'>
                    <p>Product name</p>
                    <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Type here' required />
                </div>
                <div className='add-product-description flex-col'>
                    <p>Product description</p>
                    <textarea name='description' onChange={onChangeHandler} value={data.description} rows={6} placeholder='Write content here' required />
                </div>
                <div className='add-category-price'>
                    <div className='add-category flex-col'>
                        <p>Product category</p>
                        <select name='category' onChange={onChangeHandler} value={data.category}>
                            <option value="Salad">Salad</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Deserts">Deserts</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Cake">Cake</option>
                            <option value="Pure Veg">Pure Veg</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Noodles">Noodles</option>
                        </select>
                    </div>
                    <div className='add-price flex-col'>
                        <p>Product Price</p>
                        <input type="number" name='price' onChange={onChangeHandler} value={data.price} placeholder='25' required />
                    </div>
                </div>
                <button type='submit' className='add-btn'>ADD</button>
            </form>
        </div>
    );
};

export default Add;
