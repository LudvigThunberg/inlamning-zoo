import axios from "axios";

export async function get<T>(url: string) {
  return await axios.get<T>(url);
}
