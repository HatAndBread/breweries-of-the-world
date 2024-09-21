import { Template } from "dommie";

export default (h: Template) => {
  const { div, ul, li, img, button } = h;
  return h.component(({ r }) => {
    const blur = () => {
      const activeElement = document.activeElement as HTMLElement | null;
      if (activeElement?.blur) activeElement.blur();
    };
    const goto = (path: string) => {
      r.go(path);
      blur();
    };
    div({ class: "navbar bg-accent" }, () => {
      div({ class: "navbar-start" }, () => {
        div({ class: "dropdown" }, () => {
          div(
            {
              tabindex: 0,
              role: "button",
              class: "btn btn-ghost btn-circle",
            },
            () => {
              img({ src: "/burger.svg", width: "24px", height: "24px" });
            },
          );
          ul(
            {
              tabindex: 0,
              class:
                "menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow",
            },
            () => {
              li(() => {
                button({ click: () => goto("/"), text: "Home" });
                button({
                  click: () => goto("/database"),
                  text: "Brewery Database Search",
                });
                button({ click: () => goto("/map"), text: "Beer Map" });
                button({
                  click: () => goto("/my-breweries"),
                  text: "My Breweries",
                });
              });
            },
          );
        });
      });
    });
  });
};
