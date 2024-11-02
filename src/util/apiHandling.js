// apiCalls.js
const API_BASE_URL = 'https://h2opolostat.onrender.com';
// Add Player
const addPlayer = async (player) => {
  const response = await fetch(`${API_BASE_URL}/api/players/addPlayer`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(player),
  });
  const data = await response.json();
  return data;
};

// Get All Players
const getAllPlayers = async () => {
  console.log("tica uso u fet all players");
  const response = await fetch(`${API_BASE_URL}/api/players/getAllPlayers`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data;
};

// Remove Single Player
const removePlayer = async (playerId) => {
  const response = await fetch(`https://h2opolostat.onrender.com/api/players/removePlayer/${playerId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data;
};

// Remove Multiple Players
const removePlayers = async (playerIds) => {
  const response = await fetch(`${API_BASE_URL}/api/players/removePlayers`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ids: playerIds }),
  });
  const data = await response.json();
  return data;
};

// Add Event
const addEvent = async (event) => {
  const response = await fetch(`${API_BASE_URL}/api/events/addEvent`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(event),
  });
  const data = await response.json();
  return data;
};

// Get All Events
const getAllEvents = async () => {
  const response = await fetch(`${API_BASE_URL}/api/events/getAllEvents`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data;
};

// Remove Event
const removeEvent = async (eventId) => {
  const response = await fetch(`https://h2opolostat.onrender.com/api/events/removeEvent/${eventId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data;
};

// Add Match
const addMatch = async (match) => {
  const response = await fetch(`${API_BASE_URL}/api/matches/addMatch`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(match),
  });
  const data = await response.json();
  return data;
};

// Get All Matches
const getAllMatches = async () => {
  const response = await fetch(`${API_BASE_URL}/api/matches/getAllMatches`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data;
};

// Remove Match
const removeMatch = async (matchId) => {
  const response = await fetch(`https://h2opolostat.onrender.com/api/matches/removeMatch/${matchId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data;
};
//upadte Matches
const updateMatches = async (match) => {
  const response = await fetch(`https://h2opolostat.onrender.com/api/matches/updateMatches/${match.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(match),
  });
  const data = await response.json();
  return data;
};

// Create Statistics
const createStatistics = async (statistic) => {
  const response = await fetch(`${API_BASE_URL}/api/statistics/createStatistics`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(statistic),
  });
  const data = await response.json();
  return data;
};

// Get Statistics
const getStatistics = async () => {
  const response = await fetch(`${API_BASE_URL}/api/statistics/getStatistics`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data;
};

// Remove Statistics
const removeStatistics = async (statisticId) => {
  const response = await fetch(`https://h2opolostat.onrender.com/api/statistics/removeStatistics/${statisticId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data;
};

// Update Statistics
const updateStatistics = async (statistic) => {
  const response = await fetch(`https://h2opolostat.onrender.com/api/statistics/updateStatistics/${statistic.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(statistic),
  });
  const data = await response.json();
  return data;
};

// const addOrUpdateUserToken = async (user) => {
//   const response = await fetch(`${API_BASE_URL}/api/users/token`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(user),
//   });
//   const data = await response.json();
//   return data;
// };

// const removeUserToken = async (userToken) => {
//   const response = await fetch(`https://h2opolostat.onrender.com/api/events/removeToken/${userToken}`, {
//     method: 'DELETE',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });
//   const data = await response.json();
//   return data;
// };

// const getUserToken = async (user) => {
//   const response = await fetch(`${API_BASE_URL}/api/statistics/getUserToken`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });
//   const data = await response.json();
//   return data;
// };

export {
  addPlayer,
  getAllPlayers,
  removePlayer,
  removePlayers,
  addEvent,
  getAllEvents,
  removeEvent,
  addMatch,
  getAllMatches,
  removeMatch,
  updateMatches,
  createStatistics,
  getStatistics,
  removeStatistics,
  updateStatistics,
  // addOrUpdateUserToken,
  // removeUserToken,
  // getUserToken,
};
