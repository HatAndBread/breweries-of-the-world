import type { Template } from "dommie";
import { favoriteBreweries, removeBreweryFromFavorites } from "../storage";

export default (h: Template) => {
  return h.component(({ afterMounted, state, r }) => {
    const breweries = state(favoriteBreweries());
    afterMounted(() => {});

    const { div, img, h1, h2, ul, li, button } = h;
    div({ class: "min-h-screen flex flex-col items-center" }, () => {
      h1({ text: "My Breweries", class: "text-3xl font-semibold my-8" });
      ul({ subscribe: breweries }, () => {
        breweries.value.forEach((b) => {
          li({ id: b.id, class: "flex items-center gap-4" }, () => {
            button(
              {
                click: () => {
                  const yes = confirm(
                    `Are you sure you want to remove ${b.name} from your favorites?`,
                  );
                  if (yes) breweries.update(removeBreweryFromFavorites(b));
                },
              },
              () => {
                img({
                  src: "/trash.svg",
                  alt: "Delete",
                  width: "24px",
                  height: "24px",
                });
              },
            );
            button({
              class: "link font-semibold",
              text: b.name,
              click: () => r.go(`/brewery/${b.id}`),
            });
          });
        });
      });
    });
  });
};
