import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { apiUrl } from "../../configs/api";
import styles from "./styles.module.css";
import { useAtom } from "jotai";
import { userAtom } from "../../atoms/auth";
import Header from "../../components/Header";

function Home() {
  const [user, setUser] = useAtom(userAtom);

  // Resets authenticated vales in local storage
  const logOut = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <Layout>
      <Header></Header>
      <h1>hello home</h1>
      {user != null ? <button onClick={logOut}>log out</button> : null}
    </Layout>
  );
}

export default Home;
