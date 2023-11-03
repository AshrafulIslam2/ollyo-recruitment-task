import React, { useState } from "react";

const ImageGallery = ({
  setFillesCount,
  SetDeletedQueue,
  imageGallery,
  setImageGallery,
}) => {
  const [DragEnd, SetDragEnd] = useState();
  const HandaleFeatureImage = (DragS, DragE) => {
    const updatedImageGallery = [...imageGallery];
    // Swap the images
    const temp = updatedImageGallery[DragE];
    updatedImageGallery[DragE] = updatedImageGallery[DragS];
    updatedImageGallery[DragS] = temp;
    setImageGallery(updatedImageGallery);
  };
  const HandleDrang = (DragS, DragE) => {
    if (DragS !== DragE) {
      HandaleFeatureImage(DragS, DragE);
    }
  };

  //for creating a array with image object which need to delete and also used for file count
  const handleCheckboxChange = (image, isChecked) => {
    if (isChecked) {
      setFillesCount((prevCount) => prevCount + 1);
      SetDeletedQueue((prevQueue) => [...prevQueue, image]);
    } else {
      setFillesCount((prevCount) => prevCount - 1);
      SetDeletedQueue((prevQueue) =>
        prevQueue.filter((img) => img.image_id !== image.image_id)
      );
    }
  };

  return (
    <div className="grid grid-cols-3 2xl:grid-cols-5 gap-2 sm:gap-6 px-[24px]">
      {imageGallery.map((image, Index) => (
        <div
          className={` ${
            Index === 0 ? "col-span-2 row-span-2" : "col-span-1"
          } relative group `}
          key={image.image_id}
        >
          <input
            onChange={(e) => handleCheckboxChange(image, e.target.checked)}
            type="checkbox"
            className=" ml-2 mt-2 absolute w-4 h-4  hidden group-hover:block checked:block checked:z-20 group-hover:z-20"
          />
          <img
            src={image.image}
            id={image.image_id}
            draggable
            onDragEnd={() => HandleDrang(Index, DragEnd)}
            onDragEnter={() => SetDragEnd(Index)}
            className="rounded-md border border-slate-400 group-hover:brightness-75 group-hover:scale-105 transition-all duration-300  ease-in-out"
            alt="headphone"
          />
        </div>
      ))}
      <label
        htmlFor="file"
        className="w-full min-h-[200px] h-full text-[10px] sm:text-xl font-medium flex justify-center items-center border-4  gap-1 rounded-md border-dotted hover:cursor-pointer "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className=" w-4 sm:w-6  h-4 sm:h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
          />
        </svg>
        Upload
      </label>
      <input id="file" className=" invisible" type="file" />{" "}
    </div>
  );
};
export default ImageGallery;
