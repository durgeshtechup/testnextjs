import { useDisclosure } from "@chakra-ui/hooks";
import { Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/modal";
import { deleteRole } from "api/role";
import Card from "components/card";
import DivLoader from "components/divloader/DivLoader";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { MdDelete } from "react-icons/md";

const DeleteRoleModal = ({ name, id, fetchRole }: { name: string, id: string, fetchRole: () => void }) => {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState<boolean>();

  const handleDelete = () => {
    setIsLoading(true)
    deleteRole(id)
      .then((data) => {
        fetchRole();
        toast.success("Role deleted");
      })
      .catch((err) => {
        toast.error(
          err?.response?.data?.message ?? "Role deletion failed"
        );
      }).finally(() => { setIsLoading(false) }
      )
  };

  return (
    <>
      <button className="text-orange-500 outline-none dark:text-gray-200" title="Delete">
        <MdDelete
          className="h-5 w-5 cursor-pointer "
          onClick={onOpen}
        />
      </button>
      <Modal isOpen={isOpen} onClose={() => { }}>
        <ModalOverlay className="bg-[#000] !opacity-30" />
        <ModalContent className="z-[1002] !m-auto !p-3 sm:my-8 sm:w-full max-w-[800px] sm:max-w-xxl flex justify-center min-h-[100vh]">
          <ModalBody>

            <Card extra="px-[30px] pt-[35px] pb-[35px] max-w-[800px]  flex flex-col !z-[1004]">
              <h1 className="mb-[20px] text-2xl font-bold">
                Delete Role
              </h1>
              <p>
                This will delete the role <strong>{name}</strong> which is irreversible action. Do you still want to continue?
              </p>

              <div className="mt-5 flex gap-2">
                <button
                  onClick={onClose}
                  className="outline-none linear rounded-xl bg-gray-100 px-5 py-2 text-base font-medium text-navy-700 transition duration-200 hover:bg-gray-200 active:bg-gray-300 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/30"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="disabled:opacity-50 outline-none linear rounded-xl bg-red-50 px-5 py-2 text-base font-medium text-red-500 transition duration-200 hover:bg-red-600/5 active:bg-red-700/5 dark:bg-red-400/10 dark:text-white dark:hover:bg-red-300/10 dark:active:bg-red-200/10"
                >
                  {isLoading ? (
                    <DivLoader className="h-6 w-6 border-red-400" />
                  ) : (
                    "Delete"
                  )}
                </button>
              </div>
            </Card>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
export default DeleteRoleModal;
