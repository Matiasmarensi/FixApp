import Image from "next/image";
import Link from "next/link";
export const metadata = {
  title: "Inicio",
};
export default function Home() {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-4">
      {/* Imagen de fondo con overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/bghome.jpg" // Asegúrate de añadir tu imagen en la carpeta public
          alt="Fondo de tecnología y reparación"
          fill
          className="object-cover brightness-50"
          priority
        />
      </div>

      {/* Contenido principal */}
      <main className="relative z-10 max-w-3xl w-full">
        <div className="bg-black/60 backdrop-blur-sm rounded-xl p-8 shadow-xl border border-gray-700 text-center">
          <h1 className="text-4xl font-bold text-white mb-6 tracking-tight">Matias Repair</h1>
          <address className="text-gray-300 mb-4 not-italic">Tu dirección aquí</address>
          <p className="text-gray-400 text-lg mb-6">Abierto de tal a tal</p>
          <Link
            href="232323"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200 hover:scale-105 transform"
          >
            Agenda tu reparación
          </Link>
        </div>
      </main>
    </div>
  );
}
