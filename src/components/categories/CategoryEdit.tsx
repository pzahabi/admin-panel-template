import React, { useRef } from "react";
import Category from "../../models/Category";

interface Props {
  categories: Category[];
  category: Category;
  save: (item: Category, categoryId: number) => void;
  isUploading: boolean;
}

export const CategoryEdit = ({
  categories,
  save,
  category,
  isUploading,
}: Props) => {
  const idRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (idRef.current)
      idRef.current.value =
        typeof category.categoryId === "number"
          ? category.categoryId.toString()
          : "";
    if (nameRef.current) nameRef.current.value = category.categoryName;
    if (descriptionRef.current)
      descriptionRef.current.value = category.description;
  }, [category]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    const categoryName = nameRef.current?.value || "";
    const description = descriptionRef.current?.value || "";

    const categoryId = parseInt(idRef.current?.value || "");

    const thisCategory = {
      categoryId,
      categoryName,
      description,
    };

    save(thisCategory, categoryId);

    if (idRef.current) idRef.current.value = "";
    if (nameRef.current) nameRef.current.value = "";
    if (descriptionRef.current) descriptionRef.current.value = "";
  };
  return (
    <>
      <form>
        <input type="hidden" name="id" ref={idRef} />
        <div className="m-2">
          <label htmlFor="name" className="form-label">
            دسته بندی:
          </label>
          <input
            name="name"
            className="form-control"
            ref={nameRef}
            type="text"
          />
        </div>
        <div className="m-2">
          <label htmlFor="description" className="form-label">
            توضیحات:
          </label>
          <input
            name="description"
            className="form-control"
            ref={descriptionRef}
            type="text"
          />
        </div>
        <div className="m-4 me-2">
          <button
            disabled={isUploading ? true : false}
            className="btn btn-primary"
            onClick={(e) => submit(e)}
          >
            ذخیره
          </button>
        </div>
      </form>
    </>
  );
};
