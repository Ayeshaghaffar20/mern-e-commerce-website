import React, { useState } from 'react'

const UserManagement = () => {
    const users = [
        {
            _id:123124,
            name:"John Doe",
            email:"john@gmail.com",
            role:"admin"
        }
    ]

    const [formData ,setFormData] =useState({
        name:"",
        email:"",
        password:"",
        role:"customer"
    })

    const handleChange =(e) =>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
    }
    const handleSubmit =(e)=>{
        e.preventDefault()
        console.log(formData);
        
        setFormData({
            name:"",
            email:"",
            password:"",
            role:"customer"
            
        })
    }

    const handleRoleChange =(userId,newRole) =>{
        console.log({id:userId ,role:newRole});
        
    }

    const handleDeleteChange =(userId)=>{
        if(window.confirm("Are you sure you want to delete this user")){
            console.log("deleting user with userId" ,userId);
            
        }
    }
  return (
    <div className='max-w-7xl mx-auto p-6'>
        <h2 className='text-2xl font-bold mb-6'>User Management</h2>
        <div className="p-6 rounded-lg mb-6">
            <h3 className='text-lg font-bold mb-4'>Add New User</h3>
            <form onSubmit={handleSubmit}>
                <div className='mb-4'>
                    <label className='block text-gray-700'>Name</label>
                    <input type="text" 
                    name='name'
                     value={formData.name} 
                     onChange={handleChange} 
                     className='w-full p-2 rounded border' required/>
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700'>Email</label>
                    <input type="email" 
                    name='email'
                     value={formData.email} 
                     onChange={handleChange} 
                     className='w-full p-2 rounded border' required/>
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700'>Password</label>
                    <input type="password" 
                    name='password'
                     value={formData.password} 
                     onChange={handleChange} 
                     className='w-full p-2 rounded border' required/>
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700'>Role</label>
                  <select name='role'
                  value={formData.role}
                  onChange={handleChange}
                  className='w-full p-2 rounded border'>
                    <option value="customer">Customer</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <button type='submit' className='py-2 px-4 bg-green-500 hover:bg-green-600 text-white rounded-sm'>
                    Add User
                </button>
            </form>
        </div>
        {/* User List Management  */}

        <div className='overflow-x-auto shadow-md sm:rounded-lg'>
  <table className='min-w-full text-left text-gray-500'>
    <thead className='bg-gray-100 text-xs uppercase text-gray-700'>
      <tr>
        <th className='py-3 px-4'>Name</th>
        <th className='py-3 px-4'>Email</th>
        <th className='py-3 px-4'>Role</th>
        <th className='py-3 px-4'>Actions</th>
      </tr>
    </thead>
    <tbody>
        {users.map((item)=>(
            <tr key={item._id} className='border-b hover:bg-gray-50'>
                <td className='p-4 font-medium text-gray-500 whitespace-nowrap'>
                    {item.name}
                </td>
                <td className='p-4'>{item.email}</td>
                <td className='p-4'>
                    <select value={item.role} onChange={(e)=> handleRoleChange(item._id,e.target.value)} className='p-2 border rounded'>
                        <option value="customer">Customer</option>
                        <option value="Admin">Admin</option>
                    </select>
                </td>
                <td className='p-4'>
                    <button onClick={()=>handleDeleteChange(item._id)} className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-sm'>
                        Delete
                    </button>
                </td>
                <td></td>
            </tr>
        ))}
    </tbody>
    </table>
    </div>
      
    </div>
  )
}

export default UserManagement
