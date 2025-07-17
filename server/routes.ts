import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertCampaignSchema, insertDonorSchema, insertDonationSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API Routes with /api prefix
  
  // Campaigns endpoints
  app.get("/api/campaigns", async (req, res) => {
    try {
      const associationId = 1; // For demo purposes, using association ID 1
      const campaigns = await storage.getCampaignsByAssociation(associationId);
      res.json(campaigns);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch campaigns" });
    }
  });

  app.post("/api/campaigns", async (req, res) => {
    try {
      const campaignData = insertCampaignSchema.parse(req.body);
      const campaign = await storage.createCampaign(campaignData);
      res.status(201).json(campaign);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid campaign data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create campaign" });
      }
    }
  });

  app.get("/api/campaigns/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const campaign = await storage.getCampaign(id);
      if (!campaign) {
        return res.status(404).json({ error: "Campaign not found" });
      }
      res.json(campaign);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch campaign" });
    }
  });

  // Donors endpoints
  app.get("/api/donors", async (req, res) => {
    try {
      const donors = await storage.getDonors();
      res.json(donors);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch donors" });
    }
  });

  app.post("/api/donors", async (req, res) => {
    try {
      const donorData = insertDonorSchema.parse(req.body);
      const donor = await storage.createDonor(donorData);
      res.status(201).json(donor);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid donor data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create donor" });
      }
    }
  });

  // Donations endpoints
  app.get("/api/donations/recent", async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const donations = await storage.getRecentDonations(limit);
      res.json(donations);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch recent donations" });
    }
  });

  app.get("/api/donations/campaign/:campaignId", async (req, res) => {
    try {
      const campaignId = parseInt(req.params.campaignId);
      const donations = await storage.getDonationsByCampaign(campaignId);
      res.json(donations);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch campaign donations" });
    }
  });

  app.post("/api/donations", async (req, res) => {
    try {
      const donationData = insertDonationSchema.parse(req.body);
      const donation = await storage.createDonation(donationData);
      
      // Update campaign raised amount (simplified logic)
      const campaign = await storage.getCampaign(donationData.campaignId);
      if (campaign) {
        const newRaised = parseFloat(campaign.raised || "0") + parseFloat(donationData.amount);
        await storage.updateCampaign(donationData.campaignId, {
          raised: newRaised.toString()
        });
      }
      
      res.status(201).json(donation);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid donation data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create donation" });
      }
    }
  });

  // Statistics endpoint
  app.get("/api/stats", async (req, res) => {
    try {
      const campaigns = await storage.getCampaignsByAssociation(1);
      const donors = await storage.getDonors();
      const recentDonations = await storage.getRecentDonations(5);
      
      const totalRaised = campaigns.reduce((sum, campaign) => 
        sum + parseFloat(campaign.raised || "0"), 0);
      
      const stats = {
        totalCampaigns: campaigns.length,
        activeCampaigns: campaigns.filter(c => c.status === 'active').length,
        totalDonors: donors.length,
        totalRaised: totalRaised,
        recentDonations: recentDonations
      };
      
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch statistics" });
    }
  });

  // Mass communication endpoints
  app.post("/api/communications/sms", async (req, res) => {
    try {
      const { message, campaignIds } = req.body;
      
      // Simulate SMS sending logic
      const campaigns = await Promise.all(
        campaignIds.map((id: number) => storage.getCampaign(id))
      );
      
      const totalContacts = campaigns.reduce((sum, campaign) => 
        sum + (campaign?.contactCount || 0), 0);
      
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      res.json({
        success: true,
        message: `SMS envoyé à ${totalContacts} contacts`,
        cost: totalContacts * 0.05
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to send SMS" });
    }
  });

  app.post("/api/communications/email", async (req, res) => {
    try {
      const { subject, content, campaignIds } = req.body;
      
      // Simulate email sending logic
      const campaigns = await Promise.all(
        campaignIds.map((id: number) => storage.getCampaign(id))
      );
      
      const totalContacts = campaigns.reduce((sum, campaign) => 
        sum + (campaign?.contactCount || 0), 0);
      
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      res.json({
        success: true,
        message: `Email envoyé à ${totalContacts} contacts`,
        recipients: totalContacts
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to send email" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
