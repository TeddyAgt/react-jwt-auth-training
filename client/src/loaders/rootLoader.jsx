import { getCurrentUser } from "../API/auth";

export async function rootLoader() {
  return getCurrentUser();
}
