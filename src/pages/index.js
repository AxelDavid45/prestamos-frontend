import { CalculateForm } from "@/sections/Calculate/CalculateForm";
import Image from "next/image";

export default function Index() {
  return (
    <main className="flex flex-col">
      <nav className=" bg-red-200">
        <div className="w-full container">
          <a href="/">
            <Image
              className="max-w-[200px]"
              src="/monte-piedad-logo.webp"
              alt="Presta Prenda"
              width={200}
              height={200}
            />
          </a>
        </div>
      </nav>
      <section className="flex-1 min-h-screen mt-5">
        <div className="flex flex-col items-center container  mx-auto">
          <h1 className="text-5xl font-bold">Presta Prenda</h1>
          <p className="text-center font-light mt-2 ">
            ¡Desbloquea el valor de tus prendas con Presta Prenda! Transforma
            tus artículos en efectivo de manera rápida y segura. ¡Confía en
            nosotros para obtener la liquidez que necesitas hoy mismo!
          </p>
        </div>

        <div className="max-w-[700px] bg-white mx-auto mt-5 p-3 md:p-0">
          <CalculateForm />
        </div>
      </section>
    </main>
  );
}
