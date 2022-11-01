import { useState } from "react";
import Edit from "./Edit";

interface UserProps {
  id: string;
  name: string;
  blocked: boolean;
  admin: boolean;
  deleteUser: () => void;
}

const AdminPanelUser = ({
  id,
  name,
  blocked,
  admin,
  deleteUser,
}: UserProps) => {
  const [adminStatus, setAdminStatus] = useState(admin);
  const [blockedStatus, setBlockedStatus] = useState(blocked);
  console.log(blockedStatus);

  return (
    <>
      <span>{name}</span>
      <span>{blockedStatus ? "Yes" : "No"}</span>
      <span>{adminStatus ? "Yes" : "No"}</span>
      <Edit
        blockedStatus={blockedStatus}
        adminStatus={adminStatus}
        setBlockedStatus={setBlockedStatus}
        setAdminStatus={setAdminStatus}
      />
      <span className=" inset-0 flex items-center justify-center">
        <button
          type="button"
          onClick={deleteUser}
          className="rounded-md bg-black bg-opacity-70 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Delete
        </button>
      </span>
    </>
  );
};

export default AdminPanelUser;
