import React, { useEffect, useState } from "react";

import axios from "axios";
import { NavLink, useHistory } from "react-router-dom";
function UserList() {
  const [data, setData] = useState();
 const history = useHistory()
  const getData = () => {
       axios
         .get("http://localhost:5050/api/tutorials", {})
         .then((res) => {
          
           setData(res);
         })
         .catch((err) => {
         });
  }
  useEffect(() => {
   getData();
  }, []);



//   handle delete ===============

const handleDelete=(id)=>{
    axios.delete(`http://localhost:5050/api/tutorials/${id}`,{}).then((res)=>{
         if (res) {
 
           getData();
           alert(res.data.message);
         }
    }).catch((err)=>{
        if(err){
            alert(err)
        }
    })
}


  return (
    <div className="App">
      <h1>User</h1> <br />
      <NavLink to="/add" >
        <button>Add</button>
      </NavLink>
      <div className="">
        {data?.data.map((data) => {
          return (
            <div
              style={{
                display: "flex",
                gap: "20px",
                justifyContent: "center",
                alignItems: "center",
              }}
              key={data.id}
            >
              <h3> {data.title} </h3>
              <p> {data.description} </p>
              <button onClick={() => history.push(`/update/${data.id}`)}> Update </button>
              <button onClick={() => handleDelete(data.id)}>Delete</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default UserList;
