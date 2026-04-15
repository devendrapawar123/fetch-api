import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [page, setPage] = useState("login");
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [name, setName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");

  useEffect(() => {
    if (page === "home") {
      getProducts();
    }
  }, [page]);

  const getProducts = async () => {
    try {
      const res = await axios.get(
        "https://dummyjson.com/products"
      );
      setProducts(res.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  const login = () => {
    if (
      loginEmail === "" ||
      loginPassword === ""
    ) {
      alert("Fill all fields");
    } else {
      alert("Login Success");
      setPage("home");
    }
  };

  const register = () => {
    if (
      name === "" ||
      regEmail === "" ||
      regPassword === ""
    ) {
      alert("Fill all fields");
    } else {
      alert("Register Success");
      setPage("login");
    }
  };

  const addCart = (item) => {
    setCart([...cart, item]);
    alert("Added To Cart");
  };

  const removeCart = (index) => {
    let data = [...cart];
    data.splice(index, 1);
    setCart(data);
  };

  return (
    <div style={styles.body}>
      <div style={styles.nav}>
        <h2 style={{ color: "white" }}>
          MyShop
        </h2>

        <div>
          <button
            style={styles.navBtn}
            onClick={() => setPage("login")}
          >
            Login
          </button>

          <button
            style={styles.navBtn}
            onClick={() =>
              setPage("register")
            }
          >
            Register
          </button>

          <button
            style={styles.navBtn}
            onClick={() => setPage("home")}
          >
            Home
          </button>

          <button
            style={styles.navBtn}
            onClick={() => setPage("cart")}
          >
            Cart ({cart.length})
          </button>
        </div>
      </div>

      {page === "login" && (
        <div style={styles.form}>
          <h1>Login</h1>

          <input
            style={styles.input}
            type="email"
            placeholder="Email"
            value={loginEmail}
            onChange={(e) =>
              setLoginEmail(
                e.target.value
              )
            }
          />

          <input
            style={styles.input}
            type="password"
            placeholder="Password"
            value={loginPassword}
            onChange={(e) =>
              setLoginPassword(
                e.target.value
              )
            }
          />

          <button
            style={styles.btn}
            onClick={login}
          >
            Login
          </button>
        </div>
      )}

      {page === "register" && (
        <div style={styles.form}>
          <h1>Register</h1>

          <input
            style={styles.input}
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />

          <input
            style={styles.input}
            type="email"
            placeholder="Email"
            value={regEmail}
            onChange={(e) =>
              setRegEmail(
                e.target.value
              )
            }
          />

          <input
            style={styles.input}
            type="password"
            placeholder="Password"
            value={regPassword}
            onChange={(e) =>
              setRegPassword(
                e.target.value
              )
            }
          />

          <button
            style={styles.btn}
            onClick={register}
          >
            Register
          </button>
        </div>
      )}

      {page === "home" && (
        <div style={styles.grid}>
          {products.map((item) => (
            <div
              key={item.id}
              style={styles.card}
            >
              <img
                src={item.thumbnail}
                alt=""
                style={styles.img}
              />

              <h3>{item.title}</h3>

              <p>
                ₹ {item.price}
              </p>

              <button
                style={styles.btn}
                onClick={() =>
                  addCart(item)
                }
              >
                Add To Cart
              </button>
            </div>
          ))}
        </div>
      )}

      {page === "cart" && (
        <div style={styles.grid}>
          {cart.length === 0 ? (
            <h2>No Product In Cart</h2>
          ) : (
            cart.map((item, index) => (
              <div
                key={index}
                style={styles.card}
              >
                <img
                  src={item.thumbnail}
                  alt=""
                  style={styles.img}
                />

                <h3>{item.title}</h3>

                <p>
                  ₹ {item.price}
                </p>

                <button
                  style={{
                    ...styles.btn,
                    background:
                      "red",
                  }}
                  onClick={() =>
                    removeCart(index)
                  }
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

const styles = {
  body: {
    margin: 0,
    fontFamily: "Arial",
    background: "#f5f5f5",
    minHeight: "100vh",
  },

  nav: {
    background: "#0d6efd",
    padding: "15px 30px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  navBtn: {
    margin: "5px",
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },

  form: {
    width: "350px",
    background: "white",
    margin: "50px auto",
    padding: "25px",
    borderRadius: "10px",
    boxShadow:
      "0 0 10px rgba(0,0,0,0.1)",
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "12px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },

  btn: {
    width: "100%",
    padding: "12px",
    background: "#0d6efd",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(250px,1fr))",
    gap: "20px",
    padding: "30px",
  },

  card: {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center",
    boxShadow:
      "0 0 10px rgba(0,0,0,0.08)",
  },

  img: {
    width: "150px",
    height: "150px",
    objectFit: "cover",
  },
};

export default App;