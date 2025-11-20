import React, { useState } from "react";
import { Link, Outlet ,useNavigate} from "react-router";
import Logo3 from "./images/logo3.png"
import Home from "./navbar1/Home";


function Register() {
  const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(() => {
      const saved = localStorage.getItem("user");
      return saved ? JSON.parse(saved) : null;
    });
  
    const handleRegister = async (e) => {
      e.preventDefault();
      const res = await fetch("https://demowithecomjewel-backend.onrender.com/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });
  
      if (res.ok) {
        const data = await res.json();
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
        alert("Registration successful!");
        navigate('/')
      } else {
        alert("Registration failed. Try again.");
      }
    };
  
    const handleLogout = () => {
      setUser(null);
      localStorage.removeItem("user");
    };
  
    if (user) {
      return (
        <div>
          {/* <h2>Welcome, {user.username}</h2>
          <button onClick={handleLogout}>Logout</button> */}
          {/* <ProductListingComp /> */}
          <Home />
        </div>
      );
    }

  return (
    <div>
        <div className="form">
             <div className="formcard">
              <div className="imglogo" style={{backgroundColor:"aqa",textAlign:"center"}}>
                    <Link to="/" ><img id="logo" src={Logo3} alt="" width="100px" /> </Link>
              
                  </div>
                  
                 <h1 style={{textAlign:"cener",fontWeight:"bold"}}>Register</h1>
                   {/* {error && <p style={{ color: "red" }}>{error}</p>} */}
      <form onSubmit={handleRegister}>

        <label htmlFor="">Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter Your Name..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <br />
         <label htmlFor="">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter Your Email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
         <label htmlFor="">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter Your Password..."
          value={password }
          onChange={(e) => setPassword(e.target.value)}
          required
        />
       <div className="formbtn">
         <button type="submit">Register</button>
       </div>
       
      </form>
       <p style={{marginTop:"20px"}}>Already have an account? &nbsp;
        <Link to="/loginpage" style={{textDecoration:"none",fontSize:"23px"}}>Sign In</Link></p>
      {/* <p>{error}</p> */}

             </div>

        </div>
       
     
    </div>
  );
}

export default Register;
