import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getVenue } from "../api/venues";

const VenueAccess = (props) => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [hasAccess, setAccess] = useState(false);

  useEffect(() => {
    if (id) {
      checkOwnership();
    }
  }, [id]);

  const checkOwnership = async () => {
    const result = await getVenue(id);
    const userStorage = localStorage.getItem("user");
    const user = JSON.parse(userStorage);

    if (result.owner.email === user.email) {
      setAccess(true);
    } else {
      return navigate("/admin/overview");
    }
  };

  return <React.Fragment>{hasAccess ? props.children : null}</React.Fragment>;
};
export default VenueAccess;
