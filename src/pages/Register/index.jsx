import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import Input from "../../components/Input";
import Logo from "../../components/Logo";
import WelcomeImage from "../../components/Welcome Image";
import Button from "../../components/Button";
import { registerUser } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import Checkbox from "../../components/Checkbox";
import { Helmet } from "react-helmet";

function Register() {
  const navigate = useNavigate();
  // State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [errors, setErrors] = useState([]);

  // Check if user is logged in
  useEffect(() => {
    const accessToken = localStorage.getItem("token");
    if (accessToken != null) {
      return navigate("/");
    }
  }, []);

  /**
   * Handle the form and submit to API
   */
  const submitForm = async (e) => {
    e.preventDefault();

    setErrors([]);

    // Authenticate user in API
    const result = await registerUser(email, password, name, avatar);

    if (result.errors != null) {
      setErrors(result.errors);
    } else {
      navigate("/login");
    }
  };

  return (
    <main>
      <Helmet>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Register" />
        <meta name="keywords" content="register, registration, sign up" />
        <meta name="author" content="Roxanne Franco" />
        <title>Register</title>
      </Helmet>
      <div className={styles.loginWrapper}>
        {/* LEFT SIDE */}
        <WelcomeImage></WelcomeImage>
        {/* RIGHT SIDE */}
        <div className={styles.rightSide}>
          <div className={styles.loginLogo}>
            <Logo></Logo>
          </div>
          <div className={styles.loginContainer}>
            <form className={styles.loginForm} onSubmit={submitForm}>
              <Input
                icon="user"
                type="text"
                label="Username"
                value={name}
                setValue={setName}
              />
              <Input
                icon="email"
                type="email"
                label="Email"
                value={email}
                setValue={setEmail}
              />
              <Input
                icon="lock"
                type="password"
                label="Password"
                value={password}
                setValue={setPassword}
              />

              <Input
                icon="media"
                type="text"
                label="Avatar"
                value={avatar}
                setValue={setAvatar}
              />
              {errors.length ? (
                <div className="error-message">
                  {errors.map((error) => {
                    return error.message;
                  })}
                </div>
              ) : null}
              <div className={styles.checkContainer}>
                <Checkbox id="hostBox" label="Host my own Venues" />
              </div>

              <Button size="lg" block>
                Register
              </Button>
            </form>
            <div className={styles.signUp}>
              <span>Already have an account?</span>
              <a href="/login">Login here</a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Register;
