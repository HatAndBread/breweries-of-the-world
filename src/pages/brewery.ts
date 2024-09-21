import type { Template } from "dommie";
import type { Brewery } from "../types";
import { getBreweryById } from "../api";
import { breweryTypes } from "../brewery-types";
import MapComponent from "../components/map-component";
import { favoriteBreweries, addBreweryToFavorites } from "../storage";

export default (h: Template) => {
  const { button, a, ul, li, div, span, component, h1, img, text } = h;

  return component(({ r, afterMounted, state }) => {
    const id = r.pathVariablesMap.brewery;
    const brewery = state<null | Brewery>(null);
    const isFavorite = state(!!favoriteBreweries().find((b) => b.id === id));

    afterMounted(async () => {
      try {
        const result = await getBreweryById(id);
        brewery.update(result);
      } catch {
        alert(`Sorry, we had trouble loading the brewery with id ${id}. 😿`);
      }
    });

    div(
      {
        class: "w-full flex flex-col items-center min-h-screen",
        subscribe: brewery,
      },
      () => {
        if (!brewery.value) {
          span({ class: "loading loading-spinner text-secondary loading-lg" });
          return;
        }
        h1({ text: brewery.value.name, class: "text-2xl font-semibold" });
        ul({ class: "flex flex-col gap-4 mt-4" }, () => {
          if (brewery.value?.website_url) {
            li({ class: "flex gap-4" }, () => {
              img({
                src: "/web.svg",
                alt: "website",
                width: "24px",
                height: "24px",
              });
              a({
                text: brewery.value!.website_url,
                href: brewery.value!.website_url,
                class: "text-primary",
                target: "_blank",
              });
            });
          }
          if (brewery.value?.phone) {
            li({ class: "flex gap-4" }, () => {
              img({
                src: "/phone.svg",
                alt: "phone",
                width: "24px",
                height: "24px",
              });
              a({
                href: "tel: " + brewery.value!.phone,
                value: brewery.value!.phone,
                class: "text-primary",
                text: brewery.value!.phone,
              });
            });
          }
          li({ class: "flex gap-4" }, () => {
            img({
              src: "/beer.svg",
              alt: "beer",
              width: "24px",
              height: "24px",
            });
            div({
              class: "text-accent",
              text:
                breweryTypes[
                  brewery.value?.brewery_type as keyof typeof breweryTypes
                ] || "?",
            });
          });
          li({ class: "flex gap-4", subscribe: isFavorite }, () => {
            if (isFavorite.value) {
              span({ class: "flex gap-1" }, () => {
                img({
                  src: "/heart.svg",
                  alt: "Favorite",
                  width: "24px",
                  height: "24px",
                });
                text("Added To Your");
                button({
                  class: "link",
                  text: "Favorites",
                  click: () => r.go("/my-breweries"),
                });
              });
            } else {
              button(
                {
                  class: "btn btn-primary",
                  click: () => {
                    addBreweryToFavorites(brewery.value!);
                    isFavorite.update(true);
                  },
                },
                () => {
                  span({ text: "Add To Favorites" });
                  img({
                    src: "/favorite.svg",
                    alt: "Add To Favorites",
                    width: "24px",
                    height: "24px",
                  });
                },
              );
            }
          });
        });
        // Map
        if (brewery.value.longitude && brewery.value.latitude) {
          div({ class: "mt-8" }, () => {
            MapComponent(h, {
              longitude: parseFloat(brewery.value!.longitude!),
              latitude: parseFloat(brewery.value!.latitude!),
              zoom: 12,
              markers: [
                {
                  longitude: parseFloat(brewery.value!.longitude!),
                  latitude: parseFloat(brewery.value!.latitude!),
                  title: brewery.value!.name || "Brewery",
                },
              ],
            });
          });
        }
      },
    );
  });
};
