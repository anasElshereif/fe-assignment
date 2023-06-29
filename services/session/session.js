import axios from 'axios';

const CreateSession = (payload) => axios.post('/create-sessions', payload);

const SessionService = {
  CreateSession,
};
export default SessionService;

// 115
