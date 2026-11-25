
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

  // Store application data
  const [patients, setPatients] = useState(
    () => readStore("patients", [])
  );

  const [appointments, setAppointments] = useState(
    () => readStore("appointments", [])
  );

  const [prescriptions, setPrescriptions] = useState(
    () => readStore("prescriptions", [])
  );

  const [revenue, setRevenue] = useState(
    () => Number(localStorage.getItem("revenue")) || 0
  );

  // Save patients
  useEffect(() => {
    localStorage.setItem(
      "patients",
      JSON.stringify(patients)
    );
  }, [patients]);

  // Save appointments
  useEffect(() => {
    localStorage.setItem(
      "appointments",
      JSON.stringify(appointments)
    );
  }, [appointments]);

  // Save prescriptions
  useEffect(() => {
    localStorage.setItem(
      "prescriptions",
      JSON.stringify(prescriptions)
    );
  }, [prescriptions]);

  // Save revenue
  useEffect(() => {
    localStorage.setItem("revenue", String(revenue));
  }, [revenue]);

  // Add appointment AND patient details
  function addAppointment(appointment) {

    // Add appointment to appointment module
    setAppointments(old => [...old, appointment]);

    // Get patient details from appointment
    const patientData = appointment.patient || appointment;

    const patientName =
      patientData.patientName ||
      patientData.name ||
      patientData.fullName ||
      "";

    const phone =
      patientData.phone ||
      patientData.phoneNumber ||
      patientData.mobile ||
      "";

    const age =
      patientData.age || "";

    // Add patient only if not already registered
    setPatients(old => {

      const exists = old.some(patient => {

        const oldPhone =
          patient.phone ||
          patient.phoneNumber ||
          patient.mobile ||
          "";

        if (phone && oldPhone) {
          return String(oldPhone) === String(phone);
        }

        const oldName =
          patient.name ||
          patient.patientName ||
          patient.fullName ||
          "";

        return (
          patientName &&
          oldName.toLowerCase() === patientName.toLowerCase()
        );
      });

      if (exists) {
        return old;
      }

      return [
        ...old,
        {
          ...patientData,
          name: patientName,
          patientName: patientName,
          phone: phone,
          age: age
        }
      ];
    });
  }

  // Delete items
  function removeItem(items, setter, index, label) {

    if (window.confirm(`Delete this ${label}?`)) {
      setter(items.filter((_, i) => i !== index));
    }
  }

  return (
    <>
      <Header />

      <Hero />

      {/* Dashboard */}
      <Dashboard
        doctorCount={doctors.length}
        patientCount={patients.length}
        appointmentCount={appointments.length}
        revenue={revenue}
      />

      {/* Patient Management */}
      <PatientManagement
        patients={patients}
        onAdd={p =>
          setPatients(old => [...old, p])
        }
        onDelete={i =>
          removeItem(
            patients,
            setPatients,
            i,
            "patient"
          )
        }
      />

      {/* Doctors */}
      <Doctors doctors={doctors} />

      {/* Appointment Management */}
      <AppointmentManagement
        appointments={appointments}
        doctors={doctors}
        onAdd={addAppointment}
        onDelete={i =>
          removeItem(
            appointments,
            setAppointments,
            i,
            "appointment"
          )
        }
      />

      {/* Prescription Management */}
      <PrescriptionManagement
        prescriptions={prescriptions}
        doctors={doctors}
        onAdd={p =>
          setPrescriptions(old => [...old, p])
        }
        onDelete={i =>
          removeItem(
            prescriptions,
            setPrescriptions,
            i,
            "prescription"
          )
        }
      />

      {/* Billing */}
      <Billing
        onGenerate={amount =>
          setRevenue(old => old + amount)
        }
      />

      <Auth />

      <Footer />
    </>
  );
}
