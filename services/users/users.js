import axios from 'axios';

const GetUsers = (offset) => axios.get(`/get-users?event_id=8&offset=${offset || 0}&limit=5`);

const SearchUsers = (query) => axios.get(`/search-users?event_id=8&search=${query}`);

const CreateUser = (payload) => axios.post('/create-users', payload);

const UsersService = {
  GetUsers,
  SearchUsers,
  CreateUser,
};
export default UsersService;
