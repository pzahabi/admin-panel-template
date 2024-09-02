import React from "react";
import axios from "axios";
import { baseApiUrl } from "../../services/api";
import { ProductEdit } from "./ProductEdit";
import { ProductSearch } from "./ProductSearch";
import { ProductInfo } from "./ProductInfo";
import ProductInt from "../../models/Product";
import CategoryInt from "../../models/Category";
import Product from "../../services/Product";
import Category from "../../services/Category";

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

  const [products, setProducts] = React.useState<ProductInt[]>([]);
  const [product, setProduct] = React.useState<ProductInt>(emptyProduct);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isUploading, setIsUploading] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState<number | null>(null);
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [categories, setCategories] = React.useState<CategoryInt[]>([]);

  const fetchProducts = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await Product.getAll(APIurl, searchQuery);
      setProducts(data);
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
  }, [APIurl, searchQuery]);

  const editProduct = (item: ProductInt) => {
    const temp = products.find(
      (q: ProductInt) => q.productId === item.productId
    );
    if (temp) {
      setProduct(temp);
      setIsEditing(temp.productId);
    }
  };

  const save = async (item: ProductInt) => {
    setIsEditing(null);
    setIsUploading(true);
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    try {
      if (item.productId) {
        await Product.update(APIurl, item);
      } else {
        try {
          const data = await Category.getAll(
            `${baseApiUrl}/api/CategoriesWithTokenAuth`
          );
          setCategories(data);
        } catch (error) {
          alert(error);
        }

        const thisCategory = categories.find(
          (category) => category.categoryName === item.categoryName
        );
        const categoryId = thisCategory?.categoryId;
        if (!categoryId) throw new Error("دسته بندی مورد نظر یافت نشد.");

        await Product.add(APIurl, item, categoryId);
      }
      fetchProducts();
    } catch (err) {
      alert(err);
    } finally {
      setIsUploading(false);
      setProduct(emptyProduct);
    }
  };

  const removeProduct = async (item: ProductInt) => {
    const thisProduct = products.find((q) => q.productId === item.productId);
    if (thisProduct) {
      const isConfirmed = window.confirm(
        "مطمئنی می خوای اینو از دیتابیس حذف کنی؟"
      );
      if (isConfirmed) {
        try {
          await Product.delete(APIurl, item);
          alert("حذف شد!");
          fetchProducts();
        } catch (err) {
          alert(err);
        }
      } else {
        alert("تغییرات اعمال نشد.");
      }
    } else {
      alert("محصول مورد نظر یافت نشد.");
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
