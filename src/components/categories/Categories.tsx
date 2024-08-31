import React from "react";
import axios from "axios";
import { baseApiUrl } from "../../services/api";
import Category from "../../models/Category";
import { CategoryInfo } from "./CategoryInfo";
import { CategoryEdit } from "./CategoryEdit";

export const Categories = () => {
  const APIurl = `${baseApiUrl}/api/CategoriesWithTokenAuth`;

  const emptyCategory = {
    categoryId: null,
    categoryName: "",
    description: "",
  };
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [category, setCategory] = React.useState<Category>(emptyCategory);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isUploading, setIsUploading] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState<number | null>(null);

  const fetchCategories = React.useCallback(async () => {
    setIsLoading(true);
    await axios
      .get(APIurl, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((result) => setCategories(result.data))

      .catch((error) => {
        alert(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const editCategory = (item: Category) => {
    const temp: Category | undefined = categories.find(
      (q: Category) => q.categoryId === item.categoryId
    );
    if (temp) {
      setCategory(temp);
      setIsEditing(temp.categoryId);
    }
  };

  const save = async (item: Category, categoryId: number) => {
    setIsEditing(null);
    setIsUploading(true);
    if (categories.find((q) => q.categoryId === categoryId)) {
      await axios
        .put(`${APIurl}/${categoryId}`, item, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .catch((err) => {
          // return alert(err);
          console.log(err);
        })
        .finally(() => {
          setIsUploading(false);
        });
      fetchCategories();
    } else {
      await axios
        .post(
          APIurl,
          { categoryName: item.categoryName, description: item.description },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsUploading(false);
        });
      fetchCategories();
    }
  };

  const removeCategory = async (item: Category) => {
    const thisCategory = categories.find((q) => q.categoryId === item.categoryId);
    if (thisCategory) {
      // Show a confirmation dialog
      const isConfirmed = window.confirm(
        "مطمئنی می خوای اینو از دیتابیس حذف کنی؟"
      );

      if (isConfirmed) {
        // If confirmed, proceed with deletion
        const apiUrl = `${APIurl}/${item.categoryId}`;
        try {
          await axios.delete(apiUrl, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          // Show success message
          window.alert("حذف شد!");
          fetchCategories(); // Refresh the list after deletion
        } catch (err) {
          // Show error message
          window.alert(`Changes are not saved. ${err}`);
        }
      } else {
        // Show message if deletion is canceled
        window.alert("Changes are not saved.");
      }
    } else {
      // Show message if the product is not found
      window.alert("Category not found.");
    }
  };

  const cancel = (item: Category) => {
    setIsEditing(null);
    setCategory(emptyCategory);
  };

  React.useEffect(() => {
    fetchCategories();
  }, [fetchCategories, APIurl]);

  return (
    <>
      <div className="container-fluid row mb-4">
        <div className="col-md-12 m-2 mb-4 pb-4">
          <main className="container border border-dark rounded mt-4 mb-4">
            <div className="row bg-light rounded-top p-2">لیست دسته بندی محصولات</div>
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
