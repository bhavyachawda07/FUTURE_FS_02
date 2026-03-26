const API_URL = 'http://localhost:5000/api';

interface RequestOptions extends RequestInit {
  body?: any;
}

async function request(endpoint: string, options: RequestOptions = {}) {
  const token = localStorage.getItem('token');
  
  const headers = new Headers({
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...((options.headers as any) || {}),
  });

  const config: RequestInit = {
    ...options,
    headers,
  };

  if (options.body && typeof options.body === 'object') {
    config.body = JSON.stringify(options.body);
  }

  const response = await fetch(`${API_URL}${endpoint}`, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Something went wrong');
  }

  return data;
}

export const api = {
  auth: {
    login: (credentials: any) => request('/auth/login', { method: 'POST', body: credentials }),
    getMe: () => request('/auth/me'),
  },
  leads: {
    getAll: () => request('/leads'),
    getOne: (id: string) => request(`/leads/${id}`),
    create: (lead: any) => request('/leads', { method: 'POST', body: lead }),
    update: (id: string, lead: any) => request(`/leads/${id}`, { method: 'PUT', body: lead }),
    delete: (id: string) => request(`/leads/${id}`, { method: 'DELETE' }),
  },
  dashboard: {
    getStats: () => request('/dashboard/stats'),
    getAnalytics: () => request('/dashboard/analytics'),
  },
};
