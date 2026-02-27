"use client";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import Image from "next/image";
import imgFaustiForm from "@/assets/images/img10.webp";
import { Achievement } from "@/types/achievement";

interface FormData {
  title: string;
}

const AchievementsForm = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [achievementSelected, setAchievementSelected] =
    useState<Achievement | null>(null);
  const [loading, setLoading] = useState(false);

  // Cargar logros al montar
  useEffect(() => {
    fetchAchievements();
  }, []);

  // Cargar datos cuando se selecciona un logro para editar
  useEffect(() => {
    if (achievementSelected) {
      reset({
        title: achievementSelected.title,
      });
    } else {
      reset({
        title: "",
      });
    }
  }, [achievementSelected, reset]);

  const fetchAchievements = async () => {
    try {
      const response = await fetch("/api/achievements");
      const data = await response.json();
      setAchievements(data);
    } catch (error) {
      console.error("Error fetching achievements:", error);
    }
  };

  // Crear o actualizar logro
  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const url = achievementSelected
        ? `/api/achievements/${achievementSelected._id}`
        : "/api/achievements";

      const method = achievementSelected ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const savedAchievement = await response.json();

        if (achievementSelected) {
          // Actualizar en la lista
          setAchievements(
            achievements.map((item) =>
              item._id === savedAchievement._id ? savedAchievement : item,
            ),
          );
          alert("Logro actualizado");
        } else {
          // Agregar a la lista
          setAchievements([...achievements, savedAchievement]);
          alert("Logro creado exitosamente");
        }

        reset();
        setAchievementSelected(null);
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

  // Eliminar logro
  const deleteAchievement = async (id: string) => {
    if (!confirm("¿Estás seguro de eliminar este logro?")) return;

    try {
      const response = await fetch(`/api/achievements/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setAchievements(achievements.filter((item) => item._id !== id));
        alert("Logro eliminado");
      }
    } catch (error) {
      console.error("Error deleting achievement:", error);
    }
  };

  const cancelEdit = () => {
    setAchievementSelected(null);
    reset();
  };

  // Formatear fecha
  const formatDate = (date?: Date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen px-4 relative py-16 lg:py-18 ">
      <section className="w-full font-satoshi relative rounded-xl border-zinc-700 shadow-lg shadow-zinc-900 border-3 overflow-hidden py-6 px-4 space-y-6 md:space-y-7 md:w-140 xl:w-220 xl:px-8 z-50 xl:py-10">
        <div className="absolute inset-0 bg-zinc-800/80 z-30 h-full"></div>
        <figure className="absolute inset-0 w-full h-full z-20 ">
          <Image
            src={imgFaustiForm}
            alt="img-Fausti-form"
            className="w-full h-full z-20 object-cover object-center "
          />
        </figure>

        <h6 className="text-center relative z-50 text-5xl font-medium text-zinc-300 md:text-6xl xl:text-7xl 2xl:text-8xl">
          LOGROS
        </h6>

        <p className="text-center relative text-zinc-400 text-sm md:text-base xl:text-xl 3xl:text-xl z-50">
          {achievementSelected ? "Editar logro" : "Agrega un nuevo logro"}
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-7 relative z-50 xl:space-y-12"
        >
          <div className="relative font-medium">
            <input
              autoComplete="off"
              placeholder="Logro"
              className="peer h-10 w-full border-b-2 border-sky-700 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-zinc-100"
              {...register("title", {
                required: "El logro es requerido",
              })}
            />
            <label className="absolute left-0 -top-3.5 text-white text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-300 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-white peer-focus:text-sm">
              Logro
            </label>
            {errors.title && (
              <p className="text-red-400 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          <div className="relative flex items-center justify-center gap-4">
            {achievementSelected && (
              <button
                type="button"
                onClick={cancelEdit}
                className="w-full bg-gray-600/90 py-2 px-4 border-2 border-zinc-300 rounded-md shadow-lg hover:border-gray-500 font-semibold transition duration-500 text-zinc-100 xl:self-center"
              >
                Cancelar
              </button>
            )}
            <button
              className="w-full bg-sky-700 border py-2 px-4  rounded-md shadow-lg hover:border-sky-800 hover:text-whiteCustom font-semibold transition duration-500 text-zinc-100 xl:self-center cursor-pointer"
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Enviando..."
                : achievementSelected
                  ? "Actualizar"
                  : "Enviar"}
            </button>
          </div>
        </form>
      </section>

      {/* Lista de logros */}
      <section className="text-balance relative z-50 w-full mt-10 md:w-170 lg:mt-16 lg:w-200 ">
        <h6 className="text-4xl text-center text-zinc-300 mb-12 lg:text-5xl lg:mb-12">
          Logros existentes
        </h6>
        <div className="flex flex-col gap-6 xl:gap-9">
          {[...achievements].reverse().map((achievement, index) => (
            <div
              key={achievement._id}
              className="bg-linear-to-tr from-zinc-800 to-sky-700 border-2 border-zinc-500 rounded-lg p-3 flex flex-col justify-between items-center gap-4 relative z-50 max-w-200 lg:p-6"
            >
              <span className="text-zinc-400 font-semibold text-lg self-start">
                #{achievements.length - index}
              </span>
                <div className="w-full ">
                  <h4 className="text-xl  font-medium text-zinc-100 ">
                    {achievement.title}
                  </h4>
                  <p className="text-zinc-400 mt-2">
                    Creado: {formatDate(achievement.createdAt)}
                  </p>
                </div>
              <div className="flex w-full justify-evenly mt-3 items-center lg:gap-9">
                <button
                  onClick={() => setAchievementSelected(achievement)}
                  className="bg-sky-600 hover:bg-sky-700 text-white px-14 py-2 rounded-md whitespace-nowrap text-sm lg:w-full"
                >
                  Editar
                </button>
                <button
                  onClick={() => deleteAchievement(achievement._id!)}
                  className="bg-red-600 hover:bg-red-700 text-white px-12 py-2 rounded-md whitespace-nowrap text-sm lg:w-full"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}

          {achievements.length === 0 && (
            <p className="text-center text-zinc-400 py-8">
              No hay logros registrados aún
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default AchievementsForm;
