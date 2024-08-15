import React, { useState } from "react";
import styles from "./auth.module.scss";
import { AiOutlineMail } from "react-icons/ai";
import Card from "../../components/card/Card";
import { Link } from "react-router-dom";
import { forgotPassword, validateEmail } from "../../services/authService";
import { toast } from "react-toastify";

const Forgot = () => {
  const [email, setEmail] = useState("");

  const forgot = async (e) => {
    e.preventDefault();
    if (!email) {
      return toast.error("Please enter an email");
    }

    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }

    const userData = {
      email,
    };

    await forgotPassword(userData);
    setEmail("");
  };

  return (
    <div className={`container ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <AiOutlineMail size={35} color="#999" />
          </div>
          <h2>Forgot Password</h2>

          <form onSubmit={forgot}>
            <input
              type="email"
              placeholder="Email"
              required
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button type="submit" className="--btn --btn-primary --btn-block">
              Get Reset Email
            </button>
            {/* tell to check spam forder if mail is not received */}
            <span style={
              { color: "#777777",
                fontSize: "1rem",
                marginTop: "1rem",
                display: "block",
                textAlign: "center", 
                fontWeight: "400"
              }
            }>
              *If you do not receive an email, please check your <span style={{fontWeight: "600"}}>spam</span> folder.
            </span>
            <div className={styles.links}>
              <p>
                <Link to="/">- Home</Link>
              </p>
              <p>
                <Link to="/login">- Login</Link>
              </p>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default Forgot;
