import "./style.css";
import app, { router, Template } from "dommie";
import Home from "./pages/home";
import Map from "./pages/map";
import Navbar from "./components/navbar";
import Breadcrumbs from "./components/breadcrumbs";
import Footer from "./components/footer";
import DataBaseSearch from "./pages/data-base-search";
import Brewery from "./pages/brewery";
import NotFound from "./pages/not-found";
import MyBreweries from "./pages/my-breweries";

const AppRoute = (h: Template) => {
  return h.component(() => {
    Navbar(h);
    Breadcrumbs(h);
    router(
      {
        "/": Home,
        "/database": DataBaseSearch,
        "/map": Map,
        "/my-breweries": MyBreweries,
        "/brewery/*": Brewery,
      },
      h,
      NotFound,
    );
    Footer(h);
  });
};

app(AppRoute, "#app", { spa: true });
