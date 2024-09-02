import axios from "axios";
import ProductInt from "../models/Product";

export default class Product {
    static async getAll(path: string, searchQuery: string) {
        const response = await axios
       .get<ProductInt[]>(path, {
         headers: {
           Authorization: `Bearer ${localStorage.getItem("token")}`,
         },
         params: {
            search: searchQuery,
          },
       })
       return response.data;
     }

     static async add(path: string, item: ProductInt, categoryId: number) {
        const response = await axios
        .post<ProductInt>(
          path,
          { 
            productName: item.productName,
            unitPrice: item.unitPrice,
            categoryId: categoryId,
            supplierId: 1,
           },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        return response.data;
     }

     static async update(path: string, item: ProductInt) {
        const response = await axios
        .put<ProductInt>(`${path}/${item.productId}`, item, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        return response.data;
     }

     static async delete(path: string, item: ProductInt) {
        await axios.delete(`${path}/${item.productId}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
     }
}