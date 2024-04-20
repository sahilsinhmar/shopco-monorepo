import axios from "axios";
import { Platform } from "react-native";

const baseURL =
  Platform.OS === "web"
    ? process.env.EXPO_PUBLIC_WEB_URI
    : process.env.EXPO_PUBLIC_BASE_URI;

const axiosInstance = axios.create({
  baseURL,
});

export default axiosInstance;
