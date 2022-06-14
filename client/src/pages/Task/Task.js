import React from "react";
import axios from "axios";
import "./Task.css";
import react, { useEffect, useState } from "react";
import TaskEdit from "../../components/modals/TaskAdd";

const Task = () => {
  const [click, setClick] = useState();
  console.log(click);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    await axios.get("http://localhost:3003/task").then((res) => {
      setUsers(res.data);
    });
  };
  const Complete = async () => {
    await axios.get("http://localhost:3003/complete").then((res) => {
      setClick(click);
    });
  };

  const DeleteProduct = async (id) => {
    await axios.delete(`http://localhost:3003/task/${id}`);
    loadProduct();
    setAnchorEl(null);
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <section id="content">
      <main>
        <div class="table-data">
          <div class="order">
            <div class="Tasker">
              <div class="head">
                <h3>Task </h3>
                <TaskEdit />
              </div>

              <ul class="Tasker-list">
                {users.map((row, i) => (
                  <li key={i} class="not-completed">
                    <p>{row.name}</p>
                    <span>{row.time}</span>
                    <span>{row.date}</span>
                    <button
                      onClick={(e) => {
                        DeleteProduct(row.id);
                      }}
                    >
                      del
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};

export default Task;
