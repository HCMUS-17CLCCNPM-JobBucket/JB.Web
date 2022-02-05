import React, { useState } from "react";

function UploadImage({ onChange }) {
  const [imageFile, setImageFile] = useState(null);
  const fileInputRef = React.useRef(null);

  const handleOpenDialog = () => {
    fileInputRef.current.click();
  };

  const onFilesAdded = (e) => {
    onChange(e.target.files[0]);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };
  const onDragLeave = (e) => {
    e.preventDefault();
  };

  const onDrop = (e) => {
    e.preventDefault();
    onChange(e.dataTransfer.files[0]);
  };
  return (
    <div className="w-full h-52">
      <div
        className="flex-1 h-full p-4 cursor-pointer mx-auto flex flex-col 
            justify-center items-center rounded-lg border-dashed border-2 border-gray-300 
            hover:border-blue-500 transition duration-300 ease-in-out"
        onClick={handleOpenDialog}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <img src="/common/photo.png" alt="photo" className="h-12 w-12 " />
        <input
          ref={fileInputRef}
          className="hidden"
          type="file"
          multiple
          onChange={onFilesAdded}
        />
        <p className="text-base font-semibold text-gray-400 mt-4">
          <span className="text-blue-600">Upload Photo(s)</span> or just drag
          and drop
        </p>
        <p className="text-red-600">support format bmp, jpg, png, pbm.</p>
      </div>
    </div>
  );
}

export default UploadImage;
