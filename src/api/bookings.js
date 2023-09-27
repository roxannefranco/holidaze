import { apiUrl } from "../configs/api";

export async function getBooking(id) {
  try {
    const accessToken = localStorage.getItem("token");
    const response = await fetch(`${apiUrl}/bookings/${id}?_customer=true`, {
      method: "GET",
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
