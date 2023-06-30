import { Input } from 'antd';
import { useState } from 'react';

export default function UserSearch() {
  // search input
  const [searchValue, setSearchValue] = useState();
  const changeSearchValue = (e) => {
    setSearchValue(e.target.value);
  };
  // useEffect(() => {
  //   if (!searchValue || searchValue?.length === 0) return undefined;
  //   const timeOutId = setTimeout(() => {
  //     UsersService.SearchUsers(searchValue)
  //       .then((res) => {
  //         console.log(res);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }, 1000);
  //   return () => clearTimeout(timeOutId);
  // }, [searchValue]);
  return <Input placeholder="Search.." value={searchValue} onChange={changeSearchValue} className="search-input" />;
}
