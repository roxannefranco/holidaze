import { apiUrl } from "../configs/api";
import { countries } from "../configs/countries";

export async function newVenue(
  name,
  description,
  media,
  price,
  maxGuests,
  wifi,
  parking,
  breakfast,
  pets,
  address,
  city,
  zip,
  country,
  latitude,
  longitude
) {
  try {
    const body = {
      name: name,
      description: description,
      media: media.filter((m) => m.length > 0),
      price: parseFloat(price),
      maxGuests: parseInt(maxGuests),
      meta: {
        wifi: wifi,
        parking: parking,
        breakfast: breakfast,
        pets: pets,
      },
      location: {
        address: address,
        city: city,
        zip: zip,
        country: country,
        continent: countries[country],
        lat: latitude.length ? parseFloat(latitude) : 0,
        lng: longitude.length ? parseFloat(longitude) : 0,
      },
    };

    const accessToken = localStorage.getItem("token");
    const response = await fetch(`${apiUrl}/venues`, {
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
