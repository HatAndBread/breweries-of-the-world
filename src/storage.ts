import { Brewery } from "./types";

export const addBreweryToFavorites = (brewery: Brewery) => {
  const breweries = favoriteBreweries();
  if (breweries.find((b: Brewery) => b.id === brewery.id)) return;
  breweries.push(brewery);
  localStorage.setItem("breweries", JSON.stringify(breweries));
  return breweries;
};

export const favoriteBreweries = (): Brewery[] => {
  const json = localStorage.getItem("breweries");
  return json ? JSON.parse(json) : [];
};

export const removeBreweryFromFavorites = (brewery: Brewery) => {
  const breweries = favoriteBreweries();
  const newBreweries = breweries.filter((b: Brewery) => b.id !== brewery.id);
  localStorage.setItem("breweries", JSON.stringify(newBreweries));
  return newBreweries;
};
