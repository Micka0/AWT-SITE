import { z } from "zod";

export const contactSchema = z.object({
  name: z.string({ error: "Indiquez votre nom." }).trim().min(2, "Indiquez votre nom.").max(100, "Nom trop long."),
  email: z.email({ error: "Adresse e-mail invalide." }).max(160, "Adresse trop longue."),
  phone: z
    .string()
    .trim()
    .max(30, "Numéro trop long.")
    .regex(/^[+()\d\s.-]*$/, "Numéro invalide.")
    .optional(),
  service: z.string().trim().max(80).optional(),
  message: z
    .string({ error: "Décrivez votre besoin." })
    .trim()
    .min(10, "Décrivez brièvement votre besoin (10 caractères minimum).")
    .max(2000, "Message trop long (2000 caractères maximum)."),
  /** Champ piège anti-spam : doit rester vide */
  website: z.string().max(0).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
