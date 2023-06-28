import axios from 'axios';

const GetUsers = (offset) => axios.get(`/get-users?event_id=8&offset=${offset || 0}&limit=10`);

const UsersService = {
  GetUsers,
};
export default UsersService;
