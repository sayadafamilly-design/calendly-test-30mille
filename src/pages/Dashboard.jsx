import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [slots, setSlots] = useState([]);
  const navigate = useNavigate();

  // recuperation des horaires
  const loadSlots = async () => {
    const res = await axios.get("https://calendly-test-30mille.onrender.com/slots");
    setSlots(Array.isArray(res.data) ? res.data : []);
  };


  useEffect(() => {
    loadSlots();
  }, []);

  // deconnexion
  const logout = () => {
    localStorage.removeItem("logged");
    navigate("/");
  };

  // creation de object disponibles et reserves
  const disponibles = slots.filter((s) => s.booked === 0);
  const reserves = slots.filter((s) => s.booked === 1);

  //suppression des creneaux
  const deleteSlot = async (id) => {
    await axios.delete(`https://calendly-test-30mille.onrender.com/slots/${id}`);
    loadSlots();
  };

  //remet le slot en dispo 
  const updateBookedState = async (id) => {
    await axios.post(`https://calendly-test-30mille.onrender.com/slots/${id}`);
    loadSlots();
  };
  

  return (
    <div style={styles.page}>
      <div style={styles.sidebar}>
        <h2>Mon Dashboard</h2> 
        <p style={{ opacity: 0.7 }}>
          Gestion des rendez-vous
        </p>

        <br></br>
        <button style={styles.menuBtn} onClick={() => navigate("/availability")}>
          Disponibilités
        </button>

        <button style={styles.logout} onClick={logout}>
          Déconnexion
        </button>
      </div>

      <div style={styles.content}>
        <h1>Vue générale</h1>

        <div style={styles.cards}>
          <div style={styles.card}>
            <h3>Disponibles</h3>
            {disponibles.map((slot) => (
              <div key={slot.id} style={styles.slot}>
                <div>
                  {slot.date} — {slot.start} → {slot.end}
                </div>

                <button
                  onClick={() => deleteSlot(slot.id)}
                  className="btn btn-danger btn-sm mt-2"
                >
                  <i className="bi bi-trash"></i>
                </button> 
              </div>
            ))}
          </div>

          {/* <div style={styles.card}>
            <h3>Réservés</h3>
            <p>{reserves.length}</p>
          </div> */}

          {/* <div style={styles.card}>
            <h3>Total</h3>
            <p>{slots.length}</p>
          </div> */}
        </div>

        <h2 style={{ marginTop: "30px" }}>
          Créneaux réservés
        </h2>

        <div style={styles.list}>
          {reserves.length === 0 && (
            <p>Aucune réservation</p>
          )}

          {reserves.map((slot) => (
            <div key={slot.id} style={styles.slot}>
              <div>
                {slot.date} — {slot.start} → {slot.end}
              </div>

              <div style={{ marginTop: "8px", fontSize: "14px" }}>
                👤 {slot.firstname} {slot.lastname}
              </div>

              <div style={{ fontSize: "14px", opacity: 0.8 }}>
                📧 {slot.email}
              </div>

              <button
                onClick={() => updateBookedState(slot.id)}
                className="btn btn-danger btn-sm mt-2"
              >
                <i className="bi bi-trash"></i>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

//css de la page
const styles = {
  page: {
    display: "flex",
    minHeight: "100vh",
    background: "#f7f8fa"
  },

  sidebar: {
    width: "250px",
    background: "#111827",
    color: "white",
    padding: "30px",
    display: "flex",
    flexDirection: "column"
  },

  logout: {
    marginTop: "auto",
    padding: "12px",
    border: "none",
    borderRadius: "10px",
    background: "#ef4444",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold"
  },

  content: {
    flex: 1,
    padding: "40px"
  },

  cards: {
    display: "flex",
    gap: "20px",
    marginTop: "20px"
  },

  card: {
    flex: 1,
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 10px 20px rgba(0,0,0,0.05)"
  },

  list: {
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },

  slot: {
    background: "white",
    padding: "15px",
    borderRadius: "10px",
    border: "1px solid #eee"
  }, 
  menuBtn: {
    padding: "12px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer"
  },
};