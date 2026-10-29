"use client";

import { createContext, useContext, useMemo, useState } from "react";

type Ctx = { service: string; setService: (id: string) => void };
const QuoteContext = createContext<Ctx>({ service: "", setService: () => {} });

/** Mémorise le service choisi sur « Demander un devis » pour pré-remplir le formulaire de contact. */
export function QuoteProvider({ children }: { children: React.ReactNode }) {
  const [service, setService] = useState("");
  const value = useMemo(() => ({ service, setService }), [service]);
  return <QuoteContext.Provider value={value}>{children}</QuoteContext.Provider>;
}

export const useQuote = () => useContext(QuoteContext);
