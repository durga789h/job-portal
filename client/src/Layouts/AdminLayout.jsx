import { Link, Outlet} from 'react-router-dom';
import './AdminLayout.css';
import { ImUsers } from "react-icons/im";
import { MdContacts } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { useAuth } from '../store/userauth';

const AdminLayout=() =>{
const {user}=useAuth();

console.log(user);
const isAdmin = user && user.isAdmin;

  return (
    <>
    <div>
    {isAdmin ?<>
  <nav className='alexn'>
    <ul>
      <li><Link className='links' to={'/admin/users'}><ImUsers /> users</Link></li>
      <li><Link className='links' to={'/admin/contacts'}><MdContacts /> contacts</Link></li>
      <li><Link className='links' to={'/admin/my-job'}><MdContacts />Myjobs </Link></li>

      <li><Link className='links' to={'/'}><FaHome /> Home</Link></li>
    </ul>
  </nav>
  </>:
  <></>}
    </div>
    <Outlet/>
    </>
  )
}

export default AdminLayout;