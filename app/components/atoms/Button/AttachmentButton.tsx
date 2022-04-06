import React, { useRef } from "react";

export default function AttachmentButton({ onClick, files }) {
  const ref = useRef(null);

  const handleAttachFile = () => {
    //
    ref.current.click();
    // onClick(ref.current.files);
  };
  return (
    <div>
      <button className="font-semibold" onClick={handleAttachFile}>
        @Attachments {"-" + files.length && files.length + " files"}
      </button>
      <input
        type="file"
        multiple
        onChange={onClick}
        className="hidden"
        ref={ref}
      />
    </div>
  );
}
