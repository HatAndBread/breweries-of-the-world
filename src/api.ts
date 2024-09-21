const API_BASE = "https://api.openbrewerydb.org/v1/breweries";
const SEARCH = API_BASE + "/search?query=";
const AUTO_COMPLETE = API_BASE + "/autocomplete?query=";
const getPage = (num: number) => `page=${num}`;
const getPerPage = (num: number) => `per_page=${num}`;
const getByDist = (lat: number, lng: number) => `by_dist=${lat},${lng}`;

export const listBreweries = async (page: number, perPage: number) => {
  const result = await fetch(
    `${API_BASE}?${getPage(page)}&${getPerPage(perPage)}`,
    { cache: "no-store" },
  );
  const data = await result.json();
  return data;
};

export const getBreweryById = async (id: string) => {
  const result = await fetch(`${API_BASE}/${id}`);
  const data = await result.json();
  return data;
};

export const listBreweriesByCountry = async (
  country: string,
  perPage: number,
) => {
  const result = await fetch(
    `${API_BASE}?by_country=${country}&${getPerPage(perPage)}`,
  );
  const data = await result.json();
  return data;
};

export const searchBreweries = async (
  query: string,
  page: number,
  perPage: number,
) => {
  const result = await fetch(
    `${SEARCH}${query}&${getPage(page)}&${getPerPage(perPage)}`,
    { cache: "no-store" },
  );
  const data = await result.json();
  return data;
};

export const autoCompleteBreweries = async (query: string) => {
  const result = await fetch(`${AUTO_COMPLETE}${query}`);
  const data = await result.json();
  return data;
};

export const getByDistance = async (lat: number, lng: number) => {
  const result = await fetch(`${API_BASE}?${getByDist(lat, lng)}`);
  const data = await result.json();
  return data;
};

export const getMeta = async () => {
  const metaEndpoint =
    "https://api.openbrewerydb.org/v1/breweries/meta?query=austin";
  const result = await fetch(metaEndpoint);
  const data = await result.json();

  return data;
};
