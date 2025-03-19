// Frontend Code (Updated)

import React, { useEffect, useState } from 'react'
import './List.css'
import { url, currency } from '../../assets/assets'
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaEdit } from 'react-icons/fa';
import { Modal } from '@mui/material';

const List = () => {

  const [list, setList] = useState([]);
  const [editData, setEditData] = useState(null);
  const [open, setOpen] = useState(false);

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`)
    console.log(response.data.data);
    if (response.data.success) {
      setList(response.data.data);
    }
    else {
      toast.error("Error")
    }
  }

  const removeFood = async (foodId) => {
    const response = await axios.post(`${url}/api/food/remove`, { id: foodId })
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message);
    }
    else {
      toast.error("Error")
    }
  }

  const editFood = (food) => {
    setEditData(food);
    setOpen(true);
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(`${url}/api/food/edit`, { ...editData, id: editData._id });
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message);
      setEditData(null);
      setOpen(false);
    } else {
      toast.error("Error")
    }
  }

  useEffect(() => {
    fetchList();
  }, [])

  return (
    <div className='list add flex-col'>
      <p>All Foods List</p>

      <Modal open={open} onClose={() => setOpen(false)}>
  <div className='modal-content'>
    <h2 className='form-heading'>Edit Form</h2>
    <form onSubmit={handleEditSubmit} className='editform'>
      <input type="text" value={editData?.name} onChange={(e) => setEditData({ ...editData, name: e.target.value })} placeholder="Name" />
      <input type="text" value={editData?.description} onChange={(e) => setEditData({ ...editData, description: e.target.value })} placeholder="Description" />
      <input type="number" value={editData?.price} onChange={(e) => setEditData({ ...editData, price: e.target.value })} placeholder="Price" />
      <input type="text" value={editData?.category} onChange={(e) => setEditData({ ...editData, category: e.target.value })} placeholder="Category" />
      <button type="submit">Update Food</button>
    </form>
  </div>
</Modal>


      <div className='list-table'>
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Actions</b>
        </div>
        {list.map((item, index) => {
          return (
            <div key={index} className='list-table-format'>
              <img src={`${url}/images/` + item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{currency}{item.price}</p>
              <div className='actions'>
                <FaEdit onClick={() => editFood(item)} className='cursor' />
                <p className='cursor' onClick={() => removeFood(item._id)}>x</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default List;
