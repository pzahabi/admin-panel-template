import React, { useEffect, useState } from "react";
import UserInt from "../models/User";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import axios from "axios";
import { baseApiUrl } from "../services/api";

export const Profile = () => {
  const [user, setUser] = useState<UserInt>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getUser = async () => {
    setIsLoading(true);
    await axios
      .get(`${baseApiUrl}/api/Users/GetById/${localStorage.getItem("userId")}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => setUser(response.data))
      .catch((err) => alert(err))
      .finally(() => setIsLoading(false));
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <>
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            {isLoading ? (
              <div className="p-3 d-flex">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <div>در حال دریافت اطلاعات...</div>
              </div>
            ) : !user ? (
              <div>کاربر مورد نظر یافت نشد.</div>
            ) : (
              <Card className="shadow-sm">
                <Card.Body className="text-center">
                  <div className="profile-img mb-4">
                    <img
                      src="https://pooyazahabi.com/img/personally-square.webp"
                      alt={`${user?.firstName} ${user?.lastName}`}
                      className="rounded-circle"
                      style={{
                        width: "150px",
                        height: "150px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <h3 className="mb-2">{`${user?.firstName} ${user?.lastName}`}</h3>
                  <p dir="ltr" className="text-muted">@{user?.username}</p>
                  <Button variant="primary" className="mt-3">
                    ویرایش
                  </Button>
                  <Button variant="outline-secondary" className="mt-3 mx-2">
                    حذف پروفایل کاربری
                  </Button>
                </Card.Body>
              </Card>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};
