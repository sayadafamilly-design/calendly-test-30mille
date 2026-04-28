import axios from "axios";

const API = "https://calendly-test-30mille.onrender.com";

export const getSlots = () => axios.get(`${API}/slots`);

export const addSlot = (slot) =>
  axios.post(`${API}/slots`, slot);
 

export const bookSlot = (id) =>
  axios.post(`${API}/book`, { id });
 