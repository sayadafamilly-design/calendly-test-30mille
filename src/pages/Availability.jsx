import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Availability() {
  const [date, setDate] = useState("");
  const [start, setStart] = useState("09:00");
  const [end, setEnd] = useState("10:00");
  const [slots, setSlots] = useState([]);

  const navigate = useNavigate();

  const loadSlots = async () => {
    const res = await axios.get(
      "https://calendly-test-30mille.onrender.com/slots"
    );

    setSlots(Array.isArray(res.data) ? res.data : []);
  };

  useEffect(() => {
    loadSlots();
  }, []);

  const addSlot = async () => {
    await axios.post(
      "https://calendly-test-30mille.onrender.com/slots",
      {
        date,
        start,
        end
      }
    );

    loadSlots();
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.topBar}>
          <button
            style={styles.backButton}
            onClick={() => navigate("/dashboard")}
          >
            ← Dashboard
          </button>
        </div>

        <h1 style={styles.title}>Disponibilités</h1>

        <p style={styles.subtitle}>
          Ajoutez vos créneaux disponibles
        </p>

        <div style={styles.form}>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={styles.input}
          />

          <input
            type="time"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            style={styles.input}
          />

          <input
            type="time"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            style={styles.input}
          />

          <button
            onClick={addSlot}
            style={styles.button}
          >
            Ajouter
          </button>
        </div>

        <div style={styles.list}>
          {slots.length === 0 && (
            <p style={styles.empty}>
              Aucun créneau enregistré
            </p>
          )}

          {slots
            .filter((slot) => slot.booked === 0)
            .map((slot) => (
              <div
                key={slot.id}
                style={styles.slot}
              >
                <div style={styles.slotDate}>
                  {slot.date}
                </div>

                <div style={styles.slotHour}>
                  {slot.start} → {slot.end}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f7f8fa",
    display: "flex",
    justifyContent: "center",
    padding: "40px"
  },

  card: {
    width: "700px",
    background: "white",
    borderRadius: "16px",
    padding: "32px",
    boxShadow: "0 12px 30px rgba(0,0,0,0.08)"
  },

  topBar: {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: "10px"
  },

  backButton: {
    padding: "10px 14px",
    border: "none",
    borderRadius: "10px",
    background: "#2563eb",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold"
  },

  title: {
    margin: 0,
    fontSize: "32px"
  },

  subtitle: {
    color: "#666",
    marginTop: "8px",
    marginBottom: "24px"
  },

  form: {
    display: "grid",
    gridTemplateColumns:
      "1.3fr 1fr 1fr auto",
    gap: "12px",
    marginBottom: "30px"
  },

  input: {
    padding: "12px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    fontSize: "15px"
  },

  button: {
    padding: "12px 18px",
    border: "none",
    borderRadius: "10px",
    background: "#111827",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold"
  },

  list: {
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },

  empty: {
    color: "#888",
    textAlign: "center",
    padding: "20px"
  },

  slot: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#f3f4f6",
    padding: "16px",
    borderRadius: "12px"
  },

  slotDate: {
    fontWeight: "bold",
    width: "180px"
  },

  slotHour: {
    color: "#333"
  }
};