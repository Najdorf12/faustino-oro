export default function  AdminNotices() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Gestión de Noticias</h2>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
          + Nueva Noticia
        </button>
      </div>

      {/* Aquí irá tu formulario y lista de noticias */}
      <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-700">
        <p className="text-gray-400">Formulario de noticias...</p>
      </div>
    </div>
  );
}