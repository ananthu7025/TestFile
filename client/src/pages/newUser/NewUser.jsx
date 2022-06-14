import "./newUser.css";
import axios from "axios";
import react, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function NewUser() {
  let history=useHistory();
const [users, setUsers] = useState([]);
const [UserName, setUserName] = useState("");
const [img, setimg] = useState("");
const [FullName, setFullName] = useState("");
const [phone, setPhone] = useState("");
const [address, setAdress] = useState("");
const [role, setRole] = useState("");
const [email, setEmail] = useState("");
const postData = (e) => {
  e.preventDefault(); 
  axios
    .post("http://localhost:3003/user", {
      UserName, img, FullName,phone,address,role,email 
    })
    .then((res) => {
      setUsers([
        ...users,
        {
          id: res.data.id,
          UserName: res.data.UserName,
          img: res.data.img,
          FullName:res.data.FullName,
          phone:res.data.phone,
          address:res.data.address,
          role:res.data.role,
          email:res.data.email  
        },
      ]);
    },);
    history.push('/users')
};
const uploadPhoto = (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onloadend = () => {
    setimg(reader.result);
    localStorage.setItem('photo',reader.result)
  };
  reader.readAsDataURL(file);
}
  return (
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <form className="newUserForm">
        <div className="newUserItem">
          <label>Username</label>
          <input type="text" placeholder="john"  value={UserName} onChange={(e) => setUserName(e.target.value)} />
        </div>
        <div className="newUserItem">
          <label>Full Name</label>
          <input type="text" placeholder="John Smith" value={FullName} onChange={(e) => setFullName(e.target.value)} />
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input type="email" placeholder="john@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="newUserItem">
          <label>Phone</label>
          <input type="text" placeholder="+1 123 456 78" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <div className="newUserItem">
          <label>Address</label>
          <input type="text" placeholder="New York | USA"  value={address} onChange={(e) => setAdress(e.target.value)}/>
        </div>
        <div className="newUserItem">
          <label>Image</label>
          <input
          type="file"
          accept=".png, .jpg, .jpeg"
          className="edit-input" 
          name="photo"
          onChange={(e) => uploadPhoto(e)}
          placeholder="Enter your office photo "
        />
        </div>
        <div className="newUserItem">
          <label>Role</label>
          <select className="newUserSelect" onChange={(e) => setRole(e.target.value)}>
            <option value="dev">Dev</option>
            <option value="tester">Tester</option>
          </select>
        </div>
        <button onClick={postData} className="newUserButton">Create</button>
      </form>
    </div>
  );
}
