import React, { useState } from "react";
import Header from '../Header/Header';

const Register = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const gohome = () => {
    window.location.href = window.location.origin;
  };

  const register = async (e) => {
    e.preventDefault();
    let register_url = window.location.origin + "/djangoapp/register";
    const res = await fetch(register_url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        "userName": userName,
        "password": password,
        "firstName": firstName,
        "lastName": lastName,
        "email": email
      }),
    });
    const json = await res.json();
    if (json.status) {
      sessionStorage.setItem('username', json.userName);
      window.location.href = window.location.origin;
    } else if (json.error === "Already Registered") {
      alert("The user with same username is already registered");
      window.location.href = window.location.origin;
    }
  };

  return (
    <div>
      <Header />
      <div className="register_container" style={{ width: "50%", margin: "40px auto" }}>
        <div className="header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 className="text">Sign Up</h2>
          <a href="/" onClick={() => { gohome(); }}>X</a>
        </div>
        <hr />
        <form onSubmit={register}>
          <div className="inputs">
            <div className="input mb-3">
              <input type="text" name="username" placeholder="Username" className="form-control input_field"
                onChange={(e) => setUserName(e.target.value)} required />
            </div>
            <div className="input mb-3">
              <input type="text" name="first_name" placeholder="First Name" className="form-control input_field"
                onChange={(e) => setFirstName(e.target.value)} required />
            </div>
            <div className="input mb-3">
              <input type="text" name="last_name" placeholder="Last Name" className="form-control input_field"
                onChange={(e) => setLastName(e.target.value)} required />
            </div>
            <div className="input mb-3">
              <input type="email" name="email" placeholder="Email" className="form-control input_field"
                onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="input mb-3">
              <input type="password" name="psw" placeholder="Password" className="form-control input_field"
                onChange={(e) => setPassword(e.target.value)} required />
            </div>
          </div>
          <div className="submit_panel">
            <input className="btn btn-primary submit" type="submit" value="Register" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
