const BASE_URL = 'http://localhost:8000';

export const getDeadlines = async () => {
  const res = await fetch(`${BASE_URL}/deadlines/`);
  return res.json();
};

export const createDeadline = async (deadline: any) => {
  const res = await fetch(`${BASE_URL}/deadlines/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(deadline),
  });
  return res.json();
};