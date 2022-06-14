import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import "./user.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory, useParams } from "react-router-dom";
export default function User() {
  let history = useHistory();
  const { id } = useParams();
  const [user, setUser] = useState({
    UserName: "",
    FullName: "",
    email: "",
    img: "",
    phone:"",
    address:"",
    role:""   
  });

  const {  UserName, img, FullName,phone,address,role,email  } = user;
  const onInputChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadUser();
  }, []);

  const onSubmit = async e => {
    e.preventDefault();
    await axios.put(`http://localhost:3003/user/${id}`, user);

  history.push("/users")

  };

  const loadUser = async () => {
    const result = await axios.get(`http://localhost:3003/user/${id}`);
    setUser(result.data);
  };
  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        <Link to="/newUser">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="user">
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src={img}
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{FullName}</span>
              <span className="userShowUserTitle">{role}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{UserName}</span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">{phone}</span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{email}</span>
            </div>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">{address}</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form onSubmit={e => onSubmit(e)} className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  name="UserName"
                  className="userUpdateInput"
                  value={UserName}
                  onChange={e => onInputChange(e)}
                />
              </div>
              <div className="userUpdateItem">
                <label>Full Name</label>
                <input
                  placeholder="Anna Becker"
                  className="userUpdateInput"
                  name="FullName"
              value={FullName}
              onChange={e => onInputChange(e)}
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  name="email"
                  className="userUpdateInput"
                  value={email}
                  onChange={e => onInputChange(e)}
                />
              </div>
              <div className="userUpdateItem">
                <label>Phone</label>
                <input
                  name="phone"
                  placeholder="+1 123 456 67"
                  className="userUpdateInput"
                  value={phone}
                  onChange={e => onInputChange(e)}
                />
              </div>
              <div className="userUpdateItem">
              <label>Role</label>
          <select className="newUserSelect" onChange={e => onInputChange(e)}  >
            <option value={role}>Dev</option>
            <option value={role}>Tester</option>
          </select>
              </div>
              <div className="userUpdateItem">
                <label>Address</label>
                <input
                  name="address"
                  placeholder="New York | USA"
                  className="userUpdateInput"
                  value={address}
                  onChange={e => onInputChange(e)}
                />
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src={img}
                  alt=""
                />
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input type="file" id="file" style={{ display: "none" }} />
              </div>
              <button className="userUpdateButton">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
}
