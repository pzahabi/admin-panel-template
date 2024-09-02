import axios from "axios";
import CategoryInt from "../models/Category";

export default class Category {
    static async getAll(path: string) {
        const response = await axios
       .get<CategoryInt[]>(path, {
         headers: {
           Authorization: `Bearer ${localStorage.getItem("token")}`,
         },
       })
       return response.data;
     }

     static async add(path: string, item: CategoryInt) {
        const response = await axios
        .post<CategoryInt>(
          path,
          { categoryName: item.categoryName, description: item.description },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        return response.data;
     }

     static async update(path: string, categoryId: number, item: CategoryInt) {
        const response = await axios
        .put<CategoryInt>(`${path}/${categoryId}`, item, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        return response.data;
     }

     static async delete(path: string, item: CategoryInt) {
        await axios.delete(`${path}/${item.categoryId}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
     }
}