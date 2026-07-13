import client from "../axiosClient";

export async function getPostsByUser(userId) {
  const { data } = await client.get("/posts", { params: { userId } });
  return data;
}