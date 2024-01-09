import { useState, FormEvent, Dispatch } from "react";
import { auth } from "../firebase";
import {
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import "../assets/login-page.css";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";

interface props{
  playerEmail: string;
  setPlayerEmail: React.Dispatch<React.SetStateAction<string>>; 
}

const Login = ({playerEmail, setPlayerEmail}: props) => {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  async function hash(password: string) {
    try {
      const salt = await bcrypt.genSalt(10);
      return await bcrypt.hash(password, salt);
    } catch (e) {
      console.error("error hashing passwords", e);
      setError("error hashing password");
      throw e;
    }
  }

  const signUpHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, playerEmail, password)
      .then(async (userCredential: UserCredential) => {
        const user = userCredential.user;
        console.log("new user signed up", user.email);
        if (user && user.email) {
          sessionStorage.setItem("email", await hash(user.email));
          navigate("/");
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  const loginHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, playerEmail, password)
      .then(async (userCredential: UserCredential) => {
        const user = userCredential.user;
        console.log("User logged in:", user.email);
        if (user && user.email) {
          sessionStorage.setItem("email", await hash(user.email));
          navigate("/");
        }
      })
      .catch((err: any) => {
        console.log(err);
        setError("Invalid credentials");
      });
  };

  return (
    <div className="wrapper">
      <div className="card-switch">
        <label className="switch">
          <input
            type="checkbox"
            className="toggle"
            onClick={() => setError("")}
          />
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
                  value={playerEmail}
                  onChange={(e) => setPlayerEmail(e.target.value)}
                />
                <input
                  className="flip-card__input"
                  name="password"
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {error ? error : ""}
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
                  value={playerEmail}
                  onChange={(e) => setPlayerEmail(e.target.value)}
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
