src/ListUsers.js// src/ListUsers.js
import React, { useEffect, useState } from 'react';

function ListUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/users')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch users');
        return res.json();
      })
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (users.length === 0) return <p>No users found.</p>;

  return (
    <table border="1" cellPadding="5" style={{ borderCollapse: 'collapse', width: '100%' }}>
      <thead>
        <tr>
          <th>Name</th><th>Age</th><th>City</th><th>State</th><th>Pincode</th>
        </tr>
      </thead>
      <tbody>
        {users.map(u => (
          <tr key={u.id}>
            <td>{u.name}</td>
            <td>{u.age}</td>
            <td>{u.city}</td>
            <td>{u.state}</td>
            <td>{u.pincode}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ListUsers;