import styles from "./styles.module.css";
import Header from "../../../components/Header";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Avatar from "../../../components/Avatar";
import Button from "../../../components/Button";
import Layout from "../../../components/Layout";
import Input from "../../../components/Input";
import Checkbox from "../../../components/Checkbox";
import { getUserVenues } from "../../../api/venues";
import { useNavigate } from "react-router-dom";
import { updateManager, updateMedia } from "../../../api/user";

function Account() {
  const navigate = useNavigate();

  // State
  const [user, setUser] = useState(null);
  const [avatar, setAvatar] = useState("");
  const [manager, setManager] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const userStorage = localStorage.getItem("user");
    if (userStorage == null) {
      setUser(false);
    } else {
      setUser(JSON.parse(userStorage));
    }
  }, []);

  useEffect(() => {
    if (user != null && user) {
      setAvatar(user.avatar);
      setManager(user.venueManager);
    }
  }, [user]);

  const goToOverview = () => {
    navigate("/admin/overview");
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    await updateMedia(avatar, user.name);
    await updateManager(manager, user.name);

    setSuccess(true);

    // Clone object: https://www.samanthaming.com/tidbits/70-3-ways-to-clone-objects/
    const userClone = { ...user };
    userClone.avatar = avatar;
    userClone.venueManager = manager;

    setUser(userClone);
    localStorage.setItem("user", JSON.stringify(userClone));

    // Hide after 5 seconds
    setTimeout(() => {
      setSuccess(false);
    }, 5000);
  };

  return (
    <Layout>
      <Helmet>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Account" />
        <meta name="keywords" content="account, manage, avatar, profile" />
        <meta name="author" content="Roxanne Franco" />
        <title>Account</title>
      </Helmet>
      <Header updatedUser={user}></Header>
      <div className="center-content">
        <div className={styles.container}>
          {/* Left side: Profile */}
          <div className={styles.profile}>
            {user != null && user ? (
              <div className={styles.profileWrapper}>
                <Avatar url={user.avatar} size="146px" />
                <div className={styles.userInfo}>
                  <div className={styles.name}>{user.name}</div>
                  <div className={styles.email}>{user.email}</div>
                </div>
              </div>
            ) : null}
          </div>

          {/* Right side: Venues and Bookings */}
          <div className={styles.formSide}>
            <h1 className={styles.mainTitle}>Account</h1>
            <form onSubmit={onSubmit}>
              <Input
                type="text"
                label="Avatar"
                placeholder="URL"
                value={avatar}
                setValue={setAvatar}
              />
              <Checkbox
                id="manager"
                label="I want to host my own venues"
                value={manager}
                setValue={setManager}
              ></Checkbox>

              {success ? (
                <div className="success-message">
                  Success! Account has been updated.
                </div>
              ) : null}

              <div className={styles.btns}>
                <Button size="lg" type="primary">
                  Save changes
                </Button>
                <Button size="lg" type="terciary" onClick={goToOverview}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Account;
