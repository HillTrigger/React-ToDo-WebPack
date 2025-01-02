export function ToDoInput({ textInput, onChange, onSubmit, ...htmlProps }) {
  return (
    <form onSubmit={onSubmit} className="flex w-full items-center gap-2">
      <input
        onChange={onChange}
        type="text"
        value={textInput}
        className="border w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
        {...htmlProps}
      />
    </form>
  );
}
