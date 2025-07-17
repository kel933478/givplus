import { pgTable, text, serial, integer, boolean, timestamp, decimal, jsonb } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  role: text("role").notNull().default("user"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Associations table
export const associations = pgTable("associations", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  logo: text("logo"),
  description: text("description"),
  status: text("status").notNull().default("active"),
  balance: decimal("balance", { precision: 10, scale: 2 }).default("0"),
  totalDonations: decimal("total_donations", { precision: 10, scale: 2 }).default("0"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Campaigns table
export const campaigns = pgTable("campaigns", {
  id: serial("id").primaryKey(),
  associationId: integer("association_id").notNull().references(() => associations.id),
  title: text("title").notNull(),
  description: text("description"),
  target: decimal("target", { precision: 10, scale: 2 }).notNull(),
  raised: decimal("raised", { precision: 10, scale: 2 }).default("0"),
  deadline: timestamp("deadline"),
  image: text("image"),
  video: text("video"),
  status: text("status").notNull().default("active"),
  donationType: text("donation_type").notNull().default("unique"),
  matching: decimal("matching", { precision: 10, scale: 2 }),
  contactCount: integer("contact_count").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Donors table
export const donors = pgTable("donors", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone"),
  totalDonated: decimal("total_donated", { precision: 10, scale: 2 }).default("0"),
  lastDonation: timestamp("last_donation"),
  frequency: text("frequency").notNull().default("unique"),
  tag: text("tag").notNull().default("nouveau"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Donations table
export const donations = pgTable("donations", {
  id: serial("id").primaryKey(),
  campaignId: integer("campaign_id").notNull().references(() => campaigns.id),
  donorId: integer("donor_id").notNull().references(() => donors.id),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  type: text("type").notNull().default("donation"),
  status: text("status").notNull().default("completed"),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Events table
export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  associationId: integer("association_id").notNull().references(() => associations.id),
  title: text("title").notNull(),
  description: text("description"),
  date: timestamp("date").notNull(),
  location: text("location"),
  maxParticipants: integer("max_participants"),
  registeredCount: integer("registered_count").default(0),
  price: decimal("price", { precision: 10, scale: 2 }),
  image: text("image"),
  zoomLink: text("zoom_link"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Event participants table
export const eventParticipants = pgTable("event_participants", {
  id: serial("id").primaryKey(),
  eventId: integer("event_id").notNull().references(() => events.id),
  name: text("name").notNull(),
  email: text("email").notNull(),
  registrationDate: timestamp("registration_date").defaultNow(),
  status: text("status").notNull().default("confirmed"),
});

// AI Prompts table
export const aiPrompts = pgTable("ai_prompts", {
  id: serial("id").primaryKey(),
  content: text("content").notNull(),
  tone: text("tone").notNull().default("inspirant"),
  generatedText: text("generated_text"),
  readabilityScore: integer("readability_score"),
  recommendations: jsonb("recommendations"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Relations
export const associationsRelations = relations(associations, ({ many }) => ({
  campaigns: many(campaigns),
  events: many(events),
}));

export const campaignsRelations = relations(campaigns, ({ one, many }) => ({
  association: one(associations, {
    fields: [campaigns.associationId],
    references: [associations.id],
  }),
  donations: many(donations),
}));

export const donorsRelations = relations(donors, ({ many }) => ({
  donations: many(donations),
}));

export const donationsRelations = relations(donations, ({ one }) => ({
  campaign: one(campaigns, {
    fields: [donations.campaignId],
    references: [campaigns.id],
  }),
  donor: one(donors, {
    fields: [donations.donorId],
    references: [donors.id],
  }),
}));

export const eventsRelations = relations(events, ({ one, many }) => ({
  association: one(associations, {
    fields: [events.associationId],
    references: [associations.id],
  }),
  participants: many(eventParticipants),
}));

export const eventParticipantsRelations = relations(eventParticipants, ({ one }) => ({
  event: one(events, {
    fields: [eventParticipants.eventId],
    references: [events.id],
  }),
}));

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertAssociationSchema = createInsertSchema(associations).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertCampaignSchema = createInsertSchema(campaigns).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertDonorSchema = createInsertSchema(donors).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertDonationSchema = createInsertSchema(donations).omit({
  id: true,
  createdAt: true,
});

export const insertEventSchema = createInsertSchema(events).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertEventParticipantSchema = createInsertSchema(eventParticipants).omit({
  id: true,
  registrationDate: true,
});

export const insertAIPromptSchema = createInsertSchema(aiPrompts).omit({
  id: true,
  createdAt: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertAssociation = z.infer<typeof insertAssociationSchema>;
export type Association = typeof associations.$inferSelect;

export type InsertCampaign = z.infer<typeof insertCampaignSchema>;
export type Campaign = typeof campaigns.$inferSelect;

export type InsertDonor = z.infer<typeof insertDonorSchema>;
export type Donor = typeof donors.$inferSelect;

export type InsertDonation = z.infer<typeof insertDonationSchema>;
export type Donation = typeof donations.$inferSelect;

export type InsertEvent = z.infer<typeof insertEventSchema>;
export type Event = typeof events.$inferSelect;

export type InsertEventParticipant = z.infer<typeof insertEventParticipantSchema>;
export type EventParticipant = typeof eventParticipants.$inferSelect;

export type InsertAIPrompt = z.infer<typeof insertAIPromptSchema>;
export type AIPrompt = typeof aiPrompts.$inferSelect;
