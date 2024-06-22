import { useEffect, useState } from "react";
import { useAuth } from "../store/userauth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function AdminContacts() {
  const router=useNavigate();
  const { authorizationToken } = useAuth();
  const [contactData, setContactData] = useState([]);

  const getContactsData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/contacts', {
        method: 'GET',
        headers: {
          Authorization: authorizationToken,
        }
      });
      const data = await response.json();
      if (response.ok) {
        setContactData(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const deleteContactById = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/contacts/delete/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: authorizationToken,
        }
      });
      if (response.ok) {
        getContactsData();
        toast.success("Deleted contact successfully");
      } else {
        toast.error("Failed to delete contact");
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getContactsData();
  }, []);

  return (
    <div className="max-w-screen-md mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold mb-4">Admin Contact Panel</h1>

      {contactData.map((value, index) => {
        const { username, email, message, _id } = value;
        return (
          <div key={index} className="bg-green-200 p-4 rounded-lg mb-4">
            <h2 className="text-xl font-bold mb-2">{username}</h2>
            <p className="mb-2">{email}</p>
            <p className="mb-4">{message}</p>
            <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600" onClick={() => deleteContactById(_id)}>Delete</button>
          </div>
        )
      })}
       <button className='bg-blue-700 text-white p-3 rounded-full'
         onClick={()=>router("/admin")}>previous</button>
    </div>
  )
}
