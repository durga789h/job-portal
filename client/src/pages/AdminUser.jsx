import { useEffect, useState } from "react";
import { ImUsers } from "react-icons/im";
import { useAuth } from "../store/userauth";
import { Link, Router, useNavigate } from "react-router-dom";


export default function AdminUsers() {
  const router=useNavigate();
  const [users, setUsers] = useState([]);
  const { authorizationToken } = useAuth();

  const getAllUsersData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/users", {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      }
    } catch (error) {
      console.error("Error fetching users data:", error.message);
    }
  };

  useEffect(() => {
    getAllUsersData();
  }, []);

  const deleteUser = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/users/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        getAllUsersData(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-screen-md mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold mb-4">
        <ImUsers className="inline-block mr-2" />
        Admin Users
      </h1>
      <button className='bg-blue-700 text-white p-3 mb-3 rounded-full w-full'  onClick={()=>router("/admin")}>previous</button>
      <div className="overflow-x-auto">
        <table className="w-full table-fixed">
          <thead>
            <tr>
              <th className="w-1/2 sm:w-1/5 py-2">Name</th>
              <th className="w-full sm:w-1/5 py-2">Email</th>
              <th className="hidden sm:table-cell w-1/5 py-2">Phone</th>
              <th className="w-1/2 sm:w-1/5 py-2">Update</th>
              <th className="w-1/2 sm:w-1/5 py-2">Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td className="py-2">{user.username}</td>
                <td className="py-2">{user.email}</td>
                <td className="hidden sm:table-cell py-2">{user.phone}</td>
                <td className="py-2">
                  <Link
                    to={`/admin/users/${user._id}/edit`}
                    className="text-green-600 hover:underline"
                  >
                    Edit
                  </Link>
                </td>
                <td className="py-2">
                  <span
                    className="text-red-600 cursor-pointer hover:underline"
                    onClick={() => deleteUser(user._id)}
                  >
                    Delete
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {users.map((user, index) => (
        <div key={index} className="mt-8 border rounded-lg p-4">
          <h2 className="text-xl font-bold mb-2">{user.username}</h2>
          <p className="mb-2">{user.email}</p>
          <p>{user.phone}</p>
        </div>
      ))}
       <button className='bg-blue-700 text-white p-3 rounded-full w-full'  onClick={()=>router("/admin")}>previous</button>
      
    </div>
  );
}
