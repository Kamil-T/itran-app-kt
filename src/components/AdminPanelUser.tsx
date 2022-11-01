import { User } from "@prisma/client";
import { Dispatch, SetStateAction, useState } from "react";
import Edit from "./Edit";

interface UserProps {
  id: string;
  name: string;
  email: string;
  blocked: boolean;
  admin: boolean;
  handleDelete: (id: any) => Promise<void>;
}

const AdminPanelUser = ({
  id,
  name,
  email,
  blocked,
  admin,
  handleDelete,
}: UserProps) => {
  const [adminStatus, setAdminStatus] = useState(admin);
  const [blockedStatus, setBlockedStatus] = useState(blocked);
  console.log(blockedStatus);

  return (
    <>
      <span className="basis-1/4">{name}</span>
      <span className="basis-1/4">{email}</span>
      <span className="basis-1/12">{blockedStatus ? "Yes" : "No"}</span>
      <span className="basis-1/12">{adminStatus ? "Yes" : "No"}</span>
      <Edit
        blockedStatus={blockedStatus}
        adminStatus={adminStatus}
        setBlockedStatus={setBlockedStatus}
        setAdminStatus={setAdminStatus}
      />
      <span className=" inset-0 flex basis-1/6 items-center justify-center">
        <button
          type="button"
          onClick={() => handleDelete(id)}
          className="rounded-md bg-black bg-opacity-70 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Delete
        </button>
      </span>
    </>
  );
};

export default AdminPanelUser;
