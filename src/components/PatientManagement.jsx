export default function PatientManagement({ patients, onAdd, onDelete }) {
  function submit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    onAdd({
      id: `P${String(patients.length + 1).padStart(3, "0")}`,
      name: data.get("name"),
      age: data.get("age"),
      gender: data.get("gender"),
      contact: data.get("contact")
    });
    event.currentTarget.reset();
  }
  return (
    <section id="patients">
      <h2>Patient Management</h2>
      <form onSubmit={submit}>
        <div className="form-grid">
          <label>Patient Name<input name="name" type="text" required /></label>
          <label>Age<input name="age" type="number" min="0" required /></label>
          <label>Gender<select name="gender" required defaultValue=""><option value="" disabled>Select Gender</option><option>Male</option><option>Female</option><option>Other</option></select></label>
          <label>Contact<input name="contact" type="tel" required /></label>
        </div>
        <button type="submit">Add Patient</button>
      </form>
      <div className="table-container">
        <table><thead><tr><th>ID</th><th>Name</th><th>Age</th><th>Gender</th><th>Contact</th><th>Action</th></tr></thead>
          <tbody>
            {patients.map((p, i) => <tr key={`${p.id}-${i}`}><td>{p.id}</td><td>{p.name}</td><td>{p.age}</td><td>{p.gender}</td><td>{p.contact}</td><td><button className="delete-btn" onClick={() => onDelete(i)}>Delete</button></td></tr>)}
            {!patients.length && <tr><td colSpan="6">No patients added yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </section>
  );
}