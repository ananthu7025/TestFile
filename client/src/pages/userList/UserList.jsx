import axios from "axios";
import "./userList.css";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import react, { useEffect, useState } from "react";
import { Button, ButtonBase, FormLabel, Menu, MenuItem, TextField } from "@material-ui/core";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export default function UserList() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    await axios.get("http://localhost:3003/user").then((res) => {
      setUsers(res.data);
    });
  };
  const useStyles = makeStyles({
    btn: {
      backgroundColor: "rgb(228, 228, 250)",
      float: "center",
      margincenter: 50,
    },
    table: {
      minWidth: 650
    }
  });
  const classes = useStyles();
  const DeleteProduct = async (id) => {
    await axios.delete(`http://localhost:3003/user/${id}`);
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
    <div className="userList">
      <div className="App">
        <Link to="/newUser">
          {" "}
          <Button variant="outlined">Add user</Button>
        </Link>
        <br />
        <br />
        <br />
        <Paper>
        
        <TableContainer>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>UserName</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Phone&nbsp;</TableCell>
                <TableCell align="center">Address&nbsp;</TableCell>
                <TableCell align="center">Role&nbsp;</TableCell>
                <TableCell align="center">Email&nbsp;</TableCell>
                <TableCell align="center">Image&nbsp;</TableCell>
                <TableCell align="center">Action&nbsp;</TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {users .map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.UserName}
                  </TableCell>
                  <TableCell align="center">{row.FullName}</TableCell>
                  <TableCell align="center">{row.phone}</TableCell>
                  <TableCell align="center">{row.address}</TableCell>
                  <TableCell align="center">{row.role}</TableCell>
                  <TableCell align="center">{row.email}</TableCell>
                  <TableCell align="center"><img style={{width:"50px"}} src={row.img}/></TableCell>

                  <TableCell align="center">
                  <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Dashboard
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem><Link class="btn btn-primary mr-2" to={`/user/${row.id}`}>view</Link> </MenuItem>
        <MenuItem onClick={()=>DeleteProduct(row.id)} >Delete</MenuItem>
        <MenuItem ><Link
                    class="btn btn-outline-primary mr-2"
                    to={`/user/${row.id}`}
                  >
                    Edit
                  </Link></MenuItem>

      </Menu>


                  </TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
         
    </div>       
    </div>
  );
}
