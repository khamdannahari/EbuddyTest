import axios from "axios";
import { User } from "../../../packages/shared/entities/user";
import { signInWithCustomToken } from "firebase/auth";
import { auth } from "../config/firebaseConfig";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const login = async (email: string, password: string) => {
  try {
    const response = await apiClient.post("/login", {
      email,
      password,
    });

    const { customToken } = response.data?.data;

    const userCredential = await signInWithCustomToken(auth, customToken);
    const token = await userCredential.user.getIdToken();
    await apiClient.post(
      "/generate-user-data",
      { count: 15 },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return {
      email,
      token,
    };
  } catch (error: any) {
    console.log("error", error.toString());
    throw new Error(error.response?.data?.error?.message || "Login failed");
  }
};

export const fetchUsers = async (token: string, lastDoc?: User | null) => {
  try {
    const response = await apiClient.get("/fetch-user-data", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: lastDoc ? { lastDoc: JSON.stringify(lastDoc) } : undefined,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch users");
  }
};
