import { apiUrl } from "../configs/api";

export async function updateMedia(url, username) {
  try {
    const body = {
      avatar: url,
    };

    const accessToken = localStorage.getItem("token");
    const response = await fetch(`${apiUrl}/profiles/${username}/media`, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
}

export async function updateManager(manager, username) {
  try {
    const body = {
      venueManager: manager,
    };

    const accessToken = localStorage.getItem("token");
    const response = await fetch(`${apiUrl}/profiles/${username}`, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
}
