import axios from 'axios';

const CreateSession = (payload) => axios.post('/create-sessions', payload);

const GetSingleSession = (id) => axios.get(`/session-details/${id}?event_id=8`);

const SessionService = {
  CreateSession,
  GetSingleSession,
};
export default SessionService;

// 115
