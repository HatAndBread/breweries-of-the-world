import { Template } from "dommie";

export default (h: Template) => {
  const { div, ul, li, a } = h;
  return h.component(({ r, state, subscribe }) => {
    const routeNames = {
      home: "Home",
      brewery: "Brewery",
      database: "Brewery Search",
      map: "Brewery Map",
      "my-breweries": "My Breweries",
    };
    const pathToArr = () => {
      const paths = r.path.value
        .split("/")
        .filter((p) => p && Object.keys(routeNames).includes(p))
        .map((p) => routeNames[p as keyof typeof routeNames]);
      paths.unshift("Home");
      return paths;
    };
    const currentPath = state<string[]>(pathToArr());
    subscribe(() => {
      currentPath.update(pathToArr());
    }, [r.path]);

    div({ subscribe: currentPath }, () => {
      if (r.path.value === "/") return;
      div({ class: "breadcrumbs text-sm p-4" }, () => {
        ul({ subscribe: currentPath }, () => {
          currentPath.value.forEach((p, i) => {
            li({ id: i }, () => {
              a({
                click: () =>
                  r.go(
                    i === 0
                      ? "/"
                      : `/${Object.keys(routeNames).find(
                          (key) =>
                            routeNames[key as keyof typeof routeNames] === p,
                        )}`,
                  ),
                text: p,
              });
            });
          });
        });
      });
    });
  });
};
