export default function PrescriptionManagement({ prescriptions, doctors, onAdd, onDelete }) {
  function submit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    onAdd({
      patient: data.get("patient"),
      doctor: data.get("doctor"),
      medicine: data.get("medicine"),
      dosage: data.get("dosage"),
      instructions: data.get("instructions")
    });
    event.currentTarget.reset();
  }
  return (
    <section id="prescriptions">
      <h2>Prescription Management</h2>
      <form onSubmit={submit}>
        <div className="form-grid">
          <label>Patient Name<input name="patient" required /></label>
          <label>Doctor<select name="doctor" required defaultValue=""><option value="" disabled>Select Doctor</option>{doctors.map(d => <option key={d.name}>{d.name}</option>)}</select></label>
          <label>Medicine<input name="medicine" required /></label>
          <label>Dosage<input name="dosage" required /></label>
        </div>
        <label>Instructions<input name="instructions" required /></label>
        <button type="submit">Add Prescription</button>
      </form>
      <div className="table-container"><table>
        <thead><tr><th>Patient</th><th>Doctor</th><th>Medicine</th><th>Dosage</th><th>Instructions</th><th>Action</th></tr></thead>
        <tbody>
          {prescriptions.map((p, i) => <tr key={i}><td>{p.patient}</td><td>{p.doctor}</td><td>{p.medicine}</td><td>{p.dosage}</td><td>{p.instructions}</td><td><button className="delete-btn" onClick={() => onDelete(i)}>Delete</button></td></tr>)}
          {!prescriptions.length && <tr><td colSpan="6">No prescriptions added yet.</td></tr>}
        </tbody>
      </table></div>
    </section>
  );
}