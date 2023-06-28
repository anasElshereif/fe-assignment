import { Select, Form, Input, Spin } from 'antd';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import AddIcon from '../../../../public/icons/gray-add.svg';
import DropdownIcon from '../../../../public/icons/vector.svg';
import LoadMoreIcon from '../../../../public/icons/reload.svg';
import DefaultAvatar from '../../../../public/icons/default-user.svg';

const { Option } = Select;

export default function UserSelect({ label, name, users, selectedUsers }) {
  // search input
  const [searchValue, setSearchValue] = useState();
  const searchRef = useRef(null);
  const changeSearchValue = (e) => {
    setSearchValue(e.target.value);
  };

  // users
  const [loadSpin, setLoadSpin] = useState(true);
  const [usersData, setUsersData] = useState();
  useEffect(() => {
    if (!users) return;
    setUsersData(users);
    setLoadSpin(false);
  }, [users]);

  // selected users

  const [selectedUsersArr, setSelectedUsersArr] = useState([]);
  useEffect(() => {
    if (!selectedUsers) return;
    setSelectedUsersArr(selectedUsers); // setting prev selected users in prefilling mode
  }, [selectedUsers]);

  const findUser = (userId) => usersData.users.filter((user) => user.id === userId)[0]; // finding user object from users array by id

  const userIsSelected = (userId) => {
    const result = selectedUsersArr.filter((user) => user.id === userId)[0];
    if (result) return true;
    return false;
  }; // user is selected or not

  const switchSelectUser = (userId) => {
    if (!usersData) return;
    const isUserSelected = userIsSelected(userId);
    if (isUserSelected) {
      setSelectedUsersArr(selectedUsersArr.filter((user) => user.id !== userId));
    } else {
      setSelectedUsersArr((prevSelected) => [...prevSelected, findUser(userId)]);
    }
  }; // add user object to selected array if it not already selected and remove it if it is selected

  return (
    <Form.Item label={label} name={name} className="session-input-item">
      <Select
        placeholder="Select"
        dropdownRender={(menu) => (
          <>
            <Input
              placeholder="Search.."
              ref={searchRef}
              value={searchValue}
              onChange={changeSearchValue}
              className="search-input"
            />
            <button type="button" className="add-user flex-row-btw">
              <span>Add new speaker</span>
              <Image src={AddIcon} alt="add" />
            </button>
            <Spin spinning={loadSpin}>
              {menu}
              {usersData?.is_last_offset === false && ( // did not use ! to initiate falsy value
                <button type="button" className="load-more flex-row-c gap-10">
                  <Image src={LoadMoreIcon} alt="more" width={16} />
                  <span>Load more</span>
                </button>
              )}
            </Spin>
          </>
        )}
        popupClassName="users-select-dropdown"
        optionLabelProp="label"
        suffixIcon={<Image src={DropdownIcon} alt="dropdown" />}
        onSelect={(value) => {
          switchSelectUser(value);
        }}
      >
        {usersData?.users?.map((user) => (
          <Option key={user.id} value={user.id} label={`${user.first_name} ${user.last_name}`} className="user-option">
            <Image
              src={user.avatar || DefaultAvatar}
              alt={`${user.first_name} ${user.last_name}`}
              width={30}
              height={30}
              className="rounded"
            />
            <span className="capitalize">
              {user.first_name} {user.last_name}
            </span>
          </Option>
        ))}
      </Select>
    </Form.Item>
  );
}
