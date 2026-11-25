import { useState } from "react";

export default function Billing({ onGenerate }) {
  const [bill, setBill] = useState(null);
  function submit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const consultation = Number(data.get("consultation"));
    const medicine = Number(data.get("medicine"));
    const lab = Number(data.get("lab"));
    const nextBill = {
      patient: data.get("patient"), consultation, medicine, lab,
      total: consultation + medicine + lab
    };
    setBill(nextBill);
    onGenerate(nextBill.total);
    event.currentTarget.reset();
  }
  return (
    <section id="billing">
      <h2>Billing Management</h2>
      <form onSubmit={submit}>
        <div className="form-grid">
          <label>Patient Name<input name="patient" required /></label>
          <label>Consultation Fee<input name="consultation" type="number" min="0" required /></label>
          <label>Medicine Charge<input name="medicine" type="number" min="0" required /></label>
          <label>Lab Charge<input name="lab" type="number" min="0" required /></label>
        </div>
        <button type="submit">Generate Bill</button>
      </form>
      {bill && <div className="bill-result"><div className="bill-card">
        <h3>Hospital Bill</h3><p><strong>Patient:</strong> {bill.patient}</p>
        <p>Consultation Fee: ₹{bill.consultation}</p><p>Medicine Charge: ₹{bill.medicine}</p><p>Lab Charge: ₹{bill.lab}</p>
        <div className="bill-total">Total: ₹{bill.total}</div>
      </div></div>}
    </section>
  );
}