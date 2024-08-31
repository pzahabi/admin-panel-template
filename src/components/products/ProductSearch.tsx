import React from "react";
import { useForm } from "react-hook-form";

interface Props {
  onSearch: (query: string) => void;
}

interface SearchForm {
  searchQuery: string;
}

export const ProductSearch = ({ onSearch }: Props) => {
  const { register, handleSubmit, reset } = useForm<SearchForm>();

  const onSubmit = (data: SearchForm) => {
    onSearch(data.searchQuery);
  };

  return (
    <form dir="ltr" onSubmit={handleSubmit(onSubmit)} className="mb-4">
      <div className="input-group">
        <input
          {...register("searchQuery")}
          dir="rtl"
          type="text"
          className="form-control"
          placeholder="جستجو بر اساس نام دسته بندی یا تامین کننده"
        />
        <button className="btn btn-outline-secondary" type="submit">
          جستجو
        </button>
      </div>
    </form>
  );
};
