import { useState, useEffect } from "react";

export const ROLES = ["Admin", "Editor", "Viewer"];

function validate(user) {
  if (!user.name.trim()) return "Enter a name.";
  if (!/^\S+@\S+\.\S+$/.test(user.email)) return "Enter a valid email address.";
  return "";
}

export default function UserModal({ user, onSave, onClose }) {
  const isEdit = Boolean(user.id);
  const [form, setForm] = useState({
    id: user.id,
    name: user.name || "",
    email: user.email || "",
    role: user.role || "Viewer",
  });
  const [error, setError] = useState("");

  // Close with the Escape key
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const change = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const message = validate(form);
    if (message) return setError(message);
    onSave(form);
  };

  return (
    <div className="backdrop" onMouseDown={onClose}>
      <form
        className="modal panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onMouseDown={(e) => e.stopPropagation()}
        onSubmit={submit}
      >
        <h2 id="modal-title">{isEdit ? "Edit user" : "Add user"}</h2>

        <label>
          Name
          <input autoFocus value={form.name} onChange={change("name")} />
        </label>
        <label>
          Email
          <input type="email" value={form.email} onChange={change("email")} />
        </label>
        <label>
          Role
          <select value={form.role} onChange={change("role")}>
            {ROLES.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </label>

        {error && (
          <div className="err" role="alert">
            {error}
          </div>
        )}

        <div className="modal-actions">
          <button type="button" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="primary">
            {isEdit ? "Save changes" : "Add user"}
          </button>
        </div>
      </form>
    </div>
  );
}
