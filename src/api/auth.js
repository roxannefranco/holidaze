import { apiUrl } from "../configs/api";

export async function authenticateUser(email, password) {
  try {
    const body = {
      email: email,
      password: password,
    };

    const response = await fetch(`${apiUrl}/auth/login`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
}
