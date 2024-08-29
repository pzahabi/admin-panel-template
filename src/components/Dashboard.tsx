import React from 'react';

const Dashboard = () => {
  return (
    <div className="container-fluid mt-3">
      <div className="row">
        <div className="col-lg-3 col-md-6 mb-4">
          <div className="card bg-primary text-white">
            <div className="card-body">آمار</div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 mb-4">
          <div className="card bg-success text-white">
            <div className="card-body">آمار</div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 mb-4">
          <div className="card bg-warning text-white">
            <div className="card-body">آمار</div>
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
