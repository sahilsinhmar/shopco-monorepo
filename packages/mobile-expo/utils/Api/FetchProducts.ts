import axios from "axios";
import { useAppSelector } from "../../redux/hooks";

const { token } = useAppSelector((state) => state.User);

export const fetchProducts = async () => {
  try {
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_BASE_URI}/api/v1/products`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.data;
    return data;
  } catch (error) {
    throw new Error("Network error");
  }
};
