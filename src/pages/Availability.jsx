import { useState, useEffect } from "react";
import axios from "axios";

export default function Availability() {
  const [date, setDate] = useState("");
  const [start, setStart] = useState("09:00");
  const [end, setEnd] = useState("10:00");
  const [slots, setSlots] = useState([]);

  const loadSlots = async () => {
    const res = await axios.get("http://localhost:5000/slots");
    setSlots(Array.isArray(res.data) ? res.data : []);
  };

  useEffect(() => {
    loadSlots();
  }, []);

  const addSlot = async () => {
    console.log("CLICK OK");

    await axios.post("http://localhost:5000/slots", {
      date,
      start,
      end
    });

    loadSlots();
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
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

          <button onClick={addSlot} style={styles.button}>
            Ajouter
          </button>
        </div>

        <div style={styles.list}>
          {slots.length === 0 && (
            <p style={styles.empty}>Aucun créneau enregistré</p>
          )}

          {slots
            .filter((slot) => slot.booked === 0)
            .map((slot) => (
              <div key={slot.id} style={styles.slot}>
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
    gridTemplateColumns: "1.3fr 1fr 1fr auto",
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
  },

  badge: {
    background: "#d1fae5",
    color: "#065f46",
    padding: "6px 10px",
    borderRadius: "999px",
    fontSize: "13px",
    fontWeight: "bold"
  }
};