import React, { useEffect } from "react";
import { uploadImage } from "@/utils/uploadImage";
import { updateArtwork } from "@/lib/api/artworks/actions"; 
import { Button, Form, Input, Label, Modal, TextArea } from "@heroui/react";
import { useForm } from "react-hook-form";
import { FaImage } from "react-icons/fa";
import toast from "react-hot-toast"; 

const CATEGORIES = [
  "Digital Art",
  "Painting",
  "Illustration",
  "3D Art",
  "Photography",
  "Abstract",
  "Other",
];

const inputClass = "w-full bg-slate-900 border border-white/10 rounded-xl text-white px-3 py-2 focus:outline-none focus:border-purple-500 transition";

const EditArtworkModal = ({ isModalOpen, setIsModalOpen, editingEvent, loadArtworks }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  
  useEffect(() => {
    if (editingEvent && isModalOpen) {
      reset({
        title: editingEvent.title,
        category: editingEvent.category,
        price: editingEvent.price,
        description: editingEvent.description,
      });
    }
  }, [editingEvent, isModalOpen, reset]);

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const onSubmit = async (data) => {
    try {
      const updateData = {
        title: data.title,
        category: data.category,
        price: Number(data.price),
        description: data.description,
      };

      if (data?.image && data.image.length > 0) {
        const imageFile = data.image[0];
        const imageUrl = await uploadImage(imageFile);
        updateData.image = imageUrl;
      }

      const result = await updateArtwork(updateData, editingEvent?._id);

      if (result?.modifiedCount || result?.matchedCount) {
        toast.success("Artwork Updated successfully...");
        handleClose(); 
        if (loadArtworks) loadArtworks();
      } else {
        toast.error("No changes were made.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    // preventClose={false} 
    <Modal 
      isOpen={isModalOpen} 
      onOpenChange={setIsModalOpen}
      preventClose={false} 
      scrollBehavior="normal"
    >
      <Modal.Backdrop onClick={handleClose}>
        <Modal.Container>
          <Modal.Dialog className="dark text-white bg-slate-950 border border-white/10 p-6 rounded-2xl w-full max-w-lg mx-auto relative">
            
            {/* মোডাল ক্লোজ বাটন */}
            <button 
              type="button" 
              onClick={handleClose} 
              className="absolute top-4 right-4 text-[#8E8E9F] hover:text-white transition"
            >
              ✕
            </button>

            <div className="p-2">
              <h3 className="text-lg font-bold mb-5 text-white">Edit Artwork</h3>
              
              <Form onSubmit={handleSubmit(onSubmit)} className="space-y-5 w-full">
                
                {/* TITLE */}
                <div className="w-full">
                  <Label className="text-[#8E8E9F] text-sm mb-1 block">Title</Label>
                  <Input
                    placeholder="Enter artwork title"
                    className={inputClass}
                    {...register("title", { required: "Title is required" })}
                  />
                  {errors.title && (
                    <p className="text-red-400 text-xs mt-1">{errors.title.message}</p>
                  )}
                </div>

                {/* IMAGE */}
                <div className="w-full">
                  <Label className="text-[#8E8E9F] text-sm mb-1 block">Artwork Image</Label>
                  <Input
                    type="file"
                    accept="image/*"
                    id="image"
                    startContent={<FaImage className="text-[#8E8E9F]" />}
                    className={inputClass}
                    {...register("image")} 
                  />
                </div>

                {/* CATEGORY + PRICE */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                  {/* CATEGORY */}
                  <div className="w-full">
                    <Label className="text-[#8E8E9F] text-sm mb-1 block">Category</Label>
                    <select
                      id="category"
                      className="w-full h-[40px] bg-slate-900 border border-white/10 rounded-xl text-white px-2 focus:outline-none"
                      {...register("category", { required: "Category is required" })}
                    >
                      {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat} className="bg-slate-950">
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* PRICE */}
                  <div className="w-full">
                    <Label className="text-[#8E8E9F] text-sm mb-1 block">Price ($)</Label>
                    <Input
                      type="number"
                      placeholder="0.00"
                      className={inputClass}
                      {...register("price", {
                        required: "Price is required",
                        valueAsNumber: true,
                        min: { value: 0, message: "Price cannot be negative" },
                      })}
                    />
                    {errors.price && (
                      <p className="text-red-400 text-xs mt-1">{errors.price.message}</p>
                    )}
                  </div>
                </div>

                {/* DESCRIPTION */}
                <div className="w-full">
                  <Label className="text-[#8E8E9F] text-sm mb-1 block">Description</Label>
                  <TextArea
                    placeholder="Describe your artwork..."
                    className={`${inputClass} min-h-[120px]`}
                    {...register("description", {
                      required: "Description is required",
                      minLength: { value: 20, message: "Minimum 20 characters required" },
                    })}
                  />
                  {errors.description && (
                    <p className="text-red-400 text-xs mt-1">{errors.description.message}</p>
                  )}
                </div>

                {/* ACTION BUTTONS */}
                <div className="flex gap-3 justify-end mt-4">
                  <Button 
                    type="button" 
                    variant="flat" 
                    className="bg-white/5 border border-white/10 text-white rounded-xl font-semibold"
                    onPress={handleClose}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-[#7928CA] via-[#B342F2] to-[#F242C2] text-white font-bold h-11 rounded-xl shadow-lg hover:opacity-90 transition"
                  >
                    Edit Artwork
                  </Button>
                </div>

              </Form>
            </div>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

export default EditArtworkModal;