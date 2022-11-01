import AdminPanelUser from "../components/AdminPanelUser";
import type { GetServerSideProps } from "next";
import prisma from "../../lib/prisma";
import type {
  User,
  Prisma,
} from "../../node_modules/.pnpm/@prisma+client@4.5.0_prisma@4.5.0/node_modules/.prisma/client";
import { useState } from "react";

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const users: User[] = await prisma.user.findMany();
  return { props: { initialUsers: users } };
};

const saveUser = async (user: Prisma.UserCreateInput) => {
  const response = await fetch("/api/users", {
    method: "POST",
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
};

const deleteUser = async (id: string): Promise<void> => {
  const response = await fetch("/api/deleteUser/", {
    method: "DELETE",
    body: JSON.stringify(id),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
};
const saveUserStatus = async (id: string, blocked: boolean, admin: boolean) => {
  const userData = { id, blocked, admin };

  const response = await fetch("/api/editUserStatus", {
    method: "PATCH",
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
};

const Admin = ({ initialUsers }) => {
  const [users, setUsers] = useState<User[]>(initialUsers);

  const handleDelete = async (id) => {
    await deleteUser(id);
    await setUsers(
      users.filter((user) => {
        return user.id !== id;
      })
    );
  };

  const handleUpdate = async (id: string, blocked: boolean, admin: boolean) => {
    await saveUserStatus(id, blocked, admin);
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          User List
        </h2>

        <div className="mt-6 flex flex-col justify-center gap-5">
          <div className="mt-4 flex items-center">
            <span className="basis-1/4">Name</span>
            <span className="basis-1/4">E-mail</span>
            <span className="basis-1/12">Blocked</span>
            <span className="basis-1/12">Admin</span>
          </div>
          {users?.map((user: User) => (
            <div key={user.id} className="mt-4 flex items-center">
              <AdminPanelUser
                id={user.id}
                name={user.name}
                email={user.email}
                blocked={user.blocked}
                admin={user.admin}
                handleDelete={handleDelete}
                handleUpdate={handleUpdate}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;
