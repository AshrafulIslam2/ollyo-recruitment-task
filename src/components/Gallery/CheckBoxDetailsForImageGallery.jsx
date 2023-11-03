import React, { useState } from "react";
import { imageGallery } from "../../FakeData/ImageGalleryFakeData";
import toast, { Toaster } from "react-hot-toast";
import Gallery from "./Gallery";

const ImageGalleryWithCheckboxDetails = () => {
  const [ImageGallery, setImageGallery] = useState(imageGallery);
  const [FillesCount, setFillesCount] = useState(0);
  const [DeleteQueue, SetDeletedQueue] = useState([]);
  //This function used for delete multiple images
  const handleDelete = () => {
    const filteredImageGallery = imageGallery.filter((image) => {
      return !DeleteQueue.some(
        (itemToDelete) => itemToDelete.image_id === image.image_id
      );
    });
    setImageGallery(filteredImageGallery);
    //toast for confirmation after delete
    toast.error(`${FillesCount} images deleted 😭`);
    setFillesCount(0);
  };

  return (
    <div>
      <Toaster position="top-right" />
      <div className="flex justify-between px-[24px]">
        <div className="flex gap-x-2 ">
          {FillesCount > 0 && (
            <input type="checkbox" className="w-4" defaultChecked />
          )}
          {FillesCount > 0 ? (
            <h1 className="font-semibold text-base">
              {FillesCount} File{FillesCount !== 1 ? "s" : ""} Selected
            </h1>
          ) : (
            <h1 className="font-semibold font-mono tracking-[10px] text-2xl">
              Gallery
            </h1>
          )}
        </div>
        <div>
          <button
            className="text-base text-red-500"
            onClick={() => handleDelete()}
          >
            Delete File{FillesCount !== 1 ? "s" : ""}
          </button>
        </div>
      </div>
      <hr className="my-[30px]"></hr>

      {/* Gallery Grid */}
      <Gallery
        setFillesCount={setFillesCount}
        imageGallery={ImageGallery}
        setImageGallery={setImageGallery}
        SetDeletedQueue={SetDeletedQueue}
      />
    </div>
  );
};

export default ImageGalleryWithCheckboxDetails;
