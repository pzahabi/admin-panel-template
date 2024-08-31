import React from "react";
import axios from "axios";
import { baseApiUrl } from "../../services/api";
import { ProductEdit } from "./ProductEdit";
import { ProductSearch } from "./ProductSearch";
import { ProductInfo } from "./ProductInfo";
import Product from "../../models/Product";
import Category from "../../models/Category";

export const Products = () => {
  const APIurl = `${baseApiUrl}/api/ProductsControllerWithTokenAuth`;

  const emptyProduct = {
    productId: 0,
    productName: "",
    unitPrice: 0,
    categoryId: 0,
    categoryName: "",
    supplierId: 0,
    supplierName: "",
  };

  const [products, setProducts] = React.useState<Product[]>([]);
  const [product, setProduct] = React.useState<Product>(emptyProduct);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isUploading, setIsUploading] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState<number | null>(null);
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [categories, setCategories] = React.useState<Category[]>([]);

  const fetchProducts = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(APIurl, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: {
          search: searchQuery,
        },
      });
      setProducts(response.data);
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
  }, [APIurl, searchQuery]);

  const editProduct = (item: Product) => {
    const temp = products.find((q: Product) => q.productId === item.productId);
    if (temp) {
      setProduct(temp);
      setIsEditing(temp.productId);
    }
  };

  const save = async (item: Product) => {
    setIsEditing(null);
    setIsUploading(true);
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    try {
      if (item.productId) {
        await axios.put(`${APIurl}/${item.productId}`, item, { headers });
      } else {
        await axios
          .get(`${baseApiUrl}/api/CategoriesWithTokenAuth`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((result) => {
            setCategories(result.data);
          })
          .catch((error) => {
            alert(error);
          });

        const categoryId = categories.findIndex(
          (category) => category.categoryName === item.categoryName
        );
        if (!categoryId) throw new Error("دسته بندی مورد نظر یافت نشد.");
        const thisProduct = {
          productName: item.productName,
          unitPrice: item.unitPrice,
          categoryId: categoryId,
          supplierId: 1,
        };

        await axios.post(APIurl, thisProduct, { headers });
      }
      fetchProducts();
    } catch (err) {
      console.log(err);
    } finally {
      setIsUploading(false);
      setProduct(emptyProduct);
    }
  };

  const removeProduct = async (item: Product) => {
    const thisProduct = products.find((q) => q.productId === item.productId);
    if (thisProduct) {
      const isConfirmed = window.confirm(
        "مطمئنی می خوای اینو از دیتابیس حذف کنی؟"
      );
      if (isConfirmed) {
        try {
          await axios.delete(`${APIurl}/${item.productId}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          alert("حذف شد!");
          fetchProducts();
        } catch (err) {
          alert(`Changes are not saved. ${err}`);
        }
      } else {
        alert("Changes are not saved.");
      }
    } else {
      alert("Product not found.");
    }
  };

  const cancel = () => {
    setIsEditing(null);
    setProduct(emptyProduct);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  React.useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <>
      <div className="container-fluid row mb-4">
        <div className="col-md-12 m-2 mb-4 pb-4">
          <main className="container border border-dark rounded mt-4 mb-4">
            <div className="row bg-light rounded-top p-2">لیست محصولات</div>
            <div className="d-flex flex-row-reverse row p-4">
              <section className="col-md-4">
                <ProductEdit
                  product={product}
                  save={save}
                  isUploading={isUploading}
                />
              </section>
              <section className="col-md-8">
                <ProductSearch onSearch={handleSearch} />
                <ProductInfo
                  products={products}
                  isLoading={isLoading}
                  editProduct={editProduct}
                  removeProduct={removeProduct}
                  isEditing={isEditing}
                  cancel={cancel}
                />
              </section>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};
