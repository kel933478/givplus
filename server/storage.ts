import { 
  users, 
  associations,
  campaigns,
  donors,
  donations,
  events,
  eventParticipants,
  type User, 
  type InsertUser,
  type Association,
  type InsertAssociation,
  type Campaign,
  type InsertCampaign,
  type Donor,
  type InsertDonor,
  type Donation,
  type InsertDonation,
  type Event,
  type InsertEvent,
  type EventParticipant,
  type InsertEventParticipant
} from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Association operations
  getAssociation(id: number): Promise<Association | undefined>;
  createAssociation(association: InsertAssociation): Promise<Association>;
  getAssociations(): Promise<Association[]>;

  // Campaign operations
  getCampaign(id: number): Promise<Campaign | undefined>;
  createCampaign(campaign: InsertCampaign): Promise<Campaign>;
  getCampaignsByAssociation(associationId: number): Promise<Campaign[]>;
  updateCampaign(id: number, updates: Partial<Campaign>): Promise<Campaign>;

  // Donor operations
  getDonor(id: number): Promise<Donor | undefined>;
  getDonorByEmail(email: string): Promise<Donor | undefined>;
  createDonor(donor: InsertDonor): Promise<Donor>;
  getDonors(): Promise<Donor[]>;

  // Donation operations
  createDonation(donation: InsertDonation): Promise<Donation>;
  getDonationsByCampaign(campaignId: number): Promise<Donation[]>;
  getRecentDonations(limit?: number): Promise<Donation[]>;

  // Event operations
  getEvent(id: number): Promise<Event | undefined>;
  createEvent(event: InsertEvent): Promise<Event>;
  getEventsByAssociation(associationId: number): Promise<Event[]>;

  // Event participant operations
  addEventParticipant(participant: InsertEventParticipant): Promise<EventParticipant>;
  getEventParticipants(eventId: number): Promise<EventParticipant[]>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  // Association operations
  async getAssociation(id: number): Promise<Association | undefined> {
    const [association] = await db.select().from(associations).where(eq(associations.id, id));
    return association || undefined;
  }

  async createAssociation(insertAssociation: InsertAssociation): Promise<Association> {
    const [association] = await db
      .insert(associations)
      .values(insertAssociation)
      .returning();
    return association;
  }

  async getAssociations(): Promise<Association[]> {
    return db.select().from(associations).orderBy(desc(associations.createdAt));
  }

  // Campaign operations
  async getCampaign(id: number): Promise<Campaign | undefined> {
    const [campaign] = await db.select().from(campaigns).where(eq(campaigns.id, id));
    return campaign || undefined;
  }

  async createCampaign(insertCampaign: InsertCampaign): Promise<Campaign> {
    const [campaign] = await db
      .insert(campaigns)
      .values(insertCampaign)
      .returning();
    return campaign;
  }

  async getCampaignsByAssociation(associationId: number): Promise<Campaign[]> {
    return db.select().from(campaigns)
      .where(eq(campaigns.associationId, associationId))
      .orderBy(desc(campaigns.createdAt));
  }

  async updateCampaign(id: number, updates: Partial<Campaign>): Promise<Campaign> {
    const [campaign] = await db
      .update(campaigns)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(campaigns.id, id))
      .returning();
    return campaign;
  }

  // Donor operations
  async getDonor(id: number): Promise<Donor | undefined> {
    const [donor] = await db.select().from(donors).where(eq(donors.id, id));
    return donor || undefined;
  }

  async getDonorByEmail(email: string): Promise<Donor | undefined> {
    const [donor] = await db.select().from(donors).where(eq(donors.email, email));
    return donor || undefined;
  }

  async createDonor(insertDonor: InsertDonor): Promise<Donor> {
    const [donor] = await db
      .insert(donors)
      .values(insertDonor)
      .returning();
    return donor;
  }

  async getDonors(): Promise<Donor[]> {
    return db.select().from(donors).orderBy(desc(donors.totalDonated));
  }

  // Donation operations
  async createDonation(insertDonation: InsertDonation): Promise<Donation> {
    const [donation] = await db
      .insert(donations)
      .values(insertDonation)
      .returning();
    return donation;
  }

  async getDonationsByCampaign(campaignId: number): Promise<Donation[]> {
    return db.select().from(donations)
      .where(eq(donations.campaignId, campaignId))
      .orderBy(desc(donations.createdAt));
  }

  async getRecentDonations(limit: number = 10): Promise<Donation[]> {
    return db.select().from(donations)
      .orderBy(desc(donations.createdAt))
      .limit(limit);
  }

  // Event operations
  async getEvent(id: number): Promise<Event | undefined> {
    const [event] = await db.select().from(events).where(eq(events.id, id));
    return event || undefined;
  }

  async createEvent(insertEvent: InsertEvent): Promise<Event> {
    const [event] = await db
      .insert(events)
      .values(insertEvent)
      .returning();
    return event;
  }

  async getEventsByAssociation(associationId: number): Promise<Event[]> {
    return db.select().from(events)
      .where(eq(events.associationId, associationId))
      .orderBy(desc(events.date));
  }

  // Event participant operations
  async addEventParticipant(insertParticipant: InsertEventParticipant): Promise<EventParticipant> {
    const [participant] = await db
      .insert(eventParticipants)
      .values(insertParticipant)
      .returning();
    return participant;
  }

  async getEventParticipants(eventId: number): Promise<EventParticipant[]> {
    return db.select().from(eventParticipants)
      .where(eq(eventParticipants.eventId, eventId))
      .orderBy(desc(eventParticipants.registrationDate));
  }
}

export const storage = new DatabaseStorage();
