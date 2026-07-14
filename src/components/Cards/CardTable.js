import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";

// components

import TableDropdown from "components/Dropdowns/TableDropdown.js";
import {getAllUsers, deleteUser , addUser , updateUser} from "../../service/restApiUser" 
export default function CardTable({ color }) {
  //js
  const [users, setUsers] = useState([]);
  const [newUserData, setNewUserData] = useState({
    name:"",
    email:"",
    password:"",
    role:"",
    address:"",
    phone:"",
    });

    const handleInputChange = (e) => {
      const {name, value} = e.target; //get the name and value of the input field
      setNewUserData({...newUserData, [name]: value}); //update the state with the new value
      console.log(newUserData);
    }

    const getUsers = useCallback(async () => {
    try {
      const res = await getAllUsers(); //tjib list of users from back (response)
      console.log("Full response:", res);
      console.log("Users data:", res.data?.data); // <-- correct path
      setUsers(res.data?.data || []);            // <-- fix
    } catch (error) {
      console.log("error fetching users", error);
      setUsers([]);
    }
  }, []);


  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      getUsers();
    } catch (error) {
      console.log("error deleting user", error);
    }
  };
  useEffect(() => { //run page load automatically once when component render instead of creating get all user button
    getUsers();
  }, [getUsers]);
  
  return (
    <>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
          (color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")
        }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3
                className={
                  "font-semibold text-lg " +
                  (color === "light" ? "text-blueGray-700" : "text-white")
                }
              >
                List of users
              </h3>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-white  text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  User Name
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-white  text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Email
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-white  text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Role
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-white text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Created At
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-white text-lightBlue-300 bold border-lightBlue-700")
                  }
                >
                  Actions
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-white text-lightBlue-300 border-lightBlue-700")
                  }
                ></th>
              </tr>
            </thead>
            <tbody>
               {users && users.length > 0 ? (
                  users.map((user, index) => (
                <tr key={index}>
                  <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                    <img
                      src={`http://localhost:5000/images/${user.user_image}`}
                      className="h-12 w-12 bg-white rounded-full border"
                    alt="..."
                  ></img>{" "}
                  <span
                    className={
                      "ml-3 font-bold " +
                      (color === "light" ? "text-blueGray-600" : "text-white")
                    }
                  >
                    {user.name}
                  </span>
                </th>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {user.email}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                 {user.role}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                 {user.createdAt}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <button className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                    Edit
                  </button>
                  <button className="bg-red-500 text-white active:bg-red-700 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                    Delete
                  </button>
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                  <TableDropdown />
                </td>
              </tr>
              )) ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                    No users found
                  </td>
                </tr>
              )
              }
            </tbody>
          </table>
        </div>
      </div>
      <div>
          <h2 className="text-xl font-bold leading-normal mt-0 mb-2 text-lightBlue-700">Add New User</h2>
        
        <div className="mb-3 pt-0">
            <input type="text" placeholder="Name" className="px-2 py-1 placeholder-blueGray-400 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-1/4"
            onChange={handleInputChange} name="name"/>
        </div>
        <div className="mb-3 pt-0">
            <input type="email" placeholder="Email" className="px-2 py-1 placeholder-blueGray-400 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-1/4"
            onChange={handleInputChange} name="email"/>
        </div>
        <div className="mb-3 pt-0">
            <input type="password" placeholder="Password" className="px-2 py-1 placeholder-blueGray-400 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-1/4"
            onChange={handleInputChange} name="password"/>
        </div>
        <div className="mb-3 pt-0">
            <input type="number" placeholder="phone" className="px-2 py-1 placeholder-blueGray-400 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-1/4" 
            onChange={handleInputChange} name="phone"/>
        </div>
        <div className="mb-3 pt-0">
            <input type="text" placeholder="address" className="px-2 py-1 placeholder-blueGray-400 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-1/4"
            onChange={handleInputChange} name="address"/>
        </div>
       <div className="mb-3 pt-0">
        <select
          defaultValue=""
          className="px-2 py-1 placeholder-blueGray-400 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-1/4"
          onChange={handleInputChange}
          name="role"
        >
          <option value="" disabled hidden>
            Role
          </option>
          <option value="admin">Admin</option>
          <option value="parent">Parent</option>
          <option value="babysitter">Babysitter</option>
        </select>
      </div>
          <button
          className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            onClick={addUser}>
            Add User</button>  
             <button
          className="bg-red-500 text-white active:bg-red-800 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            >
            Cancel</button>   
      </div>
        
    </>
    
  );
}


CardTable.defaultProps = {
  color: "light",
};

CardTable.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
