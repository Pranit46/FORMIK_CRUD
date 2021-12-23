import React, { useEffect } from "react";
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
  });

  let navigate = useNavigate();
  const params = useParams();
  // let [name, setName] = useState("");
  // let [email, setEmail] = useState("");
  // let [number, setNumber] = useState("");
  // let [model, setModel] = useState("");
  // let [desc, setDesc] = useState("");

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      // dataValues
      firstName: "",
      emailReg: "",
      modelName: "",
      carNumber: "",
      carDesc: "",
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

      carDesc: Yup.string().min(4, "Too short").required("Required"),
    }),
    onSubmit: (values, onSubmitProps) => {
      handleSave(values);
      onSubmitProps.setSubmitting(false);
    },
  });

  let handleSave = async (values) => {
    let dataToAdd = {
      name: formik.values.firstName,
      email: formik.values.emailReg,
      number: formik.values.carNumber,
      model: formik.values.modelName,
      desc: formik.values.carDesc,
    };

    await fetch(
      "https://614eabfab4f6d30017b482c4.mockapi.io/cardetails/" + params.id,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify( dataToAdd ),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        navigate("/all-cars");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  let getData = async () => {
    await fetch(
      "https://614eabfab4f6d30017b482c4.mockapi.io/cardetails/" + params.id
    )
      .then((response) => response.json())
      .then((data) => {
        formik.setFieldValue("firstName", data.name);
        formik.setFieldValue("emailReg", data.email);
        formik.setFieldValue("modelName", data.model);
        formik.setFieldValue("carNumber", data.number);
        formik.setFieldValue("carDesc", data.desc);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
            value={formik.values.emailReg}
            name="emailReg"
            className="form-control"
            // onChange={(e) => setEmail(e.target.value)}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter email"
          />
          {formik.touched.emailReg && formik.errors.emailReg ? (
            <div style={{ color: "red" }}>{formik.errors.emailReg}</div>
          ) : null}

        </div>
        <div className="form-group">
          <label for="exampleInputPassword1">Car number</label>
          <input
            type="text"
            name="carNumber"
            value={formik.values.carNumber}
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
          <label for="exampleInputPassword1">Car Model</label>
          <input
            type="text"
            name="modelName"
            value={formik.values.modelName}
            className="form-control"
            // onChange={(e) => setModel(e.target.value)}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter Car model"
          />
          {formik.touched.modelName && formik.errors.modelName ? (
            <div style={{ color: "red" }}>{formik.errors.modelName}</div>
          ) : null}
        </div>
        <div className="form-group">
          <label for="exampleInputPassword1">Car Damage Description</label>
          <input
            type="text"
            name="carDesc"
            value={formik.values.carDesc}
            className="form-control"
            // onChange={(e) => setDesc(e.target.value)}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter car damage description"
          />
          {formik.touched.carDesc && formik.errors.carDesc ? (
            <div style={{ color: "red" }}>{formik.errors.carDesc}</div>
          ) : null}
        </div>
        <button className="btn btn-success" type="submit" onClick={handleSave}
        disabled={!formik.isValid || formik.isSubmitting}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default EditDamageCars;
