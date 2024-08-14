import React from "react";
import { RiProductHuntLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import "./Home.scss";
import heroImg from "../../assets/inv-img.png";
import { ShowOnLogin, ShowOnLogout } from "../../components/protect/HiddenLink";
import walmart from "./walmart.svg";
import factory from "./factory.svg";
// import inventory_1 from "./bi.png";
import inventory_2 from "./inventory_2.svg";
import inventory_1 from "./inventory_1.svg";

const Home = () => {
  return (
    <div className="home">
      <nav className="--flex-between navbar">
        <a href="/" className="logo">
          <img src={walmart} height={100} width={200} alt="Inventory" />
        </a>

        <ul className="home-links">
          <ShowOnLogout>
            <Link to="/register">
              <button className=" btn ">
                  Register
              </button>
            </Link>
          </ShowOnLogout>
          <ShowOnLogout>
            <li>
            <Link to="/login">
                <button className=" btn ">
                  Login
                </button>
                </Link>
            </li>
          </ShowOnLogout>
          <ShowOnLogin>
            <li>
              <Link to="/dashboard">
                <button className="btn ">
                  Dashboard
                </button>
              </Link>
            </li>
          </ShowOnLogin>
        </ul>
      </nav>
      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-text">
          <h1>Walmart's Inventory Management System</h1>
          <p>
            Inventory system to control and manage proucts in the warehouse in
            real time and integrated to make it easier to develop your business.
          </p>
          <div className="hero-buttons">
          </div>
        </div>

        <div className="hero-image">
          {/* <img height={480}src={inventory_2} alt="Inventory" /> */}
          <img height={480}src={inventory_1} alt="Inventory" />
        </div>
      </section>
    </div>
  );
};

const NumberText = ({ num, text }) => {
  return (
    <div className="--mr">
      <h3 className="--color-white">{num}</h3>
      <p className="--color-white">{text}</p>
    </div>
  );
};

export default Home;
