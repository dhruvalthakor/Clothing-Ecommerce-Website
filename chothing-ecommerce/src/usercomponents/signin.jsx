import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signin() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem("clothwabsitetoken");
    return storedValue ? JSON.parse(storedValue) : null;
  });

  const navigate = useNavigate();

  const handleData = (e) => {
    e.preventDefault();

    axios.post(`https://clothing-ecommerce-website-backend.onrender.com/user/userlogin`, form)
      .then((res) => {
        console.log("Response:", res.data);
        if (res.data) {
          setValue(res.data);
          localStorage.setItem("clothwabsitetoken", JSON.stringify(res.data));
          navigate("/");
        }
      })
      .catch((error) => {
        console.error("Error submitting data:", error);
      });
  };

  useEffect(() => {
    console.log("Updated Value:", value);
  }, [value]);

  return (
    <section className="container mt-5">
      <div className="row justify-content-center align-items-center">
        <div className="col-lg-7 mt-5">
          <div className="text-center mb-4">
            <h2 className="fw-bold">Sign In</h2>
            <p className="text-muted">Enter your email and password to sign in.</p>
          </div>

          <form onSubmit={handleData} className="mx-auto" style={{ maxWidth: '500px' }}>
            <div className="mb-3">
              <label className="form-label fw-medium">Your Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="name@mail.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-medium">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="********"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>

            <div className="form-check mb-3">
              <input className="form-check-input" type="checkbox" id="terms" />
              <label className="form-check-label" htmlFor="terms">
                I agree to the <a href="#" className="text-decoration-underline">Terms and Conditions</a>
              </label>
            </div>

            <button type="submit" className="btn btn-dark w-100">Sign In</button>

            <div className="d-flex justify-content-between align-items-center mt-4">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="subscribe" />
                <label className="form-check-label" htmlFor="subscribe">Subscribe me to newsletter</label>
              </div>
              <a href="#" className="text-decoration-none fw-medium">Forgot Password?</a>
            </div>

            <div className="mt-4">
              <button type="button" className="btn btn-outline-dark w-100 d-flex align-items-center justify-content-center gap-2">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHpAg-6XWQ3p2oojXLXkBLnMI5MviAt8ALYQ&s" alt="Google" width="20" />
                Sign in with Google
              </button>
            </div>

            <p className="text-center mt-4">
              Not registered? <Link to="/singup" className="fw-bold">Create account</Link>
            </p>
          </form>
        </div>

        <div className="col-lg-5 d-none d-lg-block">
          <img
            src="https://thumbs.dreamstime.com/b/shopping-online-vector-illustration-graphic-icons-47409696.jpg"
            alt="Pattern"
            className="img-fluid rounded-3"
          />
        </div>
      </div>
    </section>
  );
}

export default Signin;



