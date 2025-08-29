import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const claims = pgTable("claims", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  category: varchar("category", { length: 50 }).notNull(), // 'pojazdy', 'majatek', 'ludzie'
  status: varchar("status", { length: 50 }).notNull().default('draft'), // 'draft', 'submitted', 'processing', 'completed'
  claimantName: text("claimant_name").notNull(),
  claimantEmail: text("claimant_email").notNull(),
  claimantPhone: text("claimant_phone").notNull(),
  incidentDate: timestamp("incident_date").notNull(),
  incidentDescription: text("incident_description").notNull(),
  claimData: json("claim_data"), // Category-specific data
  createdAt: timestamp("created_at").default(sql`now()`).notNull(),
  updatedAt: timestamp("updated_at").default(sql`now()`).notNull(),
});

export const insertClaimSchema = createInsertSchema(claims).pick({
  category: true,
  claimantName: true,
  claimantEmail: true,
  claimantPhone: true,
  incidentDate: true,
  incidentDescription: true,
  claimData: true,
});

export type InsertClaim = z.infer<typeof insertClaimSchema>;
export type Claim = typeof claims.$inferSelect;

// Category-specific schemas
export const vehicleClaimDataSchema = z.object({
  vehicleType: z.enum(['samochod', 'motocykl', 'inny']),
  licensePlate: z.string().min(1),
  vehicleMake: z.string().min(1),
  vehicleModel: z.string().min(1),
  vehicleYear: z.number().min(1900).max(new Date().getFullYear() + 1),
  damageType: z.enum(['kolizja', 'kradziez', 'uszkodzenie_mechaniczne', 'inne']),
  policeReportNumber: z.string().optional(),
});

export const propertyClaimDataSchema = z.object({
  propertyType: z.enum(['dom', 'mieszkanie', 'sprzet_rtv', 'agd', 'inne']),
  propertyAddress: z.string().min(1),
  damageType: z.enum(['zalanie', 'pozar', 'kradziez', 'uszkodzenie', 'inne']),
  estimatedValue: z.number().min(0),
  hasPhotos: z.boolean().default(false),
});

export const peopleClaimDataSchema = z.object({
  claimType: z.enum(['wypadek', 'choroba', 'smierc', 'inne']),
  affectedPerson: z.string().min(1),
  relationToClaimant: z.enum(['ja', 'malzonek', 'dziecko', 'rodzic', 'inne']),
  medicalFacility: z.string().optional(),
  doctorName: z.string().optional(),
  treatmentCost: z.number().min(0).optional(),
});

export type VehicleClaimData = z.infer<typeof vehicleClaimDataSchema>;
export type PropertyClaimData = z.infer<typeof propertyClaimDataSchema>;
export type PeopleClaimData = z.infer<typeof peopleClaimDataSchema>;
