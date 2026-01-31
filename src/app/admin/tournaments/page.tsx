"use client";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import Image from "next/image";
import imgFaustiForm from "@/assets/images/img28.webp";
import { Tournament, TournamentImage } from "@/types/tournament";

interface FormData {
  title: string;
  location: string;
  startDate: string;
  endDate: string;
  description?: string;
}

const TournamentsForm = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [tournamentSelected, setTournamentSelected] = useState<Tournament | null>(null);
  const [images, setImages] = useState<TournamentImage[]>([]);
  const [loadingImage, setLoadingImage] = useState(false);
  const [loading, setLoading] = useState(false);

  // Cargar torneos al montar
  useEffect(() => {
    fetchTournaments();
  }, []);

  // Cargar datos cuando se selecciona un torneo para editar
  useEffect(() => {
    if (tournamentSelected) {
      reset({
        title: tournamentSelected.title,
        location: tournamentSelected.location,
        startDate: new Date(tournamentSelected.startDate).toISOString().split('T')[0],
        endDate: new Date(tournamentSelected.endDate).toISOString().split('T')[0],
        description: tournamentSelected.description || '',
      });
      setImages(tournamentSelected.images || []);
    } else {
      reset({
        title: "",
        location: "",
        startDate: "",
        endDate: "",
        description: "",
      });
      setImages([]);
    }
  }, [tournamentSelected, reset]);

  const fetchTournaments = async () => {
    try {
      const response = await fetch('/api/tournaments');
      const data = await response.json();
      setTournaments(data);
    } catch (error) {
      console.error('Error fetching tournaments:', error);
    }
  };

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
        }
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
      console.error('Error uploading image:', error);
      alert('Error al subir la imagen');
    } finally {
      setLoadingImage(false);
    }
  };

  // Eliminar imagen del estado y de Cloudinary
  const handleDeleteImage = async (img: TournamentImage) => {
    setImages(images.filter((image) => image.public_id !== img.public_id));

    try {
      await fetch(`/api/tournaments/delete-image/${encodeURIComponent(img.public_id)}`, {
        method: 'DELETE',
      });
      console.log('Imagen eliminada de Cloudinary');
    } catch (error) {
      console.error('Error al eliminar imagen de Cloudinary', error);
    }
  };

  // Crear o actualizar torneo
  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const tournamentData = {
        ...data,
        images: images.length > 0 ? images : (tournamentSelected?.images || []),
      };

      const url = tournamentSelected
        ? `/api/tournaments/${tournamentSelected._id}`
        : '/api/tournaments';

      const method = tournamentSelected ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tournamentData),
      });

      if (response.ok) {
        const savedTournament = await response.json();
        
        if (tournamentSelected) {
          // Actualizar en la lista
          setTournaments(tournaments.map(item => 
            item._id === savedTournament._id ? savedTournament : item
          ));
          alert('Torneo actualizado');
        } else {
          // Agregar a la lista
          setTournaments([...tournaments, savedTournament]);
          alert('Torneo creado exitosamente');
        }
        
        reset();
        setImages([]);
        setTournamentSelected(null);
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error al enviar el formulario');
    } finally {
      setLoading(false);
    }
  };

  // Eliminar torneo
  const deleteTournament = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar este torneo?')) return;

    try {
      const response = await fetch(`/api/tournaments/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setTournaments(tournaments.filter(item => item._id !== id));
        alert('Torneo eliminado');
      }
    } catch (error) {
      console.error('Error deleting tournament:', error);
    }
  };

  const cancelEdit = () => {
    setTournamentSelected(null);
    setImages([]);
    reset();
  };

  // Formatear fecha para mostrar
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="w-full flex flex-col items-center justify-center bg-zinc-800 min-h-screen px-4 py-10">
      <section className="w-full font-satoshi relative rounded-xl border-zinc-700 shadow-lg shadow-zinc-900 border-3 overflow-hidden py-6 px-4 space-y-6 md:space-y-7 md:w-140 xl:w-200 xl:px-8">
        <figure className="absolute inset-0 w-full h-full">
          <Image
            src={imgFaustiForm}
            alt="img-Fausti-form"
            className="w-full h-full z-20 object-cover object-center opacity-20"
          />
        </figure>
        
        <h6 className="text-center relative text-5xl font-medium text-zinc-200 md:text-6xl xl:text-7xl 2xl:text-8xl">
          TORNEOS
        </h6>
        
        <p className="text-center relative text-zinc-300 text-base xl:text-xl 2xl:text-xl">
          {tournamentSelected ? 'Editar torneo' : 'Registra una nueva competencia'}
        </p>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-7 relative">
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
                Título
              </label>
              {errors.title && (
                <p className="text-red-400 text-sm mt-1 absolute top-1 right-1">{errors.title.message}</p>
              )}
            </div>
            
            <div className="relative font-medium xl:w-1/2">
              <input
                autoComplete="off"
                placeholder="Ubicación"
                className="peer h-10 w-full border-b-2 border-zinc-500 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-zinc-100"
                {...register("location", {
                  required: "La ubicación es requerida",
                })}
              />
              <label className="absolute left-0 -top-3.5 text-white text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-300 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-white peer-focus:text-sm">
                Ubicación
              </label>
              {errors.location && (
                <p className="text-red-400 text-sm mt-1 absolute top-1 right-1">{errors.location.message}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-6 xl:flex xl:flex-row">
            <div className="relative font-medium xl:w-1/2">
              <input
                type="date"
                autoComplete="off"
                className="peer h-10 w-full border-b-2 border-zinc-500 text-white bg-transparent focus:outline-none focus:border-zinc-100"
                {...register("startDate", {
                  required: "La fecha de inicio es requerida",
                })}
              />
              <label className="absolute left-0 -top-3.5 text-white text-sm">
                Fecha de Inicio
              </label>
              {errors.startDate && (
                <p className="text-red-400 text-sm mt-1 absolute top-1 right-1">{errors.startDate.message}</p>
              )}
            </div>
            
            <div className="relative font-medium xl:w-1/2">
              <input
                type="date"
                autoComplete="off"
                className="peer h-10 w-full border-b-2 border-zinc-500 text-white bg-transparent focus:outline-none focus:border-zinc-100"
                {...register("endDate", {
                  required: "La fecha de fin es requerida",
                })}
              />
              <label className="absolute left-0 -top-3.5 text-white text-sm">
                Fecha de Fin
              </label>
              {errors.endDate && (
                <p className="text-red-400 text-sm mt-1 absolute top-1 right-1">{errors.endDate.message}</p>
              )}
            </div>
          </div>

          <div className="relative">
            <label className="text-zinc-300 text-sm mb-2 block">Descripción (Opcional)</label>
            <textarea
              placeholder="Descripción del torneo"
              className="w-full border bg-zinc-800/30 text-zinc-200 rounded-lg p-2 placeholder:text-zinc-300 relative text-base font-medium border-zinc-500 h-full min-h-24"
              {...register("description")}
            />
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
            {tournamentSelected && (
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
              {loading ? 'Enviando...' : tournamentSelected ? 'Actualizar' : 'Añadir torneo'}
            </button>
          </div>
        </form>
      </section>

      {/* Lista de torneos */}
      <section className="w-full mt-10 md:w-140 xl:w-200">
        <h3 className="text-3xl font-bold text-zinc-200 mb-6">Torneos Existentes</h3>
        <div className="space-y-4">
          {[...tournaments].reverse().map((tournament) => (
            <div
              key={tournament._id}
              className="bg-zinc-700 rounded-lg p-4 flex justify-between items-start gap-4"
            >
              <div className="flex-1">
                <h4 className="text-xl font-semibold text-zinc-100">{tournament.title}</h4>
                <p className="text-zinc-300 text-sm mt-1">{tournament.location}</p>
                <p className="text-zinc-400 text-xs mt-2">
                  {formatDate(tournament.startDate)} - {formatDate(tournament.endDate)}
                </p>
                {tournament.description && (
                  <p className="text-zinc-400 text-xs mt-1 italic">{tournament.description}</p>
                )}
                {tournament.images && tournament.images.length > 0 && (
                  <div className="flex gap-2 mt-2">
                    {tournament.images.map((img) => (
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
                  onClick={() => setTournamentSelected(tournament)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md whitespace-nowrap"
                >
                  Editar
                </button>
                <button
                  onClick={() => deleteTournament(tournament._id!)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md whitespace-nowrap"
                >
                  Eliminar
                </button>
              </div>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia, vero fuga. Ut, vel. Cumque non a cupiditate laborum, assumenda perferendis voluptate quam aut dolore animi ullam officia mollitia praesentium qui.
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default TournamentsForm;