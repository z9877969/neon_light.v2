import axios from "axios";

axios.defaults.baseURL = "https://neonlight.onrender.com/";

export async function addOrder(formData) {
  try {
    const response = await axios.post("orders", formData);
    console.log(response);
    return response.data.results;
  } catch (error) {
    console.error("Помилка:", error);
    throw error;
  }
}
