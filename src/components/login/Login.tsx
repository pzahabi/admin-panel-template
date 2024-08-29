import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseApiUrl } from "../../services/api";

interface MyError {
  response: {
    data: {
        message: string;
    }
  };
}

export const Login = () => {
  const userName = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [invalid, setInvalid] = React.useState(false);
  const [error, setError] = React.useState<MyError>();


  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setInvalid(false);
    const APIurl = `${baseApiUrl}/api/Users/authenticate?userName=${userName.current?.value}&password=${password.current?.value}`;
    const user = {
      username: userName.current?.value,
      password: password.current?.value,
    };
    await axios
      .post(APIurl, user)
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        navigate("/admin", { replace: true });
      })
      .catch((err) => {
        setInvalid(true);
        setError(err);
      });
  };
  return (
    <>
      <div className="login-background">
        <div className="login-box">
          <h2>Login</h2>
          <form>
            <div className="user-box">
              <input
                type="text"
                name="userName"
                required
                ref={userName}
                autoComplete="none"
              />
              <label>Username</label>
            </div>
            <div className="user-box">
              <input type="password" name="password" required ref={password} />
              <label>Password</label>
            </div>
            {invalid ? (
              <span className="text-danger ltr invalid-message">
                {error?.response.data.message}
              </span>
            ) : null}
            <button type="submit" onClick={(e) => login(e)}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
