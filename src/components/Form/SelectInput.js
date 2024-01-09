import { useField } from "formik";

export function SelectInput({ ...props }) {
  const [field, meta] = useField(props);
  return (
    <>
      <select
        {...field}
        {...props}
        className="px-8 w-full py-4 font-medium border-gray-500 border focus:outline-none focus:border-sky-500 placeholder:text-gray-400 placeholder:font-light placeholder:mr-5 rounded-sm"
      />

      {meta.touched && meta.error ? (
        <div className="text-red-500 text-sm">{meta.error}</div>
      ) : null}
    </>
  );
}
