import Image from 'next/image';
import { Popconfirm } from 'antd';
import DefaultAvatar from '../../../../public/icons/default-user.svg';
import DeleteIcon from '../../../../public/icons/delete.svg';

export default function SelectedUsers({ selectedUsers, label, unSelectedUser }) {
  const confirm = (id) => {
    unSelectedUser(id);
  };
  return (
    <section className="mt-10 flex-col gap-5 selected-users">
      {selectedUsers?.map((user) => (
        <div className="flex align-center gap-10 selected-user">
          <div className="user-card flex gap-10 align-center">
            <Image
              src={user.avatar || DefaultAvatar}
              alt={`${user.first_name} ${user.last_name}`}
              width={34}
              height={34}
              className="rounded"
            />
            <span className="capitalize wc">
              {user.first_name} {user.last_name}
            </span>
          </div>

          <Popconfirm
            title={`Are you sure to remove this ${label} ?`}
            onConfirm={() => confirm(user.id)}
            okText="Yes"
            cancelText="No"
          >
            <button type="button">
              <Image src={DeleteIcon} alt="delete" />
            </button>
          </Popconfirm>
        </div>
      ))}
    </section>
  );
}
