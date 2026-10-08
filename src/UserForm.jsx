import { useState } from "react";

export const ROLES = ["Admin", "Editor", "Viewer"];

export function validateUser(user) {
  if (!user.name.trim()) return "Enter a name.";
  if (!/^\S+@\S+\.\S+$/.test(user.email)) return "Enter a valid email address.";
  return "";
}

const EMPTY = { name: "", email: "", role: "Viewer" };

export default function UserForm({ onAdd }) {
  const [form, setForm] = useState(EMPTY);
  const [error, setError] = useState("");

  const change = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const message = validateUser(form);
    if (message) return setError(message);
    onAdd(form);
    setForm(EMPTY);
    setError("");
  };

  return (
    <>
      <form className="add panel" onSubmit={submit}>
        <input
          placeholder="Full name"
          aria-label="Name"
          value={form.name}
          onChange={change("name")}
        />
        <input
          type="email"
          placeholder="Email address"
          aria-label="Email"
          value={form.email}
          onChange={change("email")}
        />
        <select aria-label="Role" value={form.role} onChange={change("role")}>
          {ROLES.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
        <button className="primary" type="submit">
          Add user
        </button>
      </form>
      {error && (
        <div className="err" role="alert">
          {error}
        </div>
      )}
    </>
  );
}
