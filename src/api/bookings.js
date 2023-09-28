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

export async function newBooking(dateFrom, dateTo, guests, venueId) {
  try {
    const body = {
      dateFrom: dateFrom,
      dateTo: dateTo,
      guests: guests,
      venueId: venueId,
    };

    const accessToken = localStorage.getItem("token");
    const response = await fetch(`${apiUrl}/bookings`, {
      method: "POST",
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
