import { Template } from "dommie";
import L, { Marker } from "leaflet";
import MapComponent from "../components/map-component";
import { getByDistance } from "../api";
import { Brewery } from "../types";
import debounce from "lodash.debounce";

const BeerMap = (h: Template) => {
  return h.component(({ afterMounted, state }) => {
    const initialLngLat = state<null | { latitude: number; longitude: number }>(
      null,
    );
    const localBreweries = state<Brewery[]>([]);
    const closestBrewery = state<null | Brewery>(null);
    const currentMap = state<null | L.Map>(null);
    let markers: Marker[] = [];
    afterMounted(async () => {
      // get the users location
      window.navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const dist = await getByDistance(latitude, longitude);
        initialLngLat.update({ latitude, longitude });
        if (dist?.[0]) closestBrewery.update(dist[0]);
      });
    });
    const beerIcon = L.icon({
      iconUrl: "/beer-map-icon.png",
      iconSize: [30, 30],
    });
    const { div, text, h1, span, button } = h;
    div({ class: "min-h-screen flex flex-col items-center" }, () => {
      h1({ text: "Beer Map", class: "text-3xl font-semibold my-8" });
      div({ subscribe: initialLngLat }, () => {
        if (!initialLngLat.value) {
          span({
            class: "loading loading-spinner text-secondary loading-lg",
          });
          return;
        }
      });
      div({ subscribe: [closestBrewery, currentMap] }, () => {
        if (!closestBrewery.value || !currentMap.value) return;
        div({ role: "alert", class: "alert shadow-lg mb-8" }, () => {
          div(() => {
            h1(
              {
                class: "font-bold",
              },
              () => {
                text(`The closest brewery we found to you was `);
                button({
                  text: closestBrewery.value!.name,
                  class: "link",
                  click: () =>
                    currentMap.value!.setView({
                      lng: parseFloat(closestBrewery.value!.longitude || "0"),
                      lat: parseFloat(closestBrewery.value!.latitude || "0"),
                    }),
                });
              },
            );
          });
        });
      });
      div({ subscribe: initialLngLat }, () => {
        if (!initialLngLat.value) return;
        MapComponent(h, {
          longitude: initialLngLat.value.longitude,
          latitude: initialLngLat.value.latitude,
          zoom: 12,
          onCreated: (map) => currentMap.update(map),
          onCenterChange: debounce(async (coords, map) => {
            try {
              const dist = await getByDistance(coords.lat, coords.lng);
              markers.forEach((m) => m.remove());
              markers = [];
              localBreweries.update(dist);
              localBreweries.value.forEach((brewery) => {
                const marker = L.marker(
                  [
                    parseFloat(String(brewery.latitude)),
                    parseFloat(String(brewery.longitude)),
                  ],
                  { icon: beerIcon },
                )
                  .addTo(map)
                  .bindPopup(
                    `<a href="/brewery/${brewery.id}" class="link">${brewery.name}</a>`,
                  );
                markers.push(marker);
              });
            } catch {
              console.warn("Error fetching breweries");
            }
          }, 400),
        });
      });
    });
  });
};

export default BeerMap;
