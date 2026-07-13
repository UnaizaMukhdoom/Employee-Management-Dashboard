import client from "../axiosClient";

export async function getEmployees() {
  const { data } = await client.get("/users");
  return data;
}