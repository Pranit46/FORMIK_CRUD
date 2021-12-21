import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Allcars() {
  useEffect(() => {
    getData();
  }, []);

  let navigate = useNavigate();
  let [data, setData] = useState([]);

  let getData = async () => {
    let d = await axios.get("https://614eabfab4f6d30017b482c4.mockapi.io/cardetails")
    //.then(res=> {setData(res.data)})
    console.log(d.data);
    setData(d.data);
  };

  let handleDelete = async (id) => {
    try {
      let res = await axios.delete(
        "https://614eabfab4f6d30017b482c4.mockapi.io/cardetails/" + id
      );
      console.log(res);
      getData();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Sr. No</th>
            <th scope="col">Car Owner</th>
            <th scope="col">Car model</th>
            <th scope="col">Damage Description</th>
            <th scope="col">Car Number</th>
            <th scope="col">Email</th>
            <th scope="col">Options</th>
          </tr>
        </thead>
        <tbody>
          {data.map((e, i) => {
            return (
              <>
                <tr key={e.id}>
                  <th scope="row">{i + 1}</th>
                  <td>{e.name}</td>
                  <td>{e.model}</td>
                  <td>{e.desc}</td>
                  <td>{e.number}</td>
                  <td>{e.email}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => navigate("/edit-cars/" +e.id)}
                    >
                      Edit
                    </button>
                    &nbsp;
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(e.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Allcars;
