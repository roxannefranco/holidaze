import { useEffect, useState } from "react";
import { apiUrl } from "../../configs/api";
import styles from "./styles.module.css";
import Input from "../../components/Input";
import Icon from "../../components/Icon";
import Logo from "../../components/Logo";
import WelcomeImage from "../../components/Welcome Image";

function Login() {
  return (
    <main className={styles.main}>
      {/* LEFT SIDE */}
      <div>
        <WelcomeImage></WelcomeImage>
      </div>

      {/* RIGHT SIDE */}
      <div>
        <Logo></Logo>
        <form>
          <label>Email</label>
          <Input icon="email" type="email" />
          <label>Password</label>
          <Input icon="lock" type="password" />
        </form>
      </div>
    </main>
  );
}

export default Login;
