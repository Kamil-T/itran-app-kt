import { Fragment, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Toggle from "./Toggle";
Toggle;

interface EditProps {
  id: string;
  blockedStatus: boolean;
  setBlockedStatus: Dispatch<SetStateAction<boolean>>;
  adminStatus: boolean;
  setAdminStatus: Dispatch<SetStateAction<boolean>>;
  handleUpdate: (id: string, admin: boolean, blocked: boolean) => Promise<void>;
}

const Edit = ({
  id,
  blockedStatus,
  setBlockedStatus,
  adminStatus,
  setAdminStatus,
  handleUpdate,
}: EditProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isBlocked, setIsBlocked] = useState(blockedStatus);
  const [isAdmin, setIsAdmin] = useState(blockedStatus);

  const onSave = async () => {
    await handleUpdate(id, isBlocked, isAdmin);
    setBlockedStatus(isBlocked);
    setAdminStatus(isAdmin);
    setIsOpen(false);
  };

  const closeModal = () => {
    setIsOpen(false);
    setIsBlocked(blockedStatus);
    setIsAdmin(adminStatus);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <>
      <span className=" inset-0 flex basis-1/6 items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Edit user
        </button>
      </span>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Edit User
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">Change user access?</p>
                  </div>
                  <div>
                    <Toggle
                      name={"Block"}
                      isEnabled={isBlocked}
                      setIsEnabled={setIsBlocked}
                    />

                    <Toggle
                      name={"Admin"}
                      isEnabled={isAdmin}
                      setIsEnabled={setIsAdmin}
                    />
                  </div>

                  <div className="mt-4 flex gap-7">
                    <button
                      type="button"
                      className="justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={onSave}
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Edit;
