import styles from "./styles.module.css";
import Input from "../../components/Input";
import Logo from "../../components/Logo";
import WelcomeImage from "../../components/Welcome Image";
import Button from "../../components/Button";
import { useState, useEffect } from "react";
import { authenticateUser } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

function Login() {
  const navigate = useNavigate();

  // State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    const result = await authenticateUser(email, password);

    if (result.errors != null) {
      setErrors(result.errors);
    } else {
      // get access token and user and save it on global state
      localStorage.setItem("token", result.accessToken);
      localStorage.setItem(
        "user",
        JSON.stringify({
          avatar: result.avatar,
          name: result.name,
          email: result.email,
          venueManager: result.venueManager,
        })
      );
      navigate("/admin/overview");
    }
  };

  return (
    <main>
      <Helmet>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Login" />
        <meta name="keywords" content="login, authenticate, authentication" />
        <meta name="author" content="Roxanne Franco" />
        <title>Login</title>
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

              {errors.length ? (
                <div className="error-message">
                  {errors.map((error) => {
                    return error.message;
                  })}
                </div>
              ) : null}

              <Button size="lg" block>
                Log in
              </Button>
            </form>
            <div className={styles.signUp}>
              <span>Don't have an account?</span>
              <a href="/register">Sign up here</a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Login;
