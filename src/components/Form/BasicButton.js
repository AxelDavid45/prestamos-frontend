export function BasicButton({ text, type }) {
  return (
    <input
      type={type}
      value={text}
      className="hover:cursor-pointer w-full flex items-center justify-center border-red-500 bg-red-600 text-white pt-6 py-4 font-medium text-lg hover:bg-red-700 transition-colors ease-in"
    />
  );
}
