import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";

const ClientCreate = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    companyname: Yup.string()
      .matches(/^[A-Za-z\s]+$/, "Name must contain only letters")
      .required("Name is required"),
    email: Yup.string()
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, "Invalid email format")
      .required("Email is required"),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
      .required("Phone is required"),
  });

  const initialValues = {
    companyname: "",
    email: "",
    phone: "",
  };

  const handleSubmit = (values) => {
    console.log(values);
    fetch("http://localhost:3004/clients", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(values),
    })
      .then((res) => {
        //alert("Saved successfully.");
        navigate("/");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div>
      <div className="row">
        <div className="offset-lg-3 col-lg-6">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form className="container">
                <div className="card" style={{ textAlign: "left" }}>
                  <div className="card-title">
                    <h2 style={{ textAlign: "center" }}>Register new Company</h2>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-lg-12"></div>
                      <div className="col-lg-12">
                        <div className="form-group">
                          <label>Company Name</label>
                          <Field
                            name="companyname"
                            className="form-control"
                          />
                          <ErrorMessage
                            name="companyname"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="form-group">
                          <label>Email</label>
                          <Field name="email" className="form-control" />
                          <ErrorMessage
                            name="email"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="form-group">
                          <label>Phone</label>
                          <Field name="phone" className="form-control" />
                          <ErrorMessage
                            name="phone"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <br />
                      </div>
                      <div className="col-lg-12">
                        <div className="form-group">
                          <button className="btn btn-success" type="submit">
                            Save
                          </button>
                          <Link to="/" className="btn btn-danger">
                            Back
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default ClientCreate;
