import type { Template } from "dommie";
import type { Brewery } from "../types";
import { breweryTypes } from "../brewery-types";
import Search from "./search";
import * as api from "../api";

export default (h: Template) => {
  const { component } = h;
  return component(({ afterMounted, state, subscribe, ref, r }) => {
    const { div, table, tr, th, td, thead, tbody, a, text, button, span } = h;
    const PER_PAGE = 20;
    // Paging seems to start at 1
    const page = state(1);
    const searchParam = state<null | string>(null);
    const decrementPage = () => {
      if (page.value > 1) {
        page.update(page.value - 1);
      }
    };
    const incrementPage = () => {
      if (breweries.value && breweries.value.length === PER_PAGE) {
        page.update(page.value + 1);
      }
    };

    const scrollRef = ref();

    const breweries = state<Brewery[] | null>(null);

    const fetchBreweries = async () => {
      breweries.update(null);
      let result: Brewery[];
      if (searchParam.value) {
        result = await api.searchBreweries(
          searchParam.value,
          page.value,
          PER_PAGE,
        );
      } else {
        result = await api.listBreweries(page.value, PER_PAGE);
      }
      if (!result.length && page.value > 1) {
        page.update(page.value - 1);
        return;
      }
      breweries.update(result);
      scrollRef()?.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    };

    subscribe(() => {
      fetchBreweries();
    }, [page]);
    subscribe(() => {
      page.update(1);
    }, [searchParam]);

    afterMounted(async () => {
      try {
        await fetchBreweries();
        const result = await api.listBreweries(page.value, PER_PAGE);
        breweries.update(result);
      } catch {
        alert("Failed to load breweries. Sorry! 😿");
      }
    });

    // Template
    div(
      {
        class:
          "overflow-x-auto h-[62vh] max-w-[90vw] w-[1200px] px-8 border border-solid rounded-lg",
        ref: scrollRef,
      },
      () => {
        div({ class: "w-full my-4" }, () => {
          Search(h, searchParam);
        });
        table({ class: "table table-pin-rows" }, () => {
          thead(() => {
            tr(() => {
              th();
              th({ text: "Name" });
              th({ text: "Type" });
              th({ text: "Country" });
              th({ text: "Region" });
              th({ text: "City" });
              th({ text: "Website" });
            });
          });
          tbody({ subscribe: breweries }, () => {
            if (!breweries.value) {
              tr(() => {
                td({ colspan: 1000, style: { textAlign: "center" } }, () => {
                  span({
                    class: "loading loading-spinner text-secondary loading-lg",
                  });
                });
              });
              return;
            }
            breweries.value.forEach((brewery, i) => {
              tr({ id: brewery.id }, () => {
                th({ text: i + (page.value - 1) * PER_PAGE + 1 });
                td(() => {
                  button({
                    class: "link text-primary",
                    text: brewery.name,
                    click: () => r.go(`/brewery/${brewery.id}`),
                  });
                });
                td({
                  text: breweryTypes[
                    brewery.brewery_type as keyof typeof breweryTypes
                  ],
                });
                td({ text: brewery.country });
                td({ text: brewery.state_province });
                td({ text: brewery.city });
                td(() => {
                  if (brewery.website_url) {
                    a({
                      class: "link text-secondary",
                      href: brewery.website_url,
                      text: brewery.website_url,
                      target: "_blank",
                    });
                  } else {
                    text("-");
                  }
                });
              });
            });
          });
        });
      },
    );
    div(
      {
        class:
          "join w-[1200px] max-w-[90vw] mt-4 flex justify-between items-center",
        subscribe: [page, breweries],
      },
      () => {
        button({
          class: "join-item btn w-[33%]",
          text: "«",
          click: decrementPage,
          disabled: page.value === 1,
        });
        button({
          class: "join-item btn w-[34%]",
          text: `Page ${page.value}`,
        });
        button({
          class: "join-item btn w-[33%]",
          text: "»",
          click: incrementPage,
          disabled: !breweries.value || breweries.value.length < PER_PAGE,
        });
      },
    );
  });
};
