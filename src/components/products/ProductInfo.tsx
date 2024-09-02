import React, { useState } from "react";
import { Table, Spinner, Pagination } from "react-bootstrap";
import ProductInt from "../../models/Product";

interface Props {
  products: ProductInt[];
  isLoading: boolean;
  isEditing: number | null;
  editProduct: (item: ProductInt) => void;
  removeProduct: (item: ProductInt) => void;
  cancel: () => void;
}

export const ProductInfo = ({
  products,
  isLoading,
  isEditing,
  editProduct,
  removeProduct,
  cancel,
}: Props) => {
  const itemsPerPage = 20;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const renderPaginationItems = () => {
    const pages = [];

    if (currentPage > 1) {
      pages.push(
        <Pagination.Item key={currentPage - 1} onClick={() => handlePageClick(currentPage - 1)}>
          {currentPage - 1}
        </Pagination.Item>
      );
    }


    pages.push(
      <Pagination.Item key={currentPage} active>
        {currentPage}
      </Pagination.Item>
    );

    if (currentPage < totalPages) {
      pages.push(
        <Pagination.Item key={currentPage + 1} onClick={() => handlePageClick(currentPage + 1)}>
          {currentPage + 1}
        </Pagination.Item>
      );
    }

    return pages;
  };

  return (
    <>
      {isLoading ? (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm text-center" dir="rtl">
            <thead>
              <tr>
                <th>نام محصول</th>
                <th>قیمت واحد</th>
                <th>دسته بندی</th>
                <th>تامین کننده</th>
                <th>عملیات</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item) => (
                <tr key={item.productId}>
                  <td>{item.productName}</td>
                  <td>{item.unitPrice}</td>
                  <td>{item.categoryName}</td>
                  <td>{item.supplierName}</td>
                  <td className="d-flex">
                    {isEditing === item.productId ? (
                      <button className="btn btn-sm btn-outline-primary" onClick={cancel}>
                        لغو
                      </button>
                    ) : (
                      <>
                        <button className="btn btn-sm btn-outline-primary ms-2" onClick={() => editProduct(item)}>
                          ویرایش
                        </button>
                        <button className="btn btn-sm btn-outline-primary" onClick={() => removeProduct(item)}>
                          حذف
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {products.length > itemsPerPage && (
            <Pagination className="justify-content-center mt-4">
              <Pagination.Prev onClick={handlePrevPage} disabled={currentPage === 1} />
              {renderPaginationItems()}
              <Pagination.Next onClick={handleNextPage} disabled={currentPage === totalPages} />
            </Pagination>
          )}
        </>
      )}
    </>
  );
};
