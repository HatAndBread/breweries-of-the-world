import type { Map as LeafletMap } from "leaflet";
export interface Brewery {
  id: string | null;
  name: string | null;
  brewery_type: string | null;
  address_1: string | null;
  address_2: string | null;
  address_3: string | null;
  city: string | null;
  state_province: string | null;
  postal_code: string | null;
  country: string | null;
  longitude: string | null;
  latitude: string | null;
  phone: string | null;
  website_url: string | null;
  state: string | null;
  street: string | null;
}

type LngLat = { lng: number; lat: number };
export interface MapOptions {
  longitude: number;
  latitude: number;
  zoom: number;
  markers?: [{ longitude: number; latitude: number; title: string }];
  onCenterChange?: (lngLat: LngLat, map: LeafletMap) => void;
  onCreated?: (map: LeafletMap) => void;
}
