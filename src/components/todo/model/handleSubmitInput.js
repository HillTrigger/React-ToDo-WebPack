import { ACTIONS } from "../constans";

export function handleSubmitInput({ e, dispatch, setTextInput }) {
  e.preventDefault();
  if (!e.target.firstElementChild.value) return;
  dispatch({
    type: ACTIONS.ADD_TODO,
    payload: { name: e.target.firstElementChild.value },
  });
  setTextInput("");
  return null;
}
