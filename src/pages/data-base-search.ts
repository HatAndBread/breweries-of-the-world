import type { Template } from "dommie";
import BreweryTable from "../components/brewery-table";

export default (h: Template) => {
  const { div, text, h1, ul, li } = h;
  return h.component(() => {
    div(
      { class: "flex flex-col justify-center items-center min-h-[100vh]" },
      () => {
        h1({ text: "Brewery Search", class: "text-3xl font-semibold mb-8" });
        BreweryTable(h);
      },
    );
  });
};
