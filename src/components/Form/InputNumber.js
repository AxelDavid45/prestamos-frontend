import { useField } from "formik";

export function InputNumber({ ...props }) {
  const [field, meta] = useField(props);
  return (
    <>
      <input
        {...field}
        {...props}
        className="w-full lock px-8 py-4 font-medium border-gray-500 border focus:outline-none focus:border-sky-500 placeholder:text-gray-400 placeholder:font-light placeholder:mr-5 rounded-sm"
      />
      {meta.touched && meta.error ? (
        <div className="text-red-500 text-sm">{meta.error}</div>
      ) : null}
    </>
  );
}
