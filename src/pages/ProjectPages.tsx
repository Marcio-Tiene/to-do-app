import { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from '../services/cookies';

export default function ProjectsPage():ReactElement {
  const navigate = useNavigate();

  return (
    <div className="text-3xl">
      Projects Page
      <button
        type="button"
        onClick={() => {
          Cookies.removeAuth();
          navigate('/login');
        }}
      >
        Logout

      </button>

    </div>
  );
}
