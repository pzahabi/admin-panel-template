import { useCallback, useState, useEffect } from "react";
import axios from "axios";
import { baseApiUrl } from "../../services/api";
import CategoryInt from "../../models/Category";
import { CategoryInfo } from "./CategoryInfo";
import { CategoryEdit } from "./CategoryEdit";
import Category from "../../services/Category";

export const Categories = () => {
  const APIurl = `${baseApiUrl}/api/CategoriesWithTokenAuth`;

  const emptyCategory = {
    categoryId: null,
    categoryName: "",
    description: "",
  };
  const [categories, setCategories] = useState<CategoryInt[]>([]);
  const [category, setCategory] = useState<CategoryInt>(emptyCategory);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [isEditing, setIsEditing] = useState<number | null>(null);

  const fetchCategories = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await Category.getAll(APIurl);
      setCategories(data);
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const editCategory = (item: CategoryInt) => {
    const temp: CategoryInt | undefined = categories.find(
      (q: CategoryInt) => q.categoryId === item.categoryId
    );
    if (temp) {
      setCategory(temp);
      setIsEditing(temp.categoryId);
    }
  };

  const save = async (item: CategoryInt, categoryId: number) => {
    setIsEditing(null);
    setIsUploading(true);
    if (categories.find((q) => q.categoryId === categoryId)) {
      try {
        await Category.update(APIurl, categoryId, item);
      } catch (err) {
        alert(err);
      } finally {
        setIsUploading(false);
      }
      fetchCategories();
    } else {
      try {
        await Category.add(APIurl, item);
      } catch (err) {
        alert(err);
      } finally {
        setIsUploading(false);
      }
      fetchCategories();
    }
  };

  const removeCategory = async (item: CategoryInt) => {
    const thisCategory = categories.find(
      (q) => q.categoryId === item.categoryId
    );
    if (thisCategory) {
      // Show a confirmation dialog
      const isConfirmed = window.confirm(
        "مطمئنی می خوای اینو از دیتابیس حذف کنی؟"
      );

      if (isConfirmed) {
        // If confirmed, proceed with deletion
        const apiUrl = `${APIurl}/${item.categoryId}`;
        try {
          await Category.delete(APIurl, item);
          // Show success message
          window.alert("حذف شد!");
          fetchCategories(); // Refresh the list after deletion
        } catch (err) {
          // Show error message
          alert(err);
        }
      } else {
        // Show message if deletion is canceled
        alert("تغییرات اعمال نشد.");
      }
    } else {
      // Show message if the product is not found
      alert("دسته بندی مورد نظر یافت نشد.");
    }
  };

  const cancel = (item: CategoryInt) => {
    setIsEditing(null);
    setCategory(emptyCategory);
  };

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories, APIurl]);

  return (
    <>
      <div className="container-fluid row mb-4">
        <div className="col-md-12 m-2 mb-4 pb-4">
          <main className="container border border-dark rounded mt-4 mb-4">
            <div className="row bg-light rounded-top p-2">
              لیست دسته بندی محصولات
            </div>
            <div className="d-flex flex-row-reverse row p-4">
              <section className="col-md-4">
                <CategoryEdit
                  categories={categories}
                  category={category}
                  save={save}
                  isUploading={isUploading}
                />
              </section>
              <section className="col-md-8">
                <CategoryInfo
                  categories={categories}
                  isLoading={isLoading}
                  editCategory={editCategory}
                  removeCategory={removeCategory}
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
