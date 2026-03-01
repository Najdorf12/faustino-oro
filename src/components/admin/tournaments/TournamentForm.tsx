"use client";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import Image from "next/image";
import imgFaustiForm from "@/assets/images/img1-13.jpeg";
import { Tournament, TournamentImage } from "@/types/tournament";

interface FormData {
  tournament_id_lichess: string;
  title: string;
  location: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  description?: string;
}

interface TournamentsFormProps {
  tournamentSelected: Tournament | null;
  onSaved: (tournament: Tournament, isEdit: boolean) => void;
  onCancel: () => void;
}

const TournamentsForm = ({
  tournamentSelected,
  onSaved,
  onCancel,
}: TournamentsFormProps) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const [images, setImages] = useState<TournamentImage[]>([]);
  const [loadingImage, setLoadingImage] = useState(false);
  const [loading, setLoading] = useState(false);

  // Cargar datos cuando se selecciona un torneo para editar
  useEffect(() => {
    if (tournamentSelected) {
      reset({
        title: tournamentSelected.title,
        location: tournamentSelected.location,
        startDate: new Date(tournamentSelected.startDate)
          .toISOString()
          .split("T")[0],
        endDate: new Date(tournamentSelected.endDate)
          .toISOString()
          .split("T")[0],
        description: tournamentSelected.description || "",
        tournament_id_lichess: tournamentSelected.tournament_id_lichess || "",
        isActive: tournamentSelected.isActive || false,
      });
      setImages(tournamentSelected.images || []);
    } else {
      reset({
        title: "",
        location: "",
        startDate: "",
        endDate: "",
        description: "",
        tournament_id_lichess: "",
        isActive: false,
      });
      setImages([]);
    }
  }, [tournamentSelected, reset]);

  // Subir imagen a Cloudinary
  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "FaustinoOro");
    data.append("folder", "FaustinoOro/Tournaments");

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
  const handleDeleteImage = async (img: TournamentImage) => {
    setImages(images.filter((image) => image.public_id !== img.public_id));

    try {
      await fetch(
        `/api/tournaments/delete-image/${encodeURIComponent(img.public_id)}`,
        {
          method: "DELETE",
        },
      );
      console.log("Imagen eliminada de Cloudinary");
    } catch (error) {
      console.error("Error al eliminar imagen de Cloudinary", error);
    }
  };

  // Crear o actualizar torneo
  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const tournamentData = {
        ...data,
        images: images.length > 0 ? images : tournamentSelected?.images || [],
      };

      const url = tournamentSelected
        ? `/api/tournaments/${tournamentSelected._id}`
        : "/api/tournaments";

      const method = tournamentSelected ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tournamentData),
      });

      if (response.ok) {
        const savedTournament = await response.json();
        onSaved(savedTournament, !!tournamentSelected);
        alert(
          tournamentSelected
            ? "Torneo actualizado"
            : "Torneo creado exitosamente",
        );
        reset();
        setImages([]);
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

  const handleCancel = () => {
    onCancel();
    setImages([]);
    reset();
  };

  return (
    <section className="w-full  flex items-center justify-center px-3 sm:px-4 py-12 lg:pt-18">
      <section className="w-full font-satoshi relative rounded-xl border-zinc-700 shadow-lg  shadow-zinc-900 border-3 overflow-hidden py-6 px-3 sm:px-4 space-y-6 md:space-y-7 md:w-140 lg:w-200 xl:w-220 xl:px-8 z-50">
        <div className="absolute inset-0 bg-zinc-800/80 z-30 h-full"></div>
        <figure className="absolute inset-0 w-full h-full z-20 ">
          <Image
            src={imgFaustiForm}
            alt="img-Fausti-form"
            className="w-full h-full z-20 object-cover object-center opacity-70"
          />
        </figure>

        <h6 className="text-center relative z-50 text-5xl font-medium text-zinc-200 md:text-6xl xl:text-7xl 2xl:text-8xl">
          TORNEOS
        </h6>
        <p className="text-center relative z-50 text-zinc-400 text-sm  md:text-base xl:text-xl 2xl:text-xl">
          {tournamentSelected
            ? "Editar torneo"
            : "Registra una nueva competencia"}
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-7 relative z-100 xl:space-y-8 "
        >
          <div className="flex flex-col gap-6 xl:flex xl:flex-row">
            <div className="relative font-medium xl:w-1/2">
              <input
                autoComplete="off"
                placeholder="Título"
                className="peer h-10 w-full border-b-2 border-sky-700 text-zinc-300 bg-transparent placeholder-transparent focus:outline-none focus:border-zinc-100"
                {...register("title", {
                  required: "El título es requerido",
                })}
              />
              <label className="absolute left-0 -top-3.5 text-zinc-300 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-300 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-zinc-300 peer-focus:text-sm">
                Título
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
                placeholder="Ubicación"
                className="peer h-10 w-full border-b-2 border-sky-700 text-zinc-300 bg-transparent placeholder-transparent focus:outline-none focus:border-zinc-100"
                {...register("location", {
                  required: "La ubicación es requerida",
                })}
              />
              <label className="absolute left-0 -top-3.5 text-zinc-300 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-300 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-zinc-300 peer-focus:text-sm">
                Ubicación
              </label>
              {errors.location && (
                <p className="text-red-400 text-sm mt-1 absolute top-1 right-1">
                  {errors.location.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-6 xl:flex xl:flex-row">
            <div className="relative font-medium xl:w-1/2">
              <input
                type="date"
                autoComplete="off"
                className="peer h-10 w-full border-b-2 border-sky-700 text-zinc-300 bg-transparent 
             focus:outline-none focus:border-zinc-100
             scheme-dark
             cursor-pointer
             placeholder:text-red-700"
                {...register("startDate", {
                  required: "La fecha de inicio es requerida",
                })}
              />
              <label className="absolute left-0 -top-3.5 text-zinc-300 text-sm">
                Fecha de Inicio
              </label>
              {errors.startDate && (
                <p className="text-red-400 text-sm mt-1 absolute top-1 right-1">
                  {errors.startDate.message}
                </p>
              )}
            </div>

            <div className="relative font-medium xl:w-1/2">
              <input
                type="date"
                autoComplete="off"
                className="peer h-10 w-full border-b-2 border-sky-700 text-zinc-300 bg-transparent focus:outline-none focus:border-zinc-100 scheme-dark  cursor-pointer
             placeholder:text-red-700"
                {...register("endDate", {
                  required: "La fecha de fin es requerida",
                })}
              />
              <label className="absolute left-0 -top-3.5 text-zinc-300 text-sm">
                Fecha de Fin
              </label>
              {errors.endDate && (
                <p className="text-red-400 text-sm mt-1 absolute top-1 right-1">
                  {errors.endDate.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-6 xl:flex xl:flex-row xl:items-center">
            <div className="relative font-medium xl:w-1/2">
              <input
                autoComplete="off"
                placeholder="Tournament_id_Lichess"
                className="peer h-10 w-full border-b-2 border-sky-700 text-zinc-300 bg-transparent placeholder-transparent focus:outline-none focus:border-zinc-100"
                {...register("tournament_id_lichess")}
              />
              <label className="absolute left-0 -top-3.5 text-zinc-300 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-300 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-zinc-300 peer-focus:text-sm">
                ID Torneo (Lichess)
              </label>
              {errors.tournament_id_lichess && (
                <p className="text-red-400 text-sm mt-1 absolute top-1 right-1">
                  {errors.tournament_id_lichess.message}
                </p>
              )}
            </div>

            <div className="relative font-medium flex gap-6 items-end xl:w-1/2">
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
                  ></path>
                </svg>
              </label>
            </div>
          </div>

          <div className="relative">
            <label className="text-zinc-300  mb-2 block">
              Descripción <span className="text-zinc-400">(Opcional)</span>
            </label>
            <textarea
              placeholder="Descripción del torneo"
              className="w-full border-2 bg-zinc-800/30 text-zinc-200 rounded-lg p-2 placeholder:text-zinc-400 placeholder:text-sm relative text-base font-medium border-sky-700 h-full min-h-24"
              {...register("description")}
            />
          </div>

          {/* Sección de imágenes */}
          <div className="flex flex-col items-center ">
            <label className="font-medium text-zinc-300 text-lg self-center -mt-1">
              Imágenes
            </label>
            <input
              type="file"
              name="image"
              accept=".jpg, .png, .jpeg, .webp"
              onChange={handleImage}
              className="rounded-lg flex-1 mt-2 appearance-none w-full bg-zinc-800/80 py-2 px-2 md:px-4 border border-zinc-500 text-zinc-300 placeholder-white text-sm focus:outline-none focus:border-zinc-100 file:mr-4 file:py-2 file:px-2 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-sky-800 file:text-white hover:file:bg-sky-600 cursor-pointer file:cursor-pointer"
            />

            {loadingImage && (
              <p className="text-zinc-300">Cargando imagen...</p>
            )}

            <div className="grid grid-cols-2 mt-3 md:grid-cols-3 lg:grid-cols-4 gap-5 w-full">
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
            {tournamentSelected && (
              <button
                type="button"
                onClick={handleCancel}
                className="w-full bg-gray-600/90 py-2 px-4 border-2 border-zinc-300 rounded-md shadow-lg hover:border-gray-500 font-semibold transition duration-500 text-zinc-100 xl:self-center"
              >
                Cancelar
              </button>
            )}
            <button
              className="w-full border bg-sky-800 text-zinc-100 py-2 rounded text-sm sm:text-base xl:py-3"
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Enviando..."
                : tournamentSelected
                  ? "Actualizar"
                  : "Añadir torneo"}
            </button>
          </div>
        </form>
      </section>
    </section>
  );
};

export default TournamentsForm;
