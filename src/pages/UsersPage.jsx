import { useEffect, useState } from 'react';
import UserCard from '../components/UserCard';

const USERS_API = 'https://jsonplaceholder.typicode.com/users';

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;

    async function loadUsers() {
      setLoading(true);
      setError('');

      try {
        const response = await fetch(USERS_API);

        if (!response.ok) {
          throw new Error('Failed to load users');
        }

        const data = await response.json();

        if (!ignore) {
          setUsers(data);
        }
      } catch (err) {
        if (!ignore) {
          setError('Не удалось загрузить пользователей.');
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadUsers();

    return () => {
      ignore = true;
    };
  }, []);

  if (loading) {
    return (
      <section className="users-page">
        <p className="users-page__status">Загрузка...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="users-page">
        <p className="users-page__status users-page__status--error">{error}</p>
      </section>
    );
  }

  if (users.length === 0) {
    return (
      <section className="users-page">
        <p className="users-page__status">Пользователи не найдены.</p>
      </section>
    );
  }

  return (
    <section className="users-page">
      <div className="users-page__grid">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </section>
  );
}

export default UsersPage;
