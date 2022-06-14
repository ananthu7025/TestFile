import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import axios from "axios";
import react, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function WidgetSm() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    loadProduct();
  }, []);
  const loadProduct = async () => {
    await axios.get("http://localhost:3003/user").then((res) => {
      setUsers(res.data);
    });
  };
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        <li className="widgetSmListItem">
          <img src="logo" alt="" className="widgetSmImg" />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">Jhon</span>
            <span className="widgetSmUserTitle">dev</span>
          </div>
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
            Display
          </button>
        </li>
        <li className="widgetSmListItem">
          <img src="logo" alt="" className="widgetSmImg" />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">Jhon</span>
            <span className="widgetSmUserTitle">dev</span>
          </div>
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
            Display
          </button>
        </li>
        {users.map((row, i) => (
          <li className="widgetSmListItem">
            <img src={row.img} alt="" className="widgetSmImg" />
            <div className="widgetSmUser">
              <span className="widgetSmUsername">{row.FullName}</span>
              <span className="widgetSmUserTitle">{row.role}</span>
            </div>
            <Link class="btn btn-primary mr-2" to={`/user/${row.id}`}>
              <button className="widgetSmButton">
                <Visibility className="widgetSmIcon" />
                Display
              </button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
