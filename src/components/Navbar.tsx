import React from 'react';

interface Props {
    toggleSidebar: () => void;
}

const Navbar = ( {toggleSidebar}: Props ) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light p-3">
      <a className="navbar-brand" href="#">Admin</a>
      <button onClick={toggleSidebar} className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a className="nav-link" href="#">Profile</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Logout</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
