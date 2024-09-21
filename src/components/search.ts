import { Template, State } from "dommie";
import debounce from "lodash.debounce";

export default (h: Template, searchParam: State<null | string>) => {
  const { component } = h;
  const handleInput = debounce((e: InputEvent) => {
    searchParam.update((e.target as HTMLInputElement).value);
  }, 300);
  return component(() => {
    const { label, input, img } = h;
    label({ class: "input input-bordered flex items-center gap-2" }, () => {
      input({
        type: "text",
        class: "grow",
        placeholder: "Search",
        input: handleInput,
      });
      img({
        src: "/search.svg",
        class: "h-4 w-4 opacity-70 invisible md:visible",
        alt: "search icon",
      });
    });
  });
};
