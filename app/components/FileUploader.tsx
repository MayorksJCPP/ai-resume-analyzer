import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { formatSize } from "../lib/util";

interface FileUploaderProps {
  onFileSelect?: (file: File | null) => void;
}

const FileUploader = ({ onFileSelect }: FileUploaderProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0] || null;
      onFileSelect?.(file);
    },
    [onFileSelect],
  );

  const maxFileSize = 20 * 1024 * 1024; // 20 MB

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      onDrop,
      multiple: false,
      accept: { "application/pdf": [".pdf"] },
      maxSize: maxFileSize, // 20 MB
    });
  const file = acceptedFiles[0] || null;
  return (
    <div className="w-full gradient-border">
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <div className="space-y-4 cursor-pointer">
          <div className="h-16 flex items-center justify-center w-16 mx-auto">
            <img src="/icons/info.svg" alt="upload" className="size-20 mb-2" />
          </div>
          {file ? (
            <div
              className=" uploader-selected-file"
              onClick={(e) => e.stopPropagation()}
            >
              <img src="/images/pdf.png" alt="pdf" className="size-10" />
              <div className="flex flex-wrap items-center space-x-3">
                {/* <div>
                  <p className="text-xs font-medium text-gray-700 truncate max-w-xs"></p>
                </div>
                   */}
                <p className="text-sm max-sm:text-xs md:text-lg text-gray-700 font-medium truncate">
                  {file.name}
                </p>
                <p className="text-sm text-gray-500">{formatSize(file.size)}</p>
              </div>
              <button
                className="p-2 cursor-pointer"
                onClick={(e) => {
                  onFileSelect?.(null);
                }}
              >
                <img src="/icons/cross.svg" alt="remove" className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div>
              <p className="text-lg ">
                <span className="font-semibold">Click to Upload</span> or drag
                and drop your resume here
              </p>
              <p className="text-lg text-gray-500">
                PDF (max {formatSize(maxFileSize)})
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUploader;
