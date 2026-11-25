export default function Dashboard({ doctorCount, patientCount, appointmentCount, revenue }) {
  const cards = [
    [doctorCount, "Doctors"],
    [patientCount, "Patients"],
    [appointmentCount, "Appointments"],
    [`₹${revenue}`, "Total Revenue"]
  ];
  return (
    <section>
      <h2>Dashboard</h2>
      <div className="dashboard">
        {cards.map(([value, label]) => (
          <div className="card" key={label}>
            <h3>{value}</h3><p>{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}