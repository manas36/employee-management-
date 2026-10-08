import { useState, useEffect } from "react";
import UserModal from "./UserModal.jsx";
import UserTable from "./UserTable.jsx";

const STORAGE_KEY = "user-table-data";

const SEED_USERS = [
  { id: 1, name: "Aarav Mehta", email: "aarav@example.com", role: "Admin" },
  { id: 2, name: "Priya Nair", email: "priya@example.com", role: "Editor" },
  { id: 3, name: "Rohan Desai", email: "rohan@example.com", role: "Viewer" },
];

function loadUsers() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    // fall back to seed data
  }
  return SEED_USERS;
}

export default function App() {
  const [users, setUsers] = useState(loadUsers);
  const [query, setQuery] = useState("");
  // null = modal closed, {} = adding a new user, {id,...} = editing that user
  const [modalUser, setModalUser] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
    } catch (e) {
      // storage unavailable
    }
  }, [users]);

  const saveUser = (user) => {
    if (user.id) {
      setUsers(users.map((u) => (u.id === user.id ? user : u)));
    } else {
      setUsers([...users, { ...user, id: Date.now() }]);
    }
    setModalUser(null);
  };

  const deleteUser = (user) => {
    if (window.confirm(`Delete ${user.name}?`)) {
      setUsers(users.filter((u) => u.id !== user.id));
    }
  };

  const q = query.trim().toLowerCase();
  const visibleUsers = q
    ? users.filter((u) =>
        [u.name, u.email, u.role].some((v) => v.toLowerCase().includes(q))
      )
    : users;

  return (
    <main>
      <h1>Users</h1>
      <p className="sub">
        {users.length} {users.length === 1 ? "user" : "users"} saved in this browser.
      </p>

      <div className="toolbar">
        <input
          type="search"
          className="search"
          placeholder="Search by name, email or role"
          aria-label="Search users"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="primary" onClick={() => setModalUser({})}>
          Add user
        </button>
      </div>

      <UserTable
        users={visibleUsers}
        isFiltered={q !== ""}
        onEdit={setModalUser}
        onDelete={deleteUser}
      />

      {modalUser && (
        <UserModal
          user={modalUser}
          onSave={saveUser}
          onClose={() => setModalUser(null)}
        />
      )}
    </main>
  );
}
