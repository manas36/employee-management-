export default function UserTable({ users, isFiltered, onEdit, onDelete }) {
  if (users.length === 0) {
    return (
      <div className="panel empty">
        {isFiltered
          ? "No users match your search."
          : "No users yet. Select Add user to create one."}
      </div>
    );
  }

  return (
    <div className="panel wrap">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td className="act">
                <button onClick={() => onEdit(user)}>Edit</button>
                <button className="danger" onClick={() => onDelete(user)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
