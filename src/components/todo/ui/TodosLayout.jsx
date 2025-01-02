export function TodosLayout({ children, todosIsEmpty }) {
  if (todosIsEmpty) {
    return (
      <div className="text-center text-gray-500">
        <p className="text-xl font-semibold">Список задач пуст!</p>
        <p className="text-sm">Добавьте свою первую задачу, чтобы начать</p>
      </div>
    );
  } else {
    return <div className="flex flex-col gap-y-2 w-full">{children}</div>;
  }
}
