import { Template } from "dommie";
import BreweryTable from "../components/brewery-table";
import * as api from "../api";

const Home = (h: Template) => {
  const { div, img, h1, a, text, button } = h;
  const click = () => {
    api.listBreweries(0, 10);
  };
  return h.component(({ r }) => {
    div({ class: "hero bg-base-200 min-h-screen" }, () => {
      div({ class: "hero-content flex-col lg:flex-row-reverse" }, () => {
        img({
          src: "/logo.png",
          class: "max-w-[70vw] rounded-lg shadow-2xl",
        });
        div(() => {
          h1({ class: "text-5xl font-bold", text: "Breweries Of The World" });
          div(
            {
              class: "py-6",
            },
            () => {
              text("Welcome to the World Brewery Database, powered by ");
              a({
                href: "https://www.openbrewerydb.org/",
                target: "_blank",
                class: "link link-primary",
                text: "Open Brewery DB",
              });
              text(
                ". Here you can search for breweries, view them on a map, and more.",
              );
            },
          );
          div({ class: "flex flex-col gap-4" }, () => {
            button({
              class: "btn btn-primary",
              text: "Search The Database",
              click: () => r.go("/database"),
            });
            button({
              class: "btn btn-primary",
              text: "World Beer Map",
              click: () => r.go("/map"),
            });
            button({
              class: "btn btn-primary",
              text: "My Breweries",
              click: () => r.go("/map"),
            });
          });
        });
      });
    });
  });
};

// <div class="hero bg-base-200 min-h-screen">
//   <div class="hero-content flex-col lg:flex-row-reverse">
//     <img
//       src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
//       class="max-w-sm rounded-lg shadow-2xl" />
//     <div>
//       <h1 class="text-5xl font-bold">Box Office News!</h1>
//       <p class="py-6">
//         Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
//         quasi. In deleniti eaque aut repudiandae et a id nisi.
//       </p>
//       <button class="btn btn-primary">Get Started</button>
//     </div>
//   </div>
// </div>
export default Home;
