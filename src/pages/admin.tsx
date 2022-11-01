import AdminPanelUser from "../components/AdminPanelUser";
import type { GetServerSideProps } from "next";
import prisma from "../../lib/prisma";
import type {
  User,
  Prisma,
} from "../../node_modules/.pnpm/@prisma+client@4.5.0_prisma@4.5.0/node_modules/.prisma/client";

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const users: User[] = await prisma.user.findMany();
  return { props: { users } };
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

const Admin = ({ users }) => {
  console.log(users);

  const deleteUser = () => {
    users.pop();
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          User List
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {users.map((user: User) => (
            <div key={user.id} className="mt-4 flex justify-between">
              <AdminPanelUser
                id={user.id}
                name={user.name}
                blocked={user.blocked}
                admin={user.admin}
                deleteUser={deleteUser}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;
