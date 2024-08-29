import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseApiUrl } from "../services/api";
import { Table } from "react-bootstrap";

interface UserInt {
  firstName: string;
  lastName: string;
  username: string;
  id: number;
}

export const Users = () => {
  const [users, setUsers] = useState<UserInt[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const getUsers = async () => {
    setIsLoading(true);
    await axios
      .get(`${baseApiUrl}/api/Users/GetAll`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => setUsers(response.data))
      .catch((err) => alert(err))
      .finally(() => setIsLoading(false));
  };
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <div className="container-fluid mt-3">
        <div className="row">
          <Table striped bordered hover responsive className="shadow-sm">
            <thead className="thead-dark">
              <tr>
                <th>ID</th>
                <th>نام</th>
                <th>نام خانوادگی</th>
                <th>Username</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? 
              <div className="p-3 d-flex">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <div>در حال دریافت اطلاعات...</div>
              </div>
              : users.length === 0 ? <div>کاربری یافت نشد.</div>
              : users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.username}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};
