import { BasicButton } from "@/components/Form/BasicButton";
import { InputNumber } from "@/components/Form/InputNumber";
import { SelectInput } from "@/components/Form/SelectInput";
import { materialsOptions } from "@/shared/constants";
import { Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { FaMoneyBillWave } from "react-icons/fa";
import Image from "next/image";

const LoanSchema = Yup.object({
  amount: Yup.number("Necesitas ingresar la cantidad de gramos").required(
    "La cantidad de gramos es obligatoria"
  ),
  publicId: Yup.string().required("Debes seleccionar un tipo de material"),
});
export function CalculateForm() {
  const initialValues = { amount: "", publicId: "" };
  const [error, setError] = useState({
    active: false,
    description: "",
  });
  const [amountCalculated, setAmountCalculated] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (values, state) => {
    setIsLoading(true);
    try {
      const dataFetch = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/loans`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: values.publicId, weight: values.amount }),
        }
      );

      if (!dataFetch.ok) {
        setError({
          active: true,
          description: "Error obteniendo la simulación",
        });
        return;
      }
      const { amount = 0, name = "" } = await dataFetch.json();

      setAmountCalculated(amount);
    } catch (error) {
      console.error(error);
      setError({
        active: true,
        description: "Error obteniendo la simulación",
      });
      setIsLoading(false);
    } finally {
      setTimeout(() => {
        setError({ active: false, description: "" });
      }, 2500);
    }
  };

  return (
    <>
      {error.active && (
        <div className="mb-5 container bg-red-500 py-3 px-4 text-white rounded-md">
          {error.description}
        </div>
      )}
      <Formik
        initialValues={initialValues}
        validationSchema={LoanSchema}
        onSubmit={onSubmit}
      >
        {(formik) => {
          return (
            <form onSubmit={formik.handleSubmit} className="flex flex-col">
              <div className="mt-3">
                <InputNumber
                  id="amount"
                  type="number"
                  name="amount"
                  placeholder="Peso en gramos de tu prenda"
                />
              </div>
              <div className="mt-8 w-full">
                <SelectInput id="publicId" name="publicId">
                  <option value="">Selecciona un tipo de material</option>
                  {materialsOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </SelectInput>
              </div>

              <div className="mt-5">
                <BasicButton
                  text="Calcular"
                  type="submit"
                  disabled={formik.isSubmitting}
                />
              </div>
            </form>
          );
        }}
      </Formik>

      {isLoading && !amountCalculated && (
        <div className=" flex flex-col mt-10 shadow-lg w-full justify-center items-center rounded-md ">
          <Image src="/spinner.gif" width={150} height={200} alt="loader" />
        </div>
      )}
      {amountCalculated ? (
        <div className="border-red-500 bg-orange-500 text-white flex flex-col mt-10 shadow-lg w-full justify-center items-center rounded-md ">
          <h3 className="text-xl mt-3">Monto generado</h3>
          <div className="text-3xl mt-3">
            <FaMoneyBillWave className="" />
          </div>
          <h3 className="text-2xl mt-3">
            {new Intl.NumberFormat("es-MX", {
              style: "currency",
              currency: "MXN",
            }).format(amountCalculated)}
          </h3>
        </div>
      ) : null}
    </>
  );
}
