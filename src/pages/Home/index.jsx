import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { apiUrl } from "../../configs/api";
import styles from "./styles.module.css";
import { useAtom } from "jotai";
import { userAtom } from "../../atoms/auth";

function Home() {
  const [user, setUser] = useAtom(userAtom);

  // Resets authenticated vales in local storage
  const logOut = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <Layout>
      <h1>hello world</h1>
      {user != null ? <button onClick={logOut}>log out</button> : null}
    </Layout>
  );
}

export default Home;
