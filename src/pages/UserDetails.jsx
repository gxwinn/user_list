import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const USERS_API = 'https://jsonplaceholder.typicode.com/users';

function UserDetails() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;

    async function loadUser() {
      setLoading(true);
      setError('');

      try {
        const response = await fetch(`${USERS_API}/${id}`);

        if (!response.ok) {
          throw new Error('Failed to load user');
        }

        const data = await response.json();

        if (!ignore) {
          setUser(data);
        }
      } catch (err) {
        if (!ignore) {
          setError('Не удалось загрузить пользователя.');
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadUser();

    return () => {
      ignore = true;
    };
  }, [id]);

  if (loading) {
    return (
      <section className="user-details">
        <p className="user-details__status">Загрузка...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="user-details">
        <p className="user-details__status user-details__status--error">{error}</p>
        <Link className="user-details__back" to="/users">
          Назад к списку
        </Link>
      </section>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <section className="user-details">
      <Link className="user-details__back" to="/users">
        Назад к списку
      </Link>
      <div className="user-details__card">
        <h2 className="user-details__title">{user.name}</h2>
        <ul className="user-details__list">
          <li className="user-details__item"><span className="user-details__label">ID:</span> {user.id}</li>
          <li className="user-details__item"><span className="user-details__label">Имя:</span> {user.name}</li>
          <li className="user-details__item"><span className="user-details__label">Username:</span> {user.username}</li>
          <li className="user-details__item"><span className="user-details__label">Email:</span> {user.email}</li>
          <li className="user-details__item"><span className="user-details__label">Phone:</span> {user.phone}</li>
          <li className="user-details__item"><span className="user-details__label">Website:</span> {user.website}</li>
          <li className="user-details__item"><span className="user-details__label">Компания:</span> {user.company?.name}</li>
          <li className="user-details__item"><span className="user-details__label">Город:</span> {user.address?.city}</li>
          {user.address?.street ? (
            <li className="user-details__item"><span className="user-details__label">Улица:</span> {user.address.street}</li>
          ) : null}
        </ul>
      </div>
    </section>
  );
}

export default UserDetails;
