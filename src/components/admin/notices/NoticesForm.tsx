"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import imgFaustiForm from "@/assets/images/img6.jpg";
import { Notice, NoticeImage } from "@/types/notice";

interface FormData {
  title: string;
  description: string;
  content: string;
  // Campos EN opcionales para corrección manual
  titleEn: string;
  descriptionEn: string;
  contentEn: string;
  category: string;
  isActive: boolean;
}

interface Props {
  noticeSelected: Notice | null;
  onSaved: (notice: Notice, isEdit: boolean) => void;
  onCancel: () => void;
}

export default function NoticesForm({
  noticeSelected,
  onSaved,
  onCancel,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const [images, setImages] = useState<NoticeImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);
  const [langTab, setLangTab] = useState<"es" | "en">("es");

  useEffect(() => {
    if (noticeSelected) {
      reset({
        // Los campos ES van al form principal
        title: noticeSelected.title.es,
        description: noticeSelected.description.es,
        content: noticeSelected.content.es,
        // Los campos EN permiten corrección manual
        titleEn: noticeSelected.title.en,
        descriptionEn: noticeSelected.description.en,
        contentEn: noticeSelected.content.en,
        category: noticeSelected.category,
        isActive: noticeSelected.isActive,
      });
      setImages(noticeSelected.images || []);
    } else {
      reset();
      setImages([]);
    }
    setLangTab("es");
  }, [noticeSelected, reset]);

  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || !files.length) return;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "FaustinoOro");
    data.append("folder", "FaustinoOro");
    setLoadingImage(true);
    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/najdorf/image/upload",
        {
          method: "POST",
          body: data,
        },
      );
      const file = await res.json();
      setImages((prev) => [
        ...prev,
        { public_id: file.public_id, secure_url: file.secure_url },
      ]);
    } catch {
      alert("Error al subir la imagen");
    } finally {
      setLoadingImage(false);
    }
  };

  const handleDeleteImage = async (img: NoticeImage) => {
    setImages((prev) => prev.filter((i) => i.public_id !== img.public_id));
    try {
      await fetch(
        `/api/notices/delete-image/${encodeURIComponent(img.public_id)}`,
        { method: "DELETE" },
      );
    } catch (error) {
      console.error("Error eliminando imagen", error);
    }
  };

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    const isEdit = !!noticeSelected;

    const payload = {
      title: data.title,
      description: data.description,
      content: data.content,
      category: data.category,
      isActive: data.isActive,
      images: images.length ? images : noticeSelected?.images || [],
      // Solo en edición enviamos las traducciones manuales corregidas
      ...(isEdit && {
        titleEn: data.titleEn,
        descriptionEn: data.descriptionEn,
        contentEn: data.contentEn,
      }),
    };

    try {
      const res = await fetch(
        isEdit ? `/api/notices/${noticeSelected?._id}` : "/api/notices",
        {
          method: isEdit ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
      const saved = await res.json();
      onSaved(saved, isEdit);
      reset({
        title: "",
        description: "",
        content: "",
        titleEn: "",
        descriptionEn: "",
        contentEn: "",
        category: "",
        isActive: false,
      });
      setImages([]);
      setLangTab("es");
    } catch {
      alert("Error al guardar la noticia");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "peer h-10 w-full border-b-2 border-sky-700 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-zinc-100";
  const labelClass =
    "absolute left-0 -top-3.5 text-white text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-300 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-white peer-focus:text-sm";

  return (
    <section className="w-full flex items-center justify-center px-3 sm:px-4 py-12 lg:pt-18">
      <section className="w-full font-satoshi relative rounded-xl border-zinc-700 shadow-lg shadow-zinc-900 border-3 overflow-hidden py-6 px-3 sm:px-4 space-y-6 md:space-y-7 md:w-140 lg:w-200 xl:w-240 xl:px-8 z-50 3xl:w-260">
        <div className="absolute inset-0 bg-zinc-800/80 z-30 h-full" />
        <figure className="absolute inset-0 w-full h-full z-20">
          <Image
            src={imgFaustiForm}
            alt="img-Fausti-form"
            className="w-full h-full z-20 object-cover object-center opacity-70"
          />
        </figure>

        <div className="lg:py-2">
          <h6 className="text-center relative z-50 text-6xl font-medium text-zinc-200 md:text-6xl lg:text-7xl xl:text-8xl 3xl:text-[7rem]">
            NOTICIAS
          </h6>
          <div className="flex items-center gap-2 relative z-100 mt-3 lg:mt-5 lg:gap-4">
            <div className="flex-1 h-px bg-zinc-300" />
            <p className="text-center relative z-50 text-zinc-300 text-sm md:text-base lg:text-xl lg:font-medium 3xl:text-2xl">
              {noticeSelected
                ? "Editar noticia"
                : "Comparte las últimas novedades"}
            </p>
            <div className="flex-1 h-px bg-zinc-300" />
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-7 relative z-50"
        >
          {/* ── Tabs de idioma (solo en edición) ── */}
          {noticeSelected && (
            <div className="flex gap-2 border-b border-zinc-600">
              <button
                type="button"
                onClick={() => setLangTab("es")}
                className={`px-4 py-1.5 text-sm font-medium rounded-t transition-colors ${langTab === "es" ? "bg-sky-800 text-white" : "text-zinc-400 hover:text-zinc-200"}`}
              >
                🇦🇷 Español
              </button>
              <button
                type="button"
                onClick={() => setLangTab("en")}
                className={`px-4 py-1.5 text-sm font-medium rounded-t transition-colors ${langTab === "en" ? "bg-sky-800 text-white" : "text-zinc-400 hover:text-zinc-200"}`}
              >
                🇺🇸 English
              </button>
              <span className="ml-auto text-xs text-zinc-500 self-center pr-1">
                EN se auto-traduce al publicar
              </span>
            </div>
          )}

          {/* ── Campos en ESPAÑOL (siempre visibles en creación; tab ES en edición) ── */}
          <div
            className={
              noticeSelected && langTab === "en" ? "hidden" : "block space-y-7"
            }
          >
            <div className="flex flex-col gap-8 lg:flex-row">
              <div className="relative font-medium lg:w-1/2">
                <input
                  autoComplete="off"
                  placeholder="Título"
                  className={inputClass}
                  {...register("title", { required: "El título es requerido" })}
                />
                <label className={labelClass}>Título</label>
                {errors.title && (
                  <p className="text-red-400 text-sm mt-1 absolute top-1 right-1">
                    {errors.title.message}
                  </p>
                )}
              </div>
              <div className="relative font-medium lg:w-1/2">
                <input
                  autoComplete="off"
                  placeholder="Categoría"
                  className={inputClass}
                  {...register("category", {
                    required: "La categoría es requerida",
                  })}
                />
                <label className={labelClass}>Categoría</label>
                {errors.category && (
                  <p className="text-red-400 text-sm mt-1 absolute top-1 right-1">
                    {errors.category.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-6 lg:flex-row">
              <div className="relative font-medium lg:w-1/2">
                <input
                  autoComplete="off"
                  placeholder="Descripción"
                  className={inputClass}
                  {...register("description", {
                    required: "La descripción es requerida",
                  })}
                />
                <label className={labelClass}>
                  Descripción <span className="text-zinc-400">(Subtítulo)</span>
                </label>
                {errors.description && (
                  <p className="text-red-400 text-sm mt-1 absolute top-1 right-1">
                    {errors.description.message}
                  </p>
                )}
              </div>
              <div className="relative font-medium flex gap-6 items-end">
                <p className="text-zinc-300">Está activa?</p>
                <label className="container-checkbox">
                  <input
                    autoComplete="off"
                    type="checkbox"
                    {...register("isActive")}
                  />
                  <svg viewBox="0 0 64 64" height="2em" width="2em">
                    <path
                      d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
                      pathLength="575.0541381835938"
                      className="path"
                    />
                  </svg>
                </label>
              </div>
            </div>

            <div className="relative">
              <label className="text-zinc-300 mb-2 block font-medium">
                Contenido
              </label>
              <textarea
                placeholder="Contenido de la noticia"
                className="w-full border-2 bg-zinc-800/30 text-zinc-200 rounded-lg p-2 placeholder:text-zinc-400 text-base font-medium border-sky-700 h-full min-h-32 lg:min-h-36"
                {...register("content", {
                  required: "El contenido es requerido",
                })}
              />
              {errors.content && (
                <p className="text-red-400 text-sm mt-1 absolute bottom-3 left-3">
                  {errors.content.message}
                </p>
              )}
            </div>
          </div>

          {/* ── Campos EN (solo en edición, tab EN) ── */}
          {noticeSelected && langTab === "en" && (
            <div className="space-y-7">
              <p className="text-xs text-zinc-400 -mt-4">
                Estos campos se auto-completan con la traducción. Podés
                corregirlos antes de guardar.
              </p>
              <div className="flex flex-col gap-8 lg:flex-row">
                <div className="relative font-medium lg:w-full">
                  <input
                    autoComplete="off"
                    placeholder="Title"
                    className={inputClass}
                    {...register("titleEn")}
                  />
                  <label className={labelClass}>Title (EN)</label>
                </div>
              </div>
              <div className="relative font-medium">
                <input
                  autoComplete="off"
                  placeholder="Description"
                  className={inputClass}
                  {...register("descriptionEn")}
                />
                <label className={labelClass}>Description (EN)</label>
              </div>
              <div className="relative">
                <label className="text-zinc-300 mb-2 block font-medium">
                  Content (EN)
                </label>
                <textarea
                  placeholder="News content in English"
                  className="w-full border-2 bg-zinc-800/30 text-zinc-200 rounded-lg p-2 placeholder:text-zinc-400 text-base font-medium border-sky-700 h-full min-h-32 lg:min-h-36"
                  {...register("contentEn")}
                />
              </div>
            </div>
          )}

          {/* Imágenes */}
          <div className="flex flex-col">
            <label className="font-medium text-zinc-300 text-lg self-center -mt-1">
              Imágenes
            </label>
            <input
              type="file"
              name="image"
              accept=".jpg, .png, .jpeg, .webp"
              onChange={handleImage}
              className="rounded-lg flex-1 mt-2 appearance-none w-full bg-zinc-800/80 py-2 px-2 md:px-4 border border-zinc-500 text-zinc-300 text-sm focus:outline-none focus:border-zinc-100 file:mr-4 file:py-2 file:px-2 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-sky-800 file:text-white hover:file:bg-sky-600 cursor-pointer file:cursor-pointer"
            />
            {loadingImage && (
              <p className="text-zinc-300">Cargando imagen...</p>
            )}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 w-full">
              {images?.map((img) => (
                <div key={img.public_id} className="relative">
                  <button
                    type="button"
                    onClick={() => handleDeleteImage(img)}
                    className="absolute -top-2 -right-2 z-10 w-8 h-8 bg-red-700 hover:bg-red-800 text-white rounded-full flex items-center justify-center font-bold shadow-lg"
                  >
                    ×
                  </button>
                  <Image
                    className="w-full h-32 object-cover rounded-lg"
                    src={img.secure_url}
                    alt="Preview"
                    width={200}
                    height={200}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            {noticeSelected && (
              <button
                type="button"
                onClick={() => {
                  reset({
                    title: "",
                    description: "",
                    content: "",
                    titleEn: "",
                    descriptionEn: "",
                    contentEn: "",
                    category: "",
                    isActive: false,
                  });
                  setImages([]);
                  setLangTab("es");
                  onCancel();
                }}
                className="w-full bg-zinc-800 border-red-500 border py-2 rounded text-zinc-200"
              >
                Cancelar
              </button>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-sky-800/80 border border-sky-500 text-zinc-100 py-2 rounded text-sm sm:text-base xl:py-3"
            >
              {loading
                ? "Enviando..."
                : noticeSelected
                  ? "Actualizar"
                  : "Publicar noticia"}
            </button>
          </div>
        </form>
      </section>
    </section>
  );
}
