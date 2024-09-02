import React from "react";
import { useForm } from "react-hook-form";
import ProductInt from "../../models/Product";

interface Props {
  product: ProductInt;
  save: (item: ProductInt) => void;
  isUploading: boolean;
}

export const ProductEdit = ({ product, save, isUploading }: Props) => {
  const { register, handleSubmit, reset } = useForm<ProductInt>({
    defaultValues: product,
  });

  React.useEffect(() => {
    reset(product);
  }, [product, reset]);

  const onSubmit = (data: ProductInt) => {
    save(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" {...register("productId")} />
        <div className="m-2">
          <label htmlFor="productName" className="form-label">
            نام محصول:
          </label>
          <input {...register("productName")} className="form-control" />
        </div>
        <div className="m-2">
          <label htmlFor="unitPrice" className="form-label">
            قیمت واحد:
          </label>
          <input type="number" {...register("unitPrice")} className="form-control" />
        </div>
        <div className="m-2">
          <label htmlFor="categoryName" className="form-label">
            دسته بندی:
          </label>
          <input {...register("categoryName")} className="form-control" />
        </div>
        <div className="m-2">
          <label htmlFor="supplierName" className="form-label">
            تامین کننده:
          </label>
          <input {...register("supplierName")} className="form-control" />
        </div>
        <div className="m-4 me-2">
          <button
            disabled={isUploading}
            type="submit"
            className="btn btn-primary"
          >
            ذخیره
          </button>
        </div>
      </form>
    </>
  );
};
