import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import AllCars from "./Components/AllCars";
import AddDamageCars from "./Components/AddDamageCars";
import EditDamageCars from "./Components/EditDamageCars";
import ServiceInfo from "./Components/ServiceInfo";
import axios from "axios";

// import axios from "axios";
export const CarContext = React.createContext();

function App() {
  useEffect(() => {
    getData();
  }, []);


  let getData = async () => {
    let d = await axios.get(
      "https://614eabfab4f6d30017b482c4.mockapi.io/cardetails"
    );
    // .then(res=> {setData(res.data)})
    console.log(d.data);
    setData(d.data);
  };

  let [data, setData] = useState([]);

  let data1 = {
    earnings: "40,000",
    earnAnnual: "215,000",
    task: "50",
    pending: "18",
  };
  return (
    <>
      <Router>
        <CarContext.Provider value={{ data, setData }}>
          <div style={{ display: "grid", gridTemplateColumns: "17% 80%" }}>
            <div>
              <Sidebar />
            </div>
            <div>
              <Routes>
                <Route
                  path="/service-info"
                  element={<ServiceInfo value={data1} />}
                />
                <Route path="/all-cars" element={<AllCars />} />
                <Route path="/add-cars" element={<AddDamageCars />} />
                <Route path="/edit-cars/:id" element={<EditDamageCars />} />
                <Route path="/" element={<ServiceInfo value={data1} />} />
              </Routes>
            </div>
          </div>
        </CarContext.Provider>
      </Router>
    </>
  );
}

export default App;
