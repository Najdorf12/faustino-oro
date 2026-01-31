"use client";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import Image from "next/image";
import imgFaustiForm from "@/assets/images/img6.jpg";
import { Notice, CreateNewsInput, NoticeImage } from "@/types/notice";

interface FormData {
  title: string;
  description: string;
  content: string;
  category: string;
  isActive: boolean;
}

const NoticesForm = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const [notices, setNotices] = useState<Notice[]>([]);
  const [noticeSelected, setNoticeSelected] = useState<Notice | null>(null);
  const [images, setImages] = useState<NoticeImage[]>([]);
  const [loadingImage, setLoadingImage] = useState(false);
  const [loading, setLoading] = useState(false);

  // Cargar noticias al montar
  useEffect(() => {
    fetchNotices();
  }, []);

  // Cargar datos cuando se selecciona una noticia para editar
  useEffect(() => {
    if (noticeSelected) {
      reset({
        title: noticeSelected.title,
        description: noticeSelected.description,
        content: noticeSelected.content,
        category: noticeSelected.category,
        isActive: noticeSelected.isActive,
      });
      setImages(noticeSelected.images || []);
    } else {
      reset({
        title: "",
        description: "",
        content: "",
        category: "",
        isActive: false,
      });
      setImages([]);
    }
  }, [noticeSelected, reset]);

  const fetchNotices = async () => {
    try {
      const response = await fetch("/api/notices");
      const data = await response.json();
      setNotices(data);
    } catch (error) {
      console.error("Error fetching notices:", error);
    }
  };

  // Subir imagen a Cloudinary
  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

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

      setImages([
        ...images,
        {
          public_id: file.public_id,
          secure_url: file.secure_url,
        },
      ]);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error al subir la imagen");
    } finally {
      setLoadingImage(false);
    }
  };

  // Eliminar imagen del estado y de Cloudinary
  const handleDeleteImage = async (img: NoticeImage) => {
    setImages(images.filter((image) => image.public_id !== img.public_id));

    try {
      await fetch(
        `/api/notices/delete-image/${encodeURIComponent(img.public_id)}`,
        {
          method: "DELETE",
        },
      );
      console.log("Imagen eliminada de Cloudinary");
    } catch (error) {
      console.error("Error al eliminar imagen de Cloudinary", error);
    }
  };

  // Crear o actualizar noticia
  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const noticeData = {
        ...data,
        images: images.length > 0 ? images : noticeSelected?.images || [],
      };

      const url = noticeSelected
        ? `/api/notices/${noticeSelected._id}`
        : "/api/notices";

      const method = noticeSelected ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(noticeData),
      });

      if (response.ok) {
        const savedNotice = await response.json();

        if (noticeSelected) {
          // Actualizar en la lista
          setNotices(
            notices.map((item) =>
              item._id === savedNotice._id ? savedNotice : item,
            ),
          );
          alert("Noticia actualizada");
        } else {
          // Agregar a la lista
          setNotices([...notices, savedNotice]);
          alert("Noticia creada exitosamente");
        }

        reset();
        setImages([]);
        setNoticeSelected(null);
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error al enviar el formulario");
    } finally {
      setLoading(false);
    }
  };

  // Eliminar noticia
  const deleteNotice = async (id: string) => {
    if (!confirm("¿Estás seguro de eliminar esta noticia?")) return;

    try {
      const response = await fetch(`/api/notices/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setNotices(notices.filter((item) => item._id !== id));
        alert("Noticia eliminada");
      }
    } catch (error) {
      console.error("Error deleting notice:", error);
    }
  };

  const cancelEdit = () => {
    setNoticeSelected(null);
    setImages([]);
    reset();
  };

  return (
    <>
      <div className="w-full flex flex-col items-center justify-center min-h-screen px-4 py-10  ">
        <section className="w-full font-satoshi relative rounded-xl border-zinc-700 shadow-lg shadow-zinc-900 border-3 overflow-hidden py-6 px-4 space-y-6 md:space-y-7 md:w-140 xl:w-200 xl:px-8 ">
          <figure className="absolute inset-0 w-full h-full">
            <Image
              src={imgFaustiForm}
              alt="img-Fausti-form"
              className="w-full h-full z-20 object-cover object-center opacity-20"
            />
          </figure>

          <h6 className="text-center relative text-5xl font-medium text-zinc-200 md:text-6xl xl:text-7xl 2xl:text-8xl">
            NOTICIAS
          </h6>

          <p className="text-center relative text-zinc-300 text-base xl:text-xl 2xl:text-xl">
            {noticeSelected ? "Editar noticia" : "Comparte las últimas novedades"}
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-7 relative"
          >
            <div className="flex flex-col gap-8 xl:flex xl:flex-row">
              <div className="relative font-medium xl:w-1/2">
                <input
                  autoComplete="off"
                  placeholder="Título"
                  className="peer h-10 w-full border-b-2 border-zinc-500 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-zinc-100"
                  {...register("title", {
                    required: "El título es requerido",
                  })}
                />
                <label className="absolute left-0 -top-3.5 text-white text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-300 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-white peer-focus:text-sm">
                  Title
                </label>
                {errors.title && (
                  <p className="text-red-400 text-sm mt-1 absolute top-1 right-1">
                    {errors.title.message}
                  </p>
                )}
              </div>

              <div className="relative font-medium xl:w-1/2">
                <input
                  autoComplete="off"
                  placeholder="Categoría"
                  className="peer h-10 w-full border-b-2 border-zinc-500 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-zinc-100"
                  {...register("category", {
                    required: "La categoría es requerida",
                  })}
                />
                <label className="absolute left-0 -top-3.5 text-white text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-300 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-white peer-focus:text-sm">
                  Category
                </label>
                {errors.category && (
                  <p className="text-red-400 text-sm mt-1 absolute top-1 right-1">
                    {errors.category.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-6 xl:flex xl:flex-row">
              <div className="relative font-medium xl:w-1/2">
                <input
                  autoComplete="off"
                  placeholder="Descripción"
                  className="peer h-10 w-full border-b-2 border-zinc-500 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-zinc-100"
                  {...register("description", {
                    required: "La descripción es requerida",
                  })}
                />
                <label className="absolute left-0 -top-3.5 text-white text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-300 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-white peer-focus:text-sm">
                  Description
                </label>
                {errors.description && (
                  <p className="text-red-400 text-sm mt-1 absolute top-1 right-1">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div className="relative font-medium flex gap-6 items-center">
                <p className="text-zinc-300">Is Active?</p>
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
                    ></path>
                  </svg>
                </label>
              </div>
            </div>

            <div className="relative">
              <label className="text-zinc-300 text-sm mb-2 block">
                Content
              </label>
              <textarea
                placeholder="Contenido de la noticia"
                className="w-full border bg-zinc-800/30 text-zinc-200 rounded-lg p-2 placeholder:text-zinc-300 relative text-base font-medium border-zinc-500 h-full min-h-24"
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
            {/* Sección de imágenes */}
            <div className="flex flex-col items-center gap-5">
              <label className="font-light text-zinc-300 text-xl self-start">
                Imágenes
              </label>
              <input
                type="file"
                name="image"
                accept=".jpg, .png, .jpeg"
                onChange={handleImage}
                className="rounded-lg flex-1 appearance-none w-full max-w-100 py-2 px-4 border border-zinc-500 text-white placeholder-white text-sm focus:outline-none focus:border-zinc-100 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-sky-800 file:text-white hover:file:bg-sky-700"
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

            <div className="relative flex items-center justify-center gap-4">
              {noticeSelected && (
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="w-full bg-gray-600/90 py-2 px-4 border-2 border-zinc-300 rounded-md shadow-lg hover:border-gray-500 font-semibold transition duration-500 text-zinc-100 xl:self-center"
                >
                  Cancelar
                </button>
              )}
              <button
                className="w-full bg-sky-800/90 py-2 px-4 border-2 border-zinc-300 rounded-md shadow-lg hover:border-sky-800 hover:text-whiteCustom font-semibold transition duration-500 text-zinc-100 xl:self-center"
                type="submit"
                disabled={loading}
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
      </div>

      {/* Lista de noticias */}
      <section className="w-full pt-10 px-12  ">
        <h3 className="text-3xl font-bold text-zinc-200 mb-6">
          Noticias Existentes
        </h3>
        <div className="space-y-4">
          {[...notices].reverse().map((notice) => (
            <div
              key={notice._id}
              className="bg-zinc-700 rounded-lg p-4 flex justify-between items-start gap-4"
            >
              <div className="flex-1">
                <h4 className="text-xl font-semibold text-zinc-100">
                  {notice.title}
                </h4>
                <p className="text-zinc-300 text-sm mt-1">
                  {notice.description}
                </p>
                <p className="text-zinc-400 text-xs mt-2">
                  Categoría: {notice.category} | Estado:{" "}
                  {notice.isActive ? " Activa" : " Inactiva"}
                </p>
                {notice.images && notice.images.length > 0 && (
                  <div className="flex gap-2 mt-2">
                    {notice.images.map((img) => (
                      <Image
                        key={img.public_id}
                        src={img.secure_url}
                        alt="Thumbnail"
                        width={50}
                        height={50}
                        className="w-12 h-12 object-cover rounded"
                      />
                    ))}
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => setNoticeSelected(notice)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md whitespace-nowrap"
                >
                  Editar
                </button>
                <button
                  onClick={() => deleteNotice(notice._id!)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md whitespace-nowrap"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default NoticesForm;
