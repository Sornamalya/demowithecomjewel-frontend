import React,{useState} from "react";
import { Link, Outlet, useNavigate } from "react-router";
import Logo3 from "./images/logo3.png"
import Home from "./navbar1/Home";


function Login() {

   const [email, setEmail] = useState("");
     const [password, setPassword] = useState("");
     const [error, setError] = useState("");
       const navigate = useNavigate();
     const [user, setUser] = useState(() => {
       const saved = localStorage.getItem("user");
       return saved ? JSON.parse(saved) : null;
     });
   
     const handleSubmit = async (e) => {
       e.preventDefault();
   
       try {
         const res = await fetch("https://demowithecomjewel-backend.onrender.com/api/users/login", {
           method: "POST",
           headers: { "Content-Type": "application/json" },
           body: JSON.stringify({ email, password }),
         });
   
         if (res.ok) {
           const loggedInUser = await res.json();
           setUser(loggedInUser);
           localStorage.setItem("user", JSON.stringify(loggedInUser));
           navigate('/')
         } else {
           const err = await res.json();
           setError(err.error || "Login failed");
         }
       } catch {
         setError("Something went wrong");
       }
     };
   
    //  const handleLogout = () => {
    //    localStorage.removeItem("user");
    //    setUser(null);
    //  };
   

  return (
    <div >
     
       
       <div className="form">

   <div className="formcard">
    <div className="imglogo" style={{backgroundColor:"aqa",textAlign:"center"}}>
      <Link to="/" ><img id="logo" src={Logo3} alt="" width="100px" /> </Link>

    </div>
     
         <h1 style={{textAlign:"cener",fontWeight:"bold"}}>Sign In</h1>
           {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
      
          <label htmlFor="" >Email</label><br />
        <input
          type="email"
          name="email"
          placeholder="Enter Your Email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        
      
         <label htmlFor="" >Password</label><br />
        <input
          type="password"
          name="password"
          placeholder="Enter Your Password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />       
           
    <div className="formbtn"> <button type="submit">Sign In</button></div>
        {/* {error && <p style={{ color: "red" }}>{error}</p>} */}
      </form>
      
      <p style={{marginTop:"20px"}}>Don't have an account? &nbsp;
        <Link to="/registerpage" style={{textDecoration:"none",fontSize:"23px",}}>Register</Link></p>
      
                </div>
            </div>
    
            
        </div>
       
    
  
  ); 
}

export default Login;