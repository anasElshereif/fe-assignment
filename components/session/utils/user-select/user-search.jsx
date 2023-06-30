import { Input, message, Form } from 'antd';
import { useState, useEffect } from 'react';
import UsersService from '../../../../services/users/users';

export default function UserSearch({ searchQuery, searchResult, offset, loading }) {
  // search input
  const [searchValue, setSearchValue] = useState();
  const [holder, setHolder] = useState(true);

  const changeSearchValue = (e) => {
    if (setHolder) setHolder(false);
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    if (holder) return;
    searchQuery(searchValue);
  }, [searchValue]);

  useEffect(() => {
    if (holder) return undefined; // to prevent useEffect from fetching data in first render
    const timeOutId = setTimeout(() => {
      if (searchValue?.length === 0 || !searchValue) return;
      loading(true);
      UsersService.SearchUsers(searchValue, offset)
        .then((res) => {
          searchResult(res.data);
        })
        .catch(() => {
          message.error('Error occurred while searching');
        })
        .finally(() => {
          loading(false);
        });
    }, 1000); // time out to deffer search request with controlled time => can use useDeferredValue hock instead but it does not give time control
    return () => clearTimeout(timeOutId);
  }, [searchValue]);
  // be endpoint throws 500 (internal server error)

  return (
    <Form.Item name="search_field" preserve style={{ marginBottom: '0px' }}>
      <Input placeholder="Search.." value={searchValue} onChange={changeSearchValue} className="search-input" />
    </Form.Item>
  );
}
