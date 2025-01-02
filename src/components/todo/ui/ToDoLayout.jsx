export function ToDoLayout({ children }) {
  return (
    <div className="flex flex-col gap-4 items-center pt-5 pb-5 max-w-[32rem] mx-auto">
      {children}
    </div>
  );
}
