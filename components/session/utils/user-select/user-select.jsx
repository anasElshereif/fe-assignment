import { Select, Form, Spin, message } from 'antd';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import UserSearch from './user-search';
import SelectedUsers from './selected-users';
import AddIcon from '../../../../public/icons/gray-add.svg';
import DropdownIcon from '../../../../public/icons/vector.svg';
import LoadMoreIcon from '../../../../public/icons/reload.svg';
import DefaultAvatar from '../../../../public/icons/default-user.svg';
import AddUser from './add-user';
import UsersService from '../../../../services/users/users';

const { Option } = Select;

export default function UserSelect({
  label,
  name,
  users,
  selectedUsers,
  addUsers,
  updateUsersData,
  updateSelectedUsers,
  resetSelectedUsers,
}) {
  // users state
  const [loadSpin, setLoadSpin] = useState(true);
  const [usersData, setUsersData] = useState();
  const [usersOptions, setUsersOptions] = useState();
  const [holder, setHolder] = useState(true);
  useEffect(() => {
    setHolder(false);
  }, []);

  // selected users
  const [selectedUsersArr, setSelectedUsersArr] = useState([]);
  useEffect(() => {
    if (!selectedUsers) return;
    setSelectedUsersArr(selectedUsers); // setting prev selected users in prefilling mode
  }, [selectedUsers]);

  useEffect(() => {
    if (holder) return;
    updateSelectedUsers(selectedUsersArr);
  }, [selectedUsersArr]); // update selected values passing it to parent form

  // reset selected users on form submit
  useEffect(() => {
    if (!resetSelectedUsers) return;
    setSelectedUsersArr([]);
  }, [resetSelectedUsers]);

  const findUser = (userId) => usersOptions.filter((user) => user.id === userId)[0]; // finding user object from users array by id

  const userInArray = (userId, list) => {
    const result = list.filter((user) => user.id === userId)[0];
    if (result) return true;
    return false;
  }; // user is selected or not

  const unSelectUser = (userId) => {
    const updatedValues = selectedUsersArr.filter((user) => user.id !== userId);
    setSelectedUsersArr(updatedValues);
    message.success(`Successfully removed user from ${label}s`);
  }; // remove user from selected list

  const selectUser = (userId) => {
    setSelectedUsersArr((prevSelected) => [...prevSelected, findUser(userId)]);
    message.success(`Successfully added user to ${label}s`);
  }; // add user to selected list

  const switchSelectUser = (userId) => {
    if (!usersData) return;
    const isUserSelected = userInArray(userId, selectedUsersArr);
    if (isUserSelected) {
      unSelectUser(userId);
    } else {
      selectUser(userId);
    }
  }; // add user object to selected array if it not already selected and remove it if it is selected

  // add user
  const [openAddUser, setOpenAddUser] = useState(false);
  const switchAddUser = (type) => {
    if (type === 'close') {
      setOpenAddUser(false);
      return;
    }
    setOpenAddUser((current) => !current);
  };

  const pushNewUser = (user) => {
    addUsers(user);
  }; // pushing new created user to the first of the users array in parent component to pass updated data to all components

  // load more
  const [preservedFilteredData, setPreservedFilteredData] = useState();
  const [searchQuery, setSearchQuery] = useState();
  const [searchResult, setSearchResult] = useState();

  const loadMore = () => {
    setLoadSpin(true);
    if (searchQuery && searchQuery.length > 0) {
      UsersService.SearchUsers(searchQuery, usersData.number)
        .then((res) => {
          const { data } = res;
          const filteredUsers = data.users.filter((user) => !userInArray(user.id, usersOptions));
          const filteredData = { ...data, users: [...filteredUsers] };
          setUsersData((prevData) => ({
            ...filteredData,
            users: [...prevData.users, ...filteredData.users],
          }));
          setUsersOptions((prevUsers) => [...prevUsers, ...filteredUsers]);
        })
        .catch(() => {
          message.error('Error occurred while searching');
        })
        .finally(() => {
          setLoadSpin(false);
        });
    } else {
      UsersService.GetUsers(usersData.number)
        .then((res) => {
          const { data } = res;
          const filteredUsers = data.users.filter((user) => !userInArray(user.id, users.users));
          const filteredData = { ...data, users: [...filteredUsers] };
          setPreservedFilteredData(filteredData);
          updateUsersData(filteredData);
        })
        .catch(() => {
          message.error('Error occurred while fetching users');
        })
        .finally(() => {
          setLoadSpin(false);
        });
    }
  }; // load more function fetches data with offset margin and pass it to parent to update new data in all other user selects. It filters date from duplicates in case user was added at first then loaded again later in load more function

  // search
  useEffect(() => {
    if (!users) return;
    if (searchQuery && searchQuery.length > 0) return;
    setUsersData(users);
    setUsersOptions(users.users);
  }, [users, searchQuery]);

  useEffect(() => {
    if (!users) return;
    setLoadSpin(false);
  }, [users]);

  useEffect(() => {
    if (searchResult) {
      setUsersData(searchResult);
      setUsersOptions(searchResult.users);
    } else {
      if (!preservedFilteredData) return;
      setUsersData({});
      updateUsersData({ ...preservedFilteredData, preserve: true }); // to preserve and restore old users after search is empty
    }
  }, [searchResult]);

  // dropdown render
  const dropdownRender = (menu) => (
    <>
      <UserSearch
        searchQuery={(query) => {
          setSearchQuery(query);
        }}
        searchResult={(result) => {
          setSearchResult(result);
          if (result.users.length === 0) {
            setUsersData((preserved) => ({ ...preserved, users: [] }));
            setUsersOptions([]);
          }
        }}
        loading={(loading) => {
          setLoadSpin(loading);
        }}
        name={name}
      />
      <button type="button" className="add-user flex-row-btw" onClick={switchAddUser}>
        <span>Add new {label}</span>
        <Image src={AddIcon} alt="add" />
      </button>
      <Spin spinning={loadSpin}>
        {menu}
        {usersData?.is_last_offset === false && ( // did not use ! to initiate falsy value
          <button type="button" className="load-more flex-row-c gap-10" onClick={loadMore}>
            <Image src={LoadMoreIcon} alt="more" width={16} />
            <span>Load more</span>
          </button>
        )}
      </Spin>
    </>
  );

  return (
    <div className="session-input-item">
      <Form.Item
        label={label}
        name={name}
        className="mb-0"
        rules={[
          {
            required: true,
            message: `Please select ${label} !`,
          },
        ]}
      >
        <Select
          placeholder="Select"
          dropdownRender={(menu) => dropdownRender(menu)}
          popupClassName="users-select-dropdown"
          optionLabelProp="label"
          suffixIcon={<Image src={DropdownIcon} alt="dropdown" />}
          onSelect={(value) => {
            switchSelectUser(value);
          }}
        >
          {usersOptions?.map((user) => (
            <Option
              key={user.id}
              value={user.id}
              label={`${user.first_name} ${user.last_name}`}
              className={`user-option ${userInArray(user.id, selectedUsersArr) && 'selected-user-option'}`}
            >
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
      {selectedUsersArr?.length > 0 && (
        <SelectedUsers
          selectedUsers={selectedUsersArr}
          label={label}
          unSelectedUser={(userId) => {
            unSelectUser(userId);
          }}
        />
      )}
      <AddUser
        open={openAddUser}
        label={label}
        close={() => {
          switchAddUser('close');
        }}
        pushUser={(user) => {
          pushNewUser(user);
        }}
      />
    </div>
  );
}
