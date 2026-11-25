import { useEffect, useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Dashboard from "./components/Dashboard";
import PatientManagement from "./components/PatientManagement";
import Doctors from "./components/Doctors";
import AppointmentManagement from "./components/AppointmentManagement";
import PrescriptionManagement from "./components/PrescriptionManagement";
import Billing from "./components/Billing";
import Auth from "./components/Auth";
import Footer from "./components/Footer";
import { doctors, readStore } from "./data";

export default function App() {
  const [patients, setPatients] = useState(() => readStore("patients", []));
  const [appointments, setAppointments] = useState(() => readStore("appointments", []));
  const [prescriptions, setPrescriptions] = useState(() => readStore("prescriptions", []));
  const [revenue, setRevenue] = useState(() => Number(localStorage.getItem("revenue")) || 0);

  useEffect(() => localStorage.setItem("patients", JSON.stringify(patients)), [patients]);
  useEffect(() => localStorage.setItem("appointments", JSON.stringify(appointments)), [appointments]);
  useEffect(() => localStorage.setItem("prescriptions", JSON.stringify(prescriptions)), [prescriptions]);
  useEffect(() => localStorage.setItem("revenue", String(revenue)), [revenue]);

  function removeItem(items, setter, index, label) {
    if (window.confirm(`Delete this ${label}?`)) setter(items.filter((_, i) => i !== index));
  }

  return (
    <>
      <Header />
      <Hero />
      <Dashboard doctorCount={doctors.length} patientCount={patients.length}
        appointmentCount={appointments.length} revenue={revenue} />
      <PatientManagement patients={patients} onAdd={p => setPatients(old => [...old, p])}
        onDelete={i => removeItem(patients, setPatients, i, "patient")} />
      <Doctors doctors={doctors} />
      <AppointmentManagement appointments={appointments} doctors={doctors}
        onAdd={a => setAppointments(old => [...old, a])}
        onDelete={i => removeItem(appointments, setAppointments, i, "appointment")} />
      <PrescriptionManagement prescriptions={prescriptions} doctors={doctors}
        onAdd={p => setPrescriptions(old => [...old, p])}
        onDelete={i => removeItem(prescriptions, setPrescriptions, i, "prescription")} />
      <Billing onGenerate={amount => setRevenue(old => old + amount)} />
      <Auth />
      <Footer />
    </>
  );
}