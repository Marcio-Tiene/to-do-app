/* eslint-disable import/prefer-default-export */
import toast from 'react-hot-toast';
import Cookies from '../services/cookies';
import { generalErrorHandler } from '../services/errorHandler';

const token = Cookies.get('token');

const headers = {
  Authorization: `Bearer ${token}`,
  Accept: '*/*',
  'Content-Type': 'application/json',

};

export const postProject = async ({ title }:{title:string}) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/projects`, {
    method: 'POST',
    body: JSON.stringify({ name: title }),
    mode: 'cors',
    headers,
  });

  if (response.ok) {
    const body = await response.json();
    toast.success('Project created', {
      id: title,
      className: 'bg-green-600 text-zinc-50',
      iconTheme: {
        primary: '#ffffff',
        secondary: '#03f855',
      },
      ariaProps: {
        role: 'status',
        'aria-live': 'polite',
      },
    });
    return body;
  }

  if (!response.ok) {
    const err = await response.json();
    const { errors } = err;
    if (errors) {
      generalErrorHandler(errors);
    }
  }
  return {};
};

export const deletProject = async (id:string) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/projects/${id}`, {
    method: 'DELETE',
    mode: 'cors',
    headers,
  });

  if (!response.ok) {
    const err = await response.json();
    const { errors } = err;
    if (errors) {
      generalErrorHandler(errors);
    }
  }
  if (response.ok) {
    toast.success('Project deleted', {
      id,
      className: 'bg-green-600 text-zinc-50',
      iconTheme: {
        primary: '#ffffff',
        secondary: '#03f855',
      },
      ariaProps: {
        role: 'status',
        'aria-live': 'polite',
      },
    });
  }
};

export const updateProject = async (id:string, name:string) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/projects/${id}`, {
    method: 'PATCH',
    mode: 'cors',
    body: JSON.stringify({ name }),
    headers,
  });

  if (!response.ok) {
    const err = await response.json();
    const { errors } = err;
    if (errors) {
      generalErrorHandler(errors);
    }
  }

  if (response.ok) {
    toast.success('Project updated', {
      id,
      className: 'bg-green-600 text-zinc-50',
      iconTheme: {
        primary: '#ffffff',
        secondary: '#03f855',
      },
      ariaProps: {
        role: 'status',
        'aria-live': 'polite',
      },
    });
  }
};

export const fetchProjects = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/projects`, {
    method: 'GET',
    mode: 'cors',
    headers,
  });

  if (response.ok) {
    const body = await response.json();
    return body;
  }

  if (!response.ok) {
    const err = await response.json();
    const { errors } = err;
    if (errors) {
      generalErrorHandler(errors);
    }
  }
  return [];
};
