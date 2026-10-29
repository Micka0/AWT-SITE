import { FCFA_PER_EUR } from "./site";

export type Currency = "XOF" | "EUR";

const group = (n: number) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "\u00a0");

export function formatPrice(fcfa: number, currency: Currency) {
  if (currency === "XOF") return { amount: group(fcfa), unit: "FCFA" };
  const eur = Math.round(fcfa / FCFA_PER_EUR / 10) * 10;
  return { amount: group(eur), unit: "€" };
}
