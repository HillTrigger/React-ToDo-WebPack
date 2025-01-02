import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";

export function UiSelect({ settings, selected, onChange, todosIsEmpty }) {
  if (todosIsEmpty) return null;
  return (
    <div className="w-32 ml-auto text-black">
      <Listbox value={selected} onChange={onChange}>
        <ListboxButton
          className={clsx(
            "relative block w-full rounded-md bg-white py-1.5 pr-8 pl-3 text-left text-sm/6 text-black",
            "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black/25"
          )}
        >
          {selected.name}
          <ChevronDownIcon
            className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-black/60"
            aria-hidden="true"
          />
        </ListboxButton>
        <ListboxOptions
          anchor="bottom"
          transition
          className={clsx(
            "w-[var(--button-width)]  border border-black/5 bg-white p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none",
            "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0"
          )}
        >
          {settings.map((setting) => (
            <ListboxOption
              key={setting.name}
              value={setting}
              className="group flex cursor-default items-center gap-2 py-1.5 px-3 select-none data-[focus]:bg-black/10"
            >
              <div className="text-sm/6 text-black">{setting.name}</div>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </div>
  );
}
