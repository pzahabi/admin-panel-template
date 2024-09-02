import axios from "axios";
import { baseApiUrl } from "./api";
import UserInt from "../models/User";

export default class User {
    static async getAll(path: string) {
       const response = await axios
      .get<UserInt[]>(`${baseApiUrl}${path}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      return response.data;
    }
}