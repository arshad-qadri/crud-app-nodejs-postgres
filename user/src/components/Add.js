import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useParams, useHistory } from "react-router-dom";

const Add = () => {
  const Data = {
    id: null,
    title: "",
    description: "",
  };
  const [userData, setUserData] = useState(Data);
  let { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:5050/api/tutorials/${id}`, {})
        .then((res) => {
          if (res) {
            setUserData({
              ...userData,
              id: id,
              title: res.data.title,
              description: res.data.description,
            });
          }
        })
        .catch((err) => {
          if (err) {
            alert(err);
          }
        });
    }
  }, [id]);
  const handleAdd = (e) => {
    e.preventDefault();

    if (userData.title !== "" && userData.description !== "" ) {
      axios
        .post("http://localhost:5050/api/tutorials/", userData)
        .then((res) => {
            setUserData("");
            alert("Added successfully.");
            history.push("/");
          
        })
        .catch((err) => {
          alert(err);
        });
    } else {
      alert("plz fill the fields");
    }
      
     
      
  
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    if (userData.title && userData.description) {
      axios
        .put(`http://localhost:5050/api/tutorials/${id}`, {
          title: userData.title,
          description: userData.description,
        })
        .then((res) => {
          if (res) {
            console.log("find", res.data);
            setUserData({
              ...userData,
              id: id,
              title: res.data.title,
              description: res.data.description,
            });
          }
          history.push("/")
        })
        .catch((err) => {
          if (err) {
            alert(err);
          }
        });
    }
    else{
      alert("Plz fill the fields")
    }
  };
  const hendelChange = (e) => {
    
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  return (
    <>
      <NavLink to="/">
        <button>Back</button>
      </NavLink>
      <div className="App">
        <h1>Add user</h1>
        <form>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="title"
            value={userData.title || ""}
            onChange={(e) => hendelChange(e)}
          />
          <br />
          <label htmlFor="name">Description</label>
          <input
            type="text"
            name="description"
            value={userData.description || ""}
            onChange={(e) => hendelChange(e)}
          />
          <br />

          <button onClick={id ? handleUpdate : handleAdd}>
            {id ? "Update" : "Add"}
          </button>
        </form>
      </div>
    </>
  );
};

export default Add;
