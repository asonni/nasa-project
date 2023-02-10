const API_URL = 'http://localhost:8000/v1';

const httpGetPlanets = async () => {
  // Load planets and return as JSON.
  const response = await fetch(`${API_URL}/planets`);
  return await response.json();
};

const httpGetLaunches = async () => {
  // Load launches, sort by flight number, and return as JSON.
  const response = await fetch(`${API_URL}/launches`);
  const fetchedLaunches = await response.json();
  return fetchedLaunches.sort((a, b) => a.flightNumber - b.flightNumber);
};

const httpSubmitLaunch = async launch => {
  // Submit given launch data to launch system.
  try {
    return await fetch(`${API_URL}/launches`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(launch)
    });
  } catch (err) {
    return { ok: false };
  }
};

// Delete launch with given ID.
const httpAbortLaunch = async id => {
  try {
    return await fetch(`${API_URL}/launches/${id}`, {
      method: 'delete'
    });
  } catch (err) {
    console.error(err);
    return { ok: false };
  }
};

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
