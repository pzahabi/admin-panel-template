import React, { useEffect, useState } from 'react';
import UserInt from '../models/User';
import User from '../services/User';
import Category from '../services/Category';
import { baseApiUrl } from '../services/api';
import CategoryInt from '../models/Category';
import Product from '../services/Product';
import ProductInt from '../models/Product';

const Dashboard = () => {
  const [users, setUsers] = useState<UserInt[]>([]);
  const [categories, setCategories] = useState<CategoryInt[]>([]);
  const [products, setProducts] = useState<ProductInt[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const userData = await User.getAll("/api/Users/GetAll");
      setUsers(userData);

      const categoryData = await Category.getAll(`${baseApiUrl}/api/CategoriesWithTokenAuth`);
      setCategories(categoryData);

      const productData = await Product.getAll(`${baseApiUrl}/api/ProductsControllerWithTokenAuth`, "");
      setProducts(productData);
    } catch (err) {
      alert(err);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="container-fluid mt-3">
      <div className="row">
        <div className="col-lg-3 col-md-6 mb-4">
          <div className="card bg-primary text-white">
            <div className="card-body">کاربران: {users.length}</div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 mb-4">
          <div className="card bg-success text-white">
            <div className="card-body">دسته بندی: {categories.length}</div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 mb-4">
          <div className="card bg-warning text-white">
            <div className="card-body">محصولات: {products.length}</div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 mb-4">
          <div className="card bg-danger text-white">
            <div className="card-body">آمار</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
