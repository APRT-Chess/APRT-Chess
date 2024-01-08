import { useState, FormEvent, useEffect } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import "../assets/login-page.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const signUpHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("new user signed up", user.email);
        if(user && user.email){
          localStorage.setItem("email", user.email);
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loginHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("User logged in:", user.email);
        if(user && user.email){
          localStorage.setItem("email", user.email);
          navigate("/");
        }     
       })
      .catch((err) => {
        console.log(err);
        setError('Invalid credentials')
      });
  };

 

  return (
    <div className="wrapper">
      <div className="card-switch">
        <label className="switch">
          <input type="checkbox" className="toggle" onClick={() => setError('')}/>
          <span className="slider"></span>
          <span className="card-side after:before:text-white"></span>
          <div className="flip-card__inner">
            <div className="flip-card__front">
              <div className="title text-white">Log in</div>
              <form className="flip-card__form" onSubmit={loginHandler}>
                <input
                  className="flip-card__input"
                  name="email"
                  placeholder="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  className="flip-card__input"
                  name="password"
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {error ? error : ''}
                <button className="flip-card__btn">Let's go!</button>
              </form>
            </div>
            <div className="flip-card__back">
              <div className="title text-white">Sign up</div>
              <form className="flip-card__form" onSubmit={signUpHandler}>
                <input
                  className="flip-card__input"
                  placeholder="Name"
                  type="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  className="flip-card__input"
                  name="email"
                  placeholder="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  className="flip-card__input"
                  name="password"
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button className="flip-card__btn">Confirm!</button>
              </form>
            </div>
          </div>
        </label>
      </div>
    </div>
  );
};

export default Login;
