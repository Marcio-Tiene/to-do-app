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

export const postTask = async ({ title, projectId }:{title:string, projectId: string}) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks`, {
    method: 'POST',
    body: JSON.stringify({ name: title, projectId }),
    mode: 'cors',
    headers,
  });

  if (response.ok) {
    const body = await response.json();
    toast.success('Task created', {
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

export const fetchProjectTasks = async (projectId:string) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks/${projectId}/project`, {
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

export const updatetask = async (id:string, { name, done } :{name?: string, done?:boolean}) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks/${id}`, {
    method: 'PATCH',
    mode: 'cors',
    body: JSON.stringify({ name, done }),
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
    toast.success('Task updated', {
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

export const deleteTask = async (id:string) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks/${id}`, {
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
    toast.success('task deleted', {
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
