import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";


export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (email && password) {
      // navigate("/dashboard");
      try {
      const res = await axios.post("https://calendly-test-30mille.onrender.com/login", {
        email,
        password
      });

      console.log(res.data)

      if (res.data.success == true) {
        localStorage.setItem("logged", true);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/dashboard");
      }
    } catch (err) {
      alert("Email ou mot de passe incorrect ❌");
    }
    } else {
      alert("Merci de tout remplir");
    }
  }; 

  return (
    <div style={styles.container}>
      <form style={styles.card} onSubmit={handleLogin}>
        <h1>Welcome</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f6f8"
  },
  card: {
    background: "white",
    padding: "40px",
    borderRadius: "12px",
    width: "350px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ddd"
  },
  button: {
    padding: "12px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer"
  }
};