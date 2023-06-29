import { Input } from 'antd';
import { useState } from 'react';

export default function UserSearch() {
  // search input
  const [searchValue, setSearchValue] = useState();
  const changeSearchValue = (e) => {
    setSearchValue(e.target.value);
  };
  return <Input placeholder="Search.." value={searchValue} onChange={changeSearchValue} className="search-input" />;
}
