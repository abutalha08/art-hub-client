
import { Button, Form, Input, Label, Modal, TextArea } from "@heroui/react";
// import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { FaImage } from "react-icons/fa";
const CATEGORIES = [
    "Digital Art",
    "Painting",
    "Illustration",
    "3D Art",
    "Photography",
    "Abstract",
    "Other",
  ];

const EditArtworkModal = ({ isModalOpen, setIsModalOpen, editingArtwork }) => {

    // const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();


    const onSubmit = async (data) => {

        // console.log(data?.banner, "data.banner");

        delete data?.image;
        const updateData = {
            ...data
        }
        if (data?.image) {
            const imageFile = data.image[0];
            const imageUrl = await uploadImage(imageFile)
            updateData.image = imageUrl;
        }

        const result = await updateArtwork(updateData, editingArtwork?._id)

        if (result.modifiedCount) {
            toast.success("Artwork Updated successfully...")
            // router("/artworks")
        }


    };

    return (
        <Modal isOpen={isModalOpen} onOpenChange={setIsModalOpen}>
            <Modal.Backdrop>
                <Modal.Container>
                    <Modal.Dialog className="dark text-white bg-slate-950 border border-white/10 p-6 rounded-2xl w-full max-w-lg mx-auto">
                        <div className="p-6">
                            <Form onSubmit={handleSubmit(onSubmit)} className="space-y-5 w-full">
                            
                                          {/* TITLE */}
                                          <div className="w-full">
                                            <Label className="text-[#8E8E9F] text-sm">Title</Label>
                                            <Input
                                              placeholder="Enter artwork title"
                                              className={inputClass}
                                              {...register("title", { required: "Title is required" })}
                                            />
                                            {errors.title && (
                                              <p className="text-red-400 text-xs mt-1">
                                                {errors.title.message}
                                              </p>
                                            )}
                                          </div>
                            
                                          {/* IMAGE */}
                                          <div className="w-full">
                                            <Label className="text-[#8E8E9F] text-sm">Artwork Image</Label>
                                            <Input
                                              type="file"
                                              accept="image/*"
                                              id="image"
                                              startContent={<FaImage className="text-[#8E8E9F]" />}
                                              className={inputClass}
                                              {...register("image", { required: "Image is required" })}
                                            />
                                            {errors.image && (
                                              <p className="text-red-400 text-xs mt-1">
                                                {errors.image.message}
                                              </p>
                                            )}
                                          </div>
                            
                                          {/* CATEGORY + PRICE */}
                                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                            
                                            {/* CATEGORY */}
                                            <div className="w-full">
                                              <Label className="text-[#8E8E9F] text-sm">Category</Label>
                                              <select
                                              id="category"
                                                className={inputClass}
                                                {...register("category", {
                                                  required: "Category is required",
                                                })}
                                              >
                                                {CATEGORIES.map((cat) => (
                                                  <option key={cat} value={cat}>
                                                    {cat}
                                                  </option>
                                                ))}
                                              </select>
                                            </div>
                            
                                            {/* PRICE */}
                                            <div className="w-full">
                                              <Label className="text-[#8E8E9F] text-sm">Price ($)</Label>
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
                                                <p className="text-red-400 text-xs mt-1">
                                                  {errors.price.message}
                                                </p>
                                              )}
                                            </div>
                                          </div>
                            
                                          {/* DESCRIPTION */}
                                          <div className="w-full">
                                            <Label className="text-[#8E8E9F] text-sm">Description</Label>
                                            <TextArea
                                              placeholder="Describe your artwork..."
                                              className={`${inputClass} min-h-[120px]`}
                                              {...register("description", {
                                                required: "Description is required",
                                                minLength: {
                                                  value: 20,
                                                  message: "Minimum 20 characters required",
                                                },
                                              })}
                                            />
                                            {errors.description && (
                                              <p className="text-red-400 text-xs mt-1">
                                                {errors.description.message}
                                              </p>
                                            )}
                                          </div>
                            
                                          {/* BUTTON */}
                                          <Button
                                            type="submit"
                                            className="w-full bg-gradient-to-r from-[#7928CA] via-[#B342F2] to-[#F242C2] text-white font-bold h-11 rounded-xl shadow-lg hover:opacity-90 transition"
                                          >
                                            Edit Artwork
                                          </Button>
                            
                                        </Form>
                        </div>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
};

export default EditArtworkModal;