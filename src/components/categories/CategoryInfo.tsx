import React, { useState } from "react";
import Category from "../../models/Category";
import { Table, Spinner, Pagination } from "react-bootstrap";

interface Props {
  categories: Category[];
  isLoading: boolean;
  isEditing: number | null;
  editCategory: (item: Category) => void;
  removeCategory: (item: Category) => void;
  cancel: (item: Category) => void;
}

export const CategoryInfo = ({
  categories,
  isLoading,
  isEditing,
  editCategory,
  removeCategory,
  cancel,
}: Props) => {
  const itemsPerPage = 20;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = categories.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(categories.length / itemsPerPage);

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
      <Pagination.Item active key={currentPage}>
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
      <div className="container d-flex flex-column justify-content-between mb-2">
        <Table striped bordered hover responsive className="shadow-sm text-end" dir="rtl">
          <thead className="thead-dark">
            <tr>
              <th>ID</th>
              <th>نام دسته‌بندی</th>
              <th>توضیحات</th>
              <th>اقدامات</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={4} className="text-center">
                  <div className="d-flex justify-content-center align-items-center">
                    <Spinner animation="border" variant="primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                    <span className="ms-2">در حال دریافت اطلاعات...</span>
                  </div>
                </td>
              </tr>
            ) : currentItems.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center">
                  دسته‌بندی‌ای یافت نشد.
                </td>
              </tr>
            ) : (
              currentItems.map((item) => (
                <tr key={item.categoryId}>
                  <td>{item.categoryId}</td>
                  <td>{item.categoryName}</td>
                  <td>{item.description}</td>
                  <td className="d-flex justify-content-end">
                    <button
                      onClick={() => removeCategory(item)}
                      className="btn btn-sm btn-outline-primary ms-1"
                    >
                      حذف
                    </button>
                    <button
                      onClick={() => editCategory(item)}
                      className="btn btn-sm btn-outline-primary"
                    >
                      ویرایش
                    </button>
                    {item.categoryId === isEditing ? (
                      <button
                        onClick={() => cancel(item)}
                        className="btn btn-sm btn-outline-primary me-1"
                      >
                        لغو
                      </button>
                    ) : null}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
        <Pagination className="justify-content-center">
          <Pagination.Prev onClick={handlePrevPage} disabled={currentPage === 1}>
            قبلی
          </Pagination.Prev>
          {renderPaginationItems()}
          <Pagination.Next onClick={handleNextPage} disabled={currentPage === totalPages}>
            بعدی
          </Pagination.Next>
        </Pagination>
      </div>
    </>
  );
};
