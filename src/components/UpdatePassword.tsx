import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updatePassword } from "../utils/apiUtils";

export default function Profile() {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const cancelButtonRef = useRef(null);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    updatePassword(currentPassword, newPassword).then((res) => {
      console.log(res.status, res.ok);
      if (res.status === "error") {
        toast.error("Incorrect current password.", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else {
        navigate("/");
      }
    });
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={() => {
          setOpen(false);
          navigate(-1);
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-[#0D1117] bg-opacity-75 transition-opacity " />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full  items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative bg-black items-center justify-center flex border border-gray-700 transform overflow-hidden pr-4 rounded-xl text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl">
                <div className="px-4 pb-4 pt-5 sm:p-6 sm:pb-4 ">
                  <div className="sm:flex  sm:items-start my-5">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left ">
                      <h1 className="font-bold text-xl text-white">
                        Update Password
                      </h1>
                      <form className="py-7">
                        <div>
                          <label className="block text-gray-300 font-semibold mb-2">
                            Current Password:
                          </label>
                          <input
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            value={currentPassword}
                            type="password"
                            id="curr_password"
                            className="w-full border border-1 border-gray-700 bg-[#141414] rounded-md py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-300 font-normal pt-4 mb-2">
                            New Password:
                          </label>
                          <input
                            onChange={(e) => setNewPassword(e.target.value)}
                            value={newPassword}
                            type="password"
                            id="password"
                            className="w-full border border-1 border-gray-700 bg-[#141414] rounded-md py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
                          />
                        </div>

                        <button
                          onClick={(e) => handleSubmit(e)}
                          className="w-full mt-7 bg-white border border-1 border-gray-700 text-black font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-gray "
                        >
                          Update
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
          <ToastContainer />
        </div>
      </Dialog>
    </Transition.Root>
  );
}
