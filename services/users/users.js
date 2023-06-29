import axios from 'axios';

const GetUsers = (offset) => axios.get(`/get-users?event_id=8&offset=${offset || 0}&limit=5`);

const CreateUser = (payload) => axios.post('/create-users', payload);

const UsersService = {
  GetUsers,
  CreateUser,
};
export default UsersService;
