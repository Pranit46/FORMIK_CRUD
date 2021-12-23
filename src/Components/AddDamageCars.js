import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";


import axios from "axios";

function AddDamageCars() {
//   let context = useContext(carContext);
  let navigate = useNavigate();
  // console.log(context);
  // let [name, setName] = useState("");
  // let [email, setEmail] = useState("");
  // let [number, setNumber] = useState("");
  // let [model, setModel] = useState("");
  // let [desc, setDesc] = useState("");

  const formik = useFormik({
    initialValues: {
      firstName:"",
      emailReg: "",
      modelName: "",
      carNumber:"",
      carDesc:""
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


    let handleSave = async (values) => { 
    values.preventDefault();
    try {
        let dataToAdd = {
            name:  formik.values.firstName,
            email: formik.values.emailReg,
            number: formik.values.carNumber,
            model: formik.values.modelName,
            desc: formik.values.carDesc,
          }
      let res = await axios.post(
        "https://614eabfab4f6d30017b482c4.mockapi.io/cardetails",
            dataToAdd
      );
      console.log(res);
      navigate("/all-cars");
    } catch (err) {
      console.log(err);
    }
  };

//   let handleSave = async (e) => {
      
//     e.preventDefault();
//     try {
//       let res = await axios.post(
//         "https://614eabfab4f6d30017b482c4.mockapi.io/cardetails",
//         {
//           name,
//           email,
//           number,
//           model,
//           desc,
//         }
//       );
//       console.log(res);
//       navigate("/all-cars");
//     } catch (err) {
//       console.log(err);
//     }
//   };

  return (
    <div>
      <h1>Add Car Details</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Name of owner</label>
          <input
            type="text"
            id="firstName"
            className="form-control"
            // onChange={(e) => setName(e.target.value)}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.firstName}
            placeholder="Enter Name"
            name="firstName"
          />
          {formik.touched.firstName && formik.errors.firstName ? (
            <div style={{ color: "red" }}>{formik.errors.firstName}</div>
          ) : null}
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Car model</label>
          <input
            type="text"
            name="modelName"
            id="modelName"
            className="form-control"
            // onChange={(e) => setModel(e.target.value)}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter text"
          />
          {formik.touched.modelName && formik.errors.modelName ? (
            <div style={{ color: "red" }}>{formik.errors.modelName}</div>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Damage Details</label>
          <input
            type="text"
            id="carDesc"
            name="carDesc"
            className="form-control"
            id="exampleInputEmail1"
            // onChange={(e) => {setDesc(e.target.value)}}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter damage description"
          />
          {formik.touched.carDesc && formik.errors.carDesc ? (
            <div style={{ color: "red" }}>{formik.errors.carDesc}</div>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Car number</label>
          <input
            type="text"
            id="carNumber"
            name="carNumber"
            className="form-control"
            // onChange={(e) => setNumber(e.target.value)}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter car number"
          />
          {formik.touched.carNumber && formik.errors.carNumber ? (
            <div style={{ color: "red" }}>{formik.errors.carNumber}</div>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email</label>
          <input
            type="email"
            id="emailReg"
            className="form-control"
            // onChange={(e) => setEmail(e.target.value)}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.emailReg}
            placeholder="Enter Email"
            name="emailReg"
          />
          {formik.touched.emailReg && formik.errors.emailReg ? (
            <div style={{ color: "red" }}>{formik.errors.emailReg}</div>
          ) : null}
        </div>
        <button
          className="btn btn-success"
          type="submit"
          name="submit"
          onClick={handleSave}
        disabled={!formik.isValid || formik.isSubmitting}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddDamageCars;
