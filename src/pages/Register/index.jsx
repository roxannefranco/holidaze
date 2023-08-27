import { useEffect, useState } from "react";
import { apiUrl } from "../../configs/api";
import styles from "./styles.module.css";
import Input from "../../components/Input";
import Logo from "../../components/Logo";
import WelcomeImage from "../../components/Welcome Image";
import Button from "../../components/Button";

function Register() {
  return (
    <main>
      <div className={styles.loginWrapper}>
        {/* LEFT SIDE */}
        <WelcomeImage></WelcomeImage>
        {/* RIGHT SIDE */}
        <div className={styles.rightSide}>
          <div className={styles.loginLogo}>
            <Logo></Logo>
          </div>
          <div className={styles.loginContainer}>
            <form className={styles.loginForm}>
              <label className={styles.loginLabels}>Username</label>
              <Input icon="user" type="text" />
              <label className={styles.loginLabels}>Email</label>
              <Input icon="email" type="email" />
              <label className={styles.loginLabels}>Password</label>
              <Input icon="lock" type="password" />
              <label className={styles.loginLabels}>Avatar</label>
              <Input icon="media" type="text" />
            </form>
            <Button>Register</Button>
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
