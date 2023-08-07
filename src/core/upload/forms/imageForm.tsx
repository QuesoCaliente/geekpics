"use client";
import { Category } from "@/app/images/page";
import Alert from "@/components/alert";
import Button from "@/components/button";
import DropZone from "@/components/dropzone";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface IImageFormProps {
  categorys: Category[];
}

export function ImageForm({ categorys }: IImageFormProps) {
  const uploadPhoto = async (
    files: File[],
    nameImage: string,
    categoryImage: string
  ) => {
    const file = files[0];
    const filename = encodeURIComponent(file.name);
    const fileType = encodeURIComponent(file.type);

    const res = await fetch(
      `/api/upload?file=${filename}&fileType=${fileType}&category=${categoryImage}`
    );
    const { url, fields } = await res.json();
    const formData = new FormData();

    Object.entries({ ...fields, file }).forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    const upload = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (upload.ok) {
      const createImageResponse = await createImage(
        fields["key"],
        nameImage,
        categoryImage
      );
      if (createImageResponse.ok) {
        console.log("Upload success!");
      } else {
        console.error("Upload failed.");
      }
    } else {
      console.error("Upload failed. 2");
    }
  };

  const createImage = async (url: string, name: string, type: string) => {
    console.log("ANTES DE CREAR IMAGEN ", url, name, type);
    const res = await fetch("/api/image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url,
        name,
        type,
      }),
    });
    return res;
  };

  const [isLoading, setisLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    setisLoading(true);
    await uploadPhoto(data.files, data.name, data.category);
    setisLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-2 justify-center items-center relative"
    >
      <div>
        <label
          className="block mb-1 text-sm font-medium text-slate-200 dark:text-slate-200"
          htmlFor="name"
        >
          Nombre
        </label>
        <input
          {...register("name", {
            required: {
              value: true,
              message: "Nombre es requerido",
            },
          })}
          id="name"
          name="name"
          type="text"
          className="border-1 block h-12 w-full rounded-md border border-double border-slate-800 border-transparent bg-[linear-gradient(#000,#000),linear-gradient(to_right,#334454,#334454)]	bg-origin-border px-3 py-2 text-slate-200 transition-all duration-500 [background-clip:padding-box,_border-box] placeholder:text-slate-500 focus:bg-[linear-gradient(#000,#000),linear-gradient(to_right,#c7d2fe,#8678f9)] focus:outline-none"
          placeholder="Nombre"
        />
        {errors.name && (
          <Alert message={errors.name?.message as string} type="error" />
        )}
      </div>
      <div className="w-full">
        <label
          className="block mb-1 text-sm font-medium text-slate-200 dark:text-gray-900"
          htmlFor="category"
        >
          Categoria
        </label>
        <select
          defaultValue={"0"}
          id="category"
          {...register("category", {
            required: {
              value: true,
              message: "Categoria es requerida",
            },
          })}
          className="border-1 block h-12 w-full rounded-md border border-double border-slate-800 border-transparent bg-[linear-gradient(#000,#000),linear-gradient(to_right,#334454,#334454)]	bg-origin-border px-3 py-2 text-slate-200 transition-all duration-500 [background-clip:padding-box,_border-box] placeholder:text-slate-500 focus:bg-[linear-gradient(#000,#000),linear-gradient(to_right,#c7d2fe,#8678f9)] focus:outline-none"
        >
          <option value="0" defaultChecked disabled>
            Eligue una categoria
          </option>
          {categorys.map((category) => (
            <option
              className="text-slate-800"
              key={category.id}
              value={category.id}
            >
              {category.name}
            </option>
          ))}
        </select>
        {errors.category && (
          <Alert message={errors.category?.message as string} type="error" />
        )}
      </div>
      <DropZone
        register={register}
        onSelectedFiles={(files) => setValue("files", files)}
      />
      {errors.files && (
        <Alert message={errors.files?.message as string} type="error" />
      )}
      <Button type="submit">Upload</Button>
      {isLoading && (
        <div
          role="status"
          className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2"
        >
          <svg
            aria-hidden="true"
            className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-sky-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      )}
    </form>
  );
}
