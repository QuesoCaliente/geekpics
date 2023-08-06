"use client";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FieldValues, UseFormRegister } from "react-hook-form";

interface IDropZoneProps {
  onSelectedFiles?: (files: File[]) => void;
  register: UseFormRegister<FieldValues>;
}

export default function DropZone({
  onSelectedFiles,
  register,
}: IDropZoneProps) {
  const [preview, setPreview] = useState("");

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setPreview(URL.createObjectURL(acceptedFiles[0]));
      onSelectedFiles && onSelectedFiles(acceptedFiles);
    },
    [onSelectedFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    multiple: false,
  });
  return (
    <>
      <div className="relative h-48 w-48 overflow-hidden rounded-xl border border-slate-800 p-[1px] backdrop-blur-3xl">
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
        <div
          {...getRootProps()}
          className="inline-flex h-full w-full items-center justify-center rounded-xl bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl"
        >
          <input
            {...register("files", {
              required: {
                value: true,
                message: "Imagen es requerida",
              },
            })}
            {...getInputProps()}
          />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag and drop some files here, or click to select files</p>
          )}
        </div>
      </div>
      {preview && (
        <div className="relative h-48 w-48 overflow-hidden rounded-xl border border-slate-800 p-[1px] backdrop-blur-3xl">
          <img
            src={preview}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      )}
    </>
  );
}
