import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
  
function EditDamageCars() {
  useEffect(() => {
    
      console.log(params);
      if (params.id) {
        console.log(params.id);
        getData();
      }  
  }, []);

  let navigate = useNavigate();
  const params = useParams();
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [number, setNumber] = useState("");
  let [model, setModel] = useState("");
  let [desc, setDesc] = useState("");

  const dataValues = {
    firstName: name,
    emailReg: email,
    modelName: model,
    carNumber:number,
    carDesc: desc,
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      dataValues
      // firstName: name,
      // emailReg: "",
      // modelName: "",
      // carNumber:"",
      // carDesc:""
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(10, "Must be 10 characters or less")
        .min(3, "Too short")
        .required("Required"),

      modelName: Yup.string().required("Required"),

      carNumber: Yup.string()
        .max(4, "Please eneter 4 digit valid number")
        .min(4, "Please eneter 4 digit valid number")
        .required("Required"),

      emailReg: Yup.string()
        .email("Invalid email address")
        .required("Required"),

        carDesc: Yup.string()
        .min(4, "Too short")
        .required("Required"),
    }),
    onSubmit: (values, onSubmitProps) => {
      handleSave(values);
      onSubmitProps.setSubmitting(false);
    },
  });

  let handleSave = async(values)=>{
    console.log("Roshan val" +formik.values.firstName);
    await fetch('https://614eabfab4f6d30017b482c4.mockapi.io/cardetails/'+params.id,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            name,
            email,
            number,
            model,
            desc
        })
    })
    
    .then(response =>response.json())
    .then(data=>{
        navigate('/all-cars')
    })
    .catch((error)=>{
        console.log(error)
    })
}

  let getData = async()=>{
    await fetch('https://614eabfab4f6d30017b482c4.mockapi.io/cardetails/'+params.id)
    .then(response =>response.json())
    .then(data=>{
        setName(data.name)
        setEmail(data.email)
        setNumber(data.number)
        setModel(data.model)
        setDesc(data.desc)
    })
    .catch((error)=>{
        console.log(error)
    })
}

  return (
    <div>
      <h1>Edit Car Details</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label for="exampleInputPassword1">Name of owner</label>
          <input
            type="text"
            value={formik.values.firstName}
            name="firstName"
            className="form-control"
            // onChange={(e) => setName(e.target.value)}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Name"
          />
           {formik.touched.firstName && formik.errors.firstName ? (
            <div style={{ color: "red" }}>{formik.errors.firstName}</div>
          ) : null}
        </div>
        <div className="form-group">
          <label for="exampleInputEmail1">Email</label>
          <input
            type="email"
            value={email}
            className="form-control"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label for="exampleInputPassword1">Car number</label>
          <input
            type="text"
            value={number}
            className="form-control"
            onChange={(e) => setNumber(e.target.value)}
            placeholder="Enter car number"
          />
        </div>
        <div className="form-group">
          <label for="exampleInputPassword1">Car Model</label>
          <input
            type="text"
            value={model}
            className="form-control"
            onChange={(e) => setModel(e.target.value)}
            placeholder="Enter Car model"
          />
        </div>
        <div className="form-group">
          <label for="exampleInputPassword1">Car Damage Description</label>
          <input
            type="text"
            value={desc}
            className="form-control"
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Enter car damage description"
          />
        </div>
        <button className="btn btn-primary" type="submit" onClick={handleSave}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default EditDamageCars;
