import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import react, { useEffect, useState } from "react";
import axios from "axios";
export default function TaskEdit() {
  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const postData = (e) => {
    e.preventDefault();
    setOpen(false);
    axios
      .post("http://localhost:3003/task", {
        name,
        time,
        date,
      })
      .then((res) => {
        setUsers([
          ...users,
          {
            id: res.data.id,
            name: res.data.name,
            time: res.data.time,
            date: res.data.date,
          },
        ]);
      });
  };
  return (
    <div>
      <i onClick={handleClickOpen} class="bx bx-plus"></i>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <form className="newUserForm">
            <div className="newUserItem">
              <label>Task Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ height: "50px" }}
                type="text"
                placeholder="john"
              />
            </div>
            <div className="newUserItem">
              <label>Time</label>
              <input
                value={time}
                onChange={(e) => setTime(e.target.value)}
                style={{ height: "50px" }}
                type="number"
                placeholder="John Smith"
              />
            </div>
            <div className="newUserItem">
              <label>Date</label>
              <input
                value={date}
                onChange={(e) => setDate(e.target.value)}
                style={{ height: "50px" }}
                type="date"
                placeholder="John Smith"
              />
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={postData}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
