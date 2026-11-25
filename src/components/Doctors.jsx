export default function Doctors({ doctors }) {
  return (
    <section id="doctors">
      <h2>Doctors</h2>
      <div className="doctor-list">
        {doctors.map((doctor) => (
          <article className="doctor-card" key={doctor.name}>
            <h3>{doctor.name}</h3>
            <p>Department: {doctor.department}</p>
            <p>Experience: {doctor.experience}</p>
          </article>
        ))}
      </div>
    </section>
  );
}