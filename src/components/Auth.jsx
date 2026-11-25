import { useState } from "react";

export default function Auth() {
  const [message, setMessage] = useState("");
  const [signupMessage, setSignupMessage] = useState("");
  function signup(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const email = data.get("email");
    if (users.some(user => user.email === email)) {
      setSignupMessage("Email already registered.");
      return;
    }
    users.push({ name: data.get("name"), email, password: data.get("password") });
    localStorage.setItem("users", JSON.stringify(users));
    setSignupMessage("Signup successful! You can login now.");
    event.currentTarget.reset();
  }
  function login(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(u => u.email === data.get("email") && u.password === data.get("password"));
    if (user) {
      localStorage.setItem("currentUser", JSON.stringify({ name: user.name, email: user.email }));
      setMessage(`Login successful. Welcome ${user.name}!`);
    } else setMessage("Invalid email or password.");
  }
  return (
    <>
      <section id="login"><h2>User Login</h2>
        <form className="login-box" onSubmit={login}>
          <label>Email<input name="email" type="email" required /></label>
          <label>Password<input name="password" type="password" required /></label>
          <button type="submit">Login</button><p className="message">{message}</p>
        </form>
      </section>
      <section id="signup"><h2>Signup</h2>
        <form className="login-box" onSubmit={signup}>
          <label>Name<input name="name" required /></label>
          <label>Email<input name="email" type="email" required /></label>
          <label>Password<input name="password" type="password" required /></label>
          <button type="submit">Signup</button><p className="message">{signupMessage}</p>
        </form>
      </section>
    </>
  );
}