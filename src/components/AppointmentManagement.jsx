export default function AppointmentManagement({ appointments, doctors, onAdd, onDelete }) {
  function submit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    onAdd({
      patient: data.get("patient"),
      doctor: data.get("doctor"),
      date: data.get("date"),
      time: data.get("time")
    });
    event.currentTarget.reset();
  }
  return (
    <section id="appointments">
      <h2>Appointment Management</h2>
      <form onSubmit={submit}>
        <div className="form-grid">
          <label>Patient Name<input name="patient" required /></label>
          <label>Doctor<select name="doctor" required defaultValue=""><option value="" disabled>Select Doctor</option>{doctors.map(d => <option key={d.name}>{d.name}</option>)}</select></label>
          <label>Date<input type="date" name="date" required /></label>
          <label>Time<input type="time" name="time" required /></label>
        </div>
        <button type="submit">Book Appointment</button>
      </form>
      <div className="table-container"><table>
        <thead><tr><th>Patient</th><th>Doctor</th><th>Date</th><th>Time</th><th>Action</th></tr></thead>
        <tbody>
          {appointments.map((a, i) => <tr key={i}><td>{a.patient}</td><td>{a.doctor}</td><td>{a.date}</td><td>{a.time}</td><td><button className="delete-btn" onClick={() => onDelete(i)}>Delete</button></td></tr>)}
          {!appointments.length && <tr><td colSpan="5">No appointments booked yet.</td></tr>}
        </tbody>
      </table></div>
    </section>
  );
}