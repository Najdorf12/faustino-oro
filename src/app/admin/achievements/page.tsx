"use client";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import Image from "next/image";
import imgFaustiForm from "@/assets/images/img10.webp";
import {
  Achievement,
  AchievementCategory,
  ACHIEVEMENT_CATEGORIES,
} from "@/types/achievement";

interface FormData {
  title: string;
  category: AchievementCategory;
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

  useEffect(() => {
    fetchAchievements();
  }, []);

  useEffect(() => {
    if (achievementSelected) {
      reset({
        title: achievementSelected.title,
        category: achievementSelected.category,
      });
    } else {
      reset({ title: "", category: ACHIEVEMENT_CATEGORIES[0] });
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

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const url = achievementSelected
        ? `/api/achievements/${achievementSelected._id}`
        : "/api/achievements";
      const method = achievementSelected ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const savedAchievement = await response.json();
        if (achievementSelected) {
          setAchievements(
            achievements.map((item) =>
              item._id === savedAchievement._id ? savedAchievement : item,
            ),
          );
          alert("Logro actualizado");
        } else {
          setAchievements([...achievements, savedAchievement]);
          alert("Logro creado exitosamente");
        }
        reset({ title: "", category: ACHIEVEMENT_CATEGORIES[0] });
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
    reset({ title: "", category: ACHIEVEMENT_CATEGORIES[0] });
  };

  const formatDate = (date?: Date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  const grouped = achievements.reduce<Record<string, Achievement[]>>(
    (acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    },
    {},
  );
  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen px-4 relative py-16 lg:py-18 xl:py-20">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, #3f3f46 1px, transparent 1px),
            linear-gradient(to bottom, #3f3f46 1px, transparent 1px)
          `,
          backgroundSize: "150px 150px",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)",
        }}
      />

      {/* Formulario */}
      <section className="w-full font-satoshi relative rounded-xl border-zinc-700 shadow-lg shadow-zinc-900 border-3 overflow-hidden py-6 px-4 space-y-8 md:space-y-7 md:w-140 xl:w-240 xl:px-8 z-50 xl:py-14 xl:space-y-12 3xl:w-260">
        <div className="absolute inset-0 bg-zinc-800/80 z-30 h-full" />
        <figure className="absolute inset-0 w-full h-full z-20">
          <Image
            src={imgFaustiForm}
            alt="img-Fausti-form"
            className="w-full h-full z-20 object-cover object-center"
          />
        </figure>

        <div className="lg:py-2">
          <h6 className="text-center relative z-50 text-6xl font-medium text-zinc-200 md:text-6xl lg:text-7xl xl:text-8xl 3xl:text-[7rem]">
            Logros
          </h6>
          <div className="flex items-center gap-2 relative z-100 mt-3 lg:mt-5 lg:gap-4">
            <div className="flex-1 h-px bg-zinc-300" />
            <p className="text-center relative z-50 text-zinc-300 text-sm md:text-base lg:text-xl lg:font-medium 3xl:text-2xl">
              {achievementSelected ? "Editar logro" : "Agrega un nuevo logro"}
            </p>
            <div className="flex-1 h-px bg-zinc-300" />
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-7 relative z-50 xl:space-y-10"
        >
          {/* Categoría con opciones estilizadas */}
          <div className="relative font-medium">
            <label className="block text-zinc-400 text-xs uppercase tracking-widest mb-3 lg:text-sm">
              Categoría
            </label>
            <div className="flex flex-wrap gap-2">
              {ACHIEVEMENT_CATEGORIES.map((cat) => (
                <label key={cat} className="relative cursor-pointer">
                  <input
                    type="radio"
                    value={cat}
                    className="peer sr-only"
                    {...register("category", {
                      required: "La categoría es requerida",
                    })}
                  />
                  <span className="block px-3 py-1.5 rounded-full border border-zinc-600 text-zinc-400 text-xs font-medium transition-all duration-200 peer-checked:border-sky-500 peer-checked:bg-sky-500/15 peer-checked:text-sky-300 hover:border-zinc-400 hover:text-zinc-200 lg:px-4 lg:py-2 lg:text-sm">
                    {cat}
                  </span>
                </label>
              ))}
            </div>
            {errors.category && (
              <p className="text-red-400 text-sm mt-2">
                {errors.category.message}
              </p>
            )}
          </div>

          {/* Título como textarea */}
          <div className="relative font-medium">
            <label className="block text-zinc-400 text-xs uppercase tracking-widest mb-3 lg:text-sm">
              Logro
            </label>
            <textarea
              autoComplete="off"
              rows={3}
              placeholder="Describe el logro..."
              className="w-full bg-zinc-700/40 border border-zinc-600 rounded-lg text-white placeholder-zinc-500 px-4 py-3 text-sm resize-none focus:outline-none focus:border-sky-500 transition-colors duration-200 lg:text-base"
              {...register("title", { required: "El logro es requerido" })}
            />
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
                className="w-full bg-gray-600/90 py-2 px-4 border-2 border-zinc-300 rounded-md shadow-lg hover:border-gray-500 font-medium transition duration-500 text-zinc-100 xl:self-center"
              >
                Cancelar
              </button>
            )}
            <button
              className="w-full bg-sky-700 border py-2 px-4 text-sm rounded-md shadow-lg hover:border-sky-800 font-medium transition duration-500 text-zinc-100 xl:self-center cursor-pointer lg:text-base"
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Enviando..."
                : achievementSelected
                  ? "Actualizar"
                  : "Subir Logro"}
            </button>
          </div>
        </form>
      </section>

      {/* Listado */}
      <section className="text-balance relative z-50 w-full mt-10 lg:mt-16 lg:w-[90%]">
        <h6 className="mb-8 border-l-3 border-sky-700 pl-3 py-2 text-[2rem] md:text-4xl text-zinc-200 lg:pl-6 xl:text-5xl self-start lg:mb-12">
          Logros existentes
        </h6>

        {achievements.length === 0 ? (
          <p className="text-center text-zinc-400 py-8">
            No hay logros registrados aún
          </p>
        ) : (
          <div className="flex flex-col gap-12">
            {ACHIEVEMENT_CATEGORIES.map((category) => {
              const items = grouped[category];
              if (!items || items.length === 0) return null;

              return (
                <div key={category}>
                  {/* Encabezado de categoría */}
                  <h5 className="text-zinc-400 text-base uppercase tracking-widest mb-4 lg:text-lg xl:text-xl lg:mb-6">
                    {category}
                    <span className="ml-2 text-sky-500">({items.length})</span>
                  </h5>

                  {/* Grid de cards */}
                  <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 ">
                    {[...items].reverse().map((achievement, index) => (
                      <div
                        key={achievement._id}
                        className="bg-linear-to-br max-w-120 from-zinc-800 to-sky-800 border border-zinc-600 rounded-xl p-4 flex flex-col gap-4 relative z-50 lg:p-5"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-zinc-500 font-semibold text-sm">
                            #{items.length - index}
                          </span>
                          <span className="text-xs px-2.5 py-1 rounded-full bg-sky-900/50 border border-sky-700/60 text-sky-300 text-center leading-tight">
                            {achievement.category}
                          </span>
                        </div>

                        <h4 className="text-base font-medium text-zinc-100 leading-snug flex-1 lg:text-lg">
                          {achievement.title}
                        </h4>

                        <div className="flex flex-col gap-3 mt-auto">
                          <p className="text-zinc-500 text-xs">
                            {formatDate(achievement.createdAt)}
                          </p>
                          <div className="flex gap-2">
                            <button
                              onClick={() =>
                                setAchievementSelected(achievement)
                              }
                              className="flex-1 bg-zinc-800/60 hover:bg-sky-600 text-white py-1.5 rounded-md text-xs font-medium transition duration-200 lg:text-sm"
                            >
                              Editar
                            </button>
                            <button
                              onClick={() =>
                                deleteAchievement(achievement._id!)
                              }
                              className="flex-1 bg-red-600/80 hover:bg-red-600 text-white py-1.5 rounded-md text-xs font-medium transition duration-200 lg:text-sm"
                            >
                              Eliminar
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default AchievementsForm;
