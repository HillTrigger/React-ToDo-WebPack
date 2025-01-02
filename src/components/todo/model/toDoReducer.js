import { ACTIONS } from "../constans";

function newToDo({ name }) {
  return { id: Date.now(), name: name, complete: false, isEdit: false };
}

export function toDoReducer(todoState, action) {
  switch (action.type) {
    case ACTIONS.ADD_TODO: {
      const newTodoState = {
        ...todoState,
        todos: [...todoState.todos, newToDo({ name: action.payload.name })],
      };
      loadDataToLocalStorage(newTodoState);
      return newTodoState;
    }
    case ACTIONS.TOGGLE_TODO: {
      const newTodoState = {
        ...todoState,
        todos: todoState.todos.map((todo) => {
          if (todo.id === action.payload.id) {
            return { ...todo, complete: !todo.complete };
          } else {
            return todo;
          }
        }),
      };
      loadDataToLocalStorage(newTodoState);
      return newTodoState;
    }
    case ACTIONS.RM_TODO: {
      const newTodoState = {
        ...todoState,
        todos: todoState.todos.filter((todo) => todo.id !== action.payload.id),
      };
      loadDataToLocalStorage(newTodoState);
      return newTodoState;
    }
    case ACTIONS.CHANGE_TODO: {
      const newTodoState = {
        ...todoState,
        todos: todoState.todos.map((todo) => {
          if (todo.id === action.payload.id) {
            return { ...todo, name: action.payload.name };
          } else {
            return todo;
          }
        }),
      };
      loadDataToLocalStorage(newTodoState);
      return newTodoState;
    }
    case ACTIONS.TOGGLE_EDIT: {
      const newTodoState = {
        ...todoState,
        todos: todoState.todos.map((todo) => {
          if (todo.complete) return todo;
          if (todo.id === action.payload.id) {
            return { ...todo, isEdit: !todo.isEdit };
          } else {
            return todo;
          }
        }),
      };
      loadDataToLocalStorage(newTodoState);
      return newTodoState;
    }
    case ACTIONS.CHANGE_SORT_METHOD: {
      const newTodoState = {
        ...todoState,
        sortMethod: { ...action.payload.sortMethod },
        todos: sortTodos(todoState.todos, action.payload.sortMethod.id),
      };
      loadDataToLocalStorage(newTodoState);
      return newTodoState;
    }
    case ACTIONS.GET_DATA: {
      const savedData = window.localStorage.getItem("todoStateData");
      if (!savedData) {
        return todoState;
      }
      try {
        return JSON.parse(savedData);
      } catch (error) {
        console.error("Ошибка при разборе данных из localStorage:", error);
        return todoState;
      }
    }
    default:
      return todoState;
  }
}

function sortTodos(todos, sortMethodId) {
  switch (sortMethodId) {
    case 1:
      return [...todos].sort((a, b) => a.id - b.id);
    case 2:
      return [...todos].sort((a, b) => {
        if (a.complete == b.complete) {
          return a.id - b.id;
        } else {
          return a.complete ? 1 : -1;
        }
      });
    case 3:
      return [...todos].sort((a, b) => {
        if (a.complete == b.complete) {
          return a.id - b.id;
        } else {
          return a.complete ? -1 : 1;
        }
      });
    default:
      console.log("error sortTodos");
      return todos;
  }
}

function loadDataToLocalStorage(todoState) {
  try {
    window.localStorage.setItem("todoStateData", JSON.stringify(todoState));
  } catch (error) {
    console.error("Failed to save data to Local Storage:", error);
  }
}
