import type { Template } from "dommie";
import type { MapOptions } from "../types";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

export default (h: Template, options: MapOptions) => {
  const { component, div } = h;

  return component(({ afterMounted }) => {
    afterMounted(() => {
      const southWest = L.latLng(-89.98155760646617, -180),
        northEast = L.latLng(89.99346179538875, 180);
      const bounds = L.latLngBounds(southWest, northEast);
      const map = L.map("map").setView(
        [options.latitude, options.longitude],
        options.zoom,
      );
      map.setMaxBounds(bounds);
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);
      if (options.markers) {
        options.markers.forEach((marker) => {
          L.marker([marker.latitude, marker.longitude])
            .addTo(map)
            .bindPopup(marker.title);
        });
      }
      if (options.onCenterChange) {
        map.on("moveend", () => {
          const center = map.getCenter();
          if (options.onCenterChange)
            options.onCenterChange({ lng: center.lng, lat: center.lat }, map);
        });
      }
      if (options.onCreated) options.onCreated(map);
    });
    div({
      id: "map",
      style: {
        height: "80vh",
        maxHeight: "340px",
        maxWidth: "500px",
        width: "80vw",
        margin: "auto",
        borderRadius: "8px",
      },
    });
  });
};
