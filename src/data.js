export const doctors = [
  { name: "Dr. Raj Kumar", department: "Cardiologist", experience: "12 years" },
  { name: "Dr. Priya Sharma", department: "Dermatologist", experience: "8 years" },
  { name: "Dr. Arjun Reddy", department: "Neurologist", experience: "10 years" }
];

export function readStore(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}