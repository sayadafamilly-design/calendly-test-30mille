import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function PublicBooking() {

  const { nameBook } = useParams();
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: ""
  });

  const loadSlots = async () => {
    const res = await axios.get("https://calendly-test-30mille.onrender.com/slots");

    const dispo = Array.isArray(res.data)
      ? res.data.filter((s) => s.booked === 0)
      : [];

    setSlots(dispo);
  };

  useEffect(() => {
    loadSlots();
  }, []);

  const openModal = (slot) => {
    setSelectedSlot(slot);
  };

  const closeModal = () => {
    setSelectedSlot(null);
  };

  const handleBook = async () => {
    await axios.post("http://localhost:5000/book", {
      id: selectedSlot.id,
      ...form
    });

    closeModal();
    loadSlots();
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1>Réserver un créneau</h1>

        <div style={styles.list}>
          {slots.map((slot) => (
            <div
              key={slot.id}
              style={styles.slot}
              onClick={() => openModal(slot)}
            >
              {slot.date} — {slot.start} → {slot.end}
            </div>
          ))}
        </div>
      </div>

      {/* MODAL */}
      {selectedSlot && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <h2>Réservation - Merci de rentrez vos informations</h2>

            <p>
              {selectedSlot.date} — {selectedSlot.start} → {selectedSlot.end}
            </p>

            <input
              placeholder="Prénom"
              style={styles.input}
              onChange={(e) =>
                setForm({ ...form, firstName: e.target.value })
              }
            />

            <input
              placeholder="Nom"
              style={styles.input}
              onChange={(e) =>
                setForm({ ...form, lastName: e.target.value })
              }
            />

            <input
              placeholder="Email"
              style={styles.input}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />

            <div style={styles.actions}>
              <button onClick={closeModal}>Annuler</button>
              <button onClick={handleBook}>
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {

  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },

  modal: {
    background: "white",
    padding: "25px",
    borderRadius: "12px",
    width: "350px"
  },

  input: {
    width: "100%",
    padding: "10px",
    marginTop: "10px",
    borderRadius: "8px",
    border: "1px solid #ddd"
  },

  actions: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "15px"
  },

  page: {
    minHeight: "100vh",
    background: "#f7f8fa",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px"
  },

  card: {
    width: "650px",
    background: "white",
    borderRadius: "16px",
    padding: "32px",
    boxShadow: "0 12px 30px rgba(0,0,0,0.08)"
  },

  subtitle: {
    color: "#666",
    marginBottom: "20px"
  },

  success: {
    background: "#d1fae5",
    color: "#065f46",
    padding: "12px",
    borderRadius: "10px",
    marginBottom: "20px"
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
    padding: "16px",
    borderRadius: "12px",
    border: "1px solid #ddd",
    background: "white",
    cursor: "pointer",
    textAlign: "left"
  }
};