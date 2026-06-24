import { AlertDialog, Button } from "@heroui/react";
import toast from "react-hot-toast";
import { deleteArtwork } from "@/lib/api/artworks/actions";
import { FiTrash2 } from "react-icons/fi";

const DeleteArtworkModal = ({ id, title, onSuccess }) => {
  const handleDeleteArtwork = async () => {
    try {
      const res = await deleteArtwork(id);

      if (res?.deletedCount > 0) {
        toast.success("Artwork deleted successfully");

        // parent component ke notify korbe
        onSuccess?.(id);
      } else {
        toast.error("Failed to delete artwork");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <AlertDialog>
      <AlertDialog.Trigger>
        <Button
          isIconOnly
          variant="light"
          className="min-w-9 w-9 h-9 rounded-xl text-red-400 hover:bg-gradient-to-r hover:from-red-500/10 hover:to-rose-500/10 hover:text-red-300 transition-all duration-300"
        >
          <FiTrash2 size={18} />
        </Button>
      </AlertDialog.Trigger>

      <AlertDialog.Backdrop className="backdrop-blur-sm bg-black/60">
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[420px] rounded-2xl border border-[#27273A] bg-[#0C0C14] text-white shadow-2xl shadow-[#B342F2]/20">
            <AlertDialog.CloseTrigger />

            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading className="text-white font-bold text-xl">
                Delete Artwork?
              </AlertDialog.Heading>
            </AlertDialog.Header>

            <AlertDialog.Body>
              <p className="text-[#8E8E9F]">
                Are you sure you want to delete{" "}
                <strong className="text-white">{title}</strong>?
              </p>

              <p className="mt-3 text-sm text-[#8E8E9F]">
                This action cannot be undone and will permanently remove it from
                ArtHub.
              </p>

              <div className="mt-4 p-3 rounded-xl bg-[#12121C] border border-[#27273A]">
                <p className="text-xs text-[#F242C2] font-semibold">
                  ⚠ Permanent deletion warning
                </p>
              </div>
            </AlertDialog.Body>

            <AlertDialog.Footer className="flex gap-3 justify-end">
              <Button
                slot="close"
                variant="tertiary"
                className="text-[#8E8E9F] border border-[#27273A]"
              >
                Cancel
              </Button>

              <Button
                slot="close"
                onPress={handleDeleteArtwork}
                className="bg-gradient-to-r from-[#F242C2] to-[#B342F2] text-white font-bold"
              >
                Delete
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
};

export default DeleteArtworkModal;