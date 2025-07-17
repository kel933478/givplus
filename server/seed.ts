import { db } from "./db";
import { associations, campaigns, donors, donations } from "@shared/schema";

async function seedDatabase() {
  try {
    console.log("🌱 Starting database seed...");

    // Create a default association
    const [association] = await db.insert(associations).values({
      name: "GIVE PLUS++ Foundation",
      email: "contact@giveplus.fr",
      description: "Plateforme néo-banque dédiée aux associations",
      status: "active",
      balance: "47238.50",
      totalDonations: "156789.00"
    }).returning();

    console.log("✅ Association created:", association.name);

    // Create campaigns with the exact data from the dashboard
    const campaignData = [
      {
        associationId: association.id,
        title: "Éducation pour tous",
        description: "Campagne pour améliorer l'accès à l'éducation",
        target: "25000.00",
        raised: "15420.00",
        status: "active" as const,
        contactCount: 450,
        deadline: new Date("2024-12-31")
      },
      {
        associationId: association.id,
        title: "Soutien alimentaire",
        description: "Aide alimentaire pour les familles en difficulté",
        target: "15000.00",
        raised: "8750.00",
        status: "active" as const,
        contactCount: 280,
        deadline: new Date("2024-11-30")
      },
      {
        associationId: association.id,
        title: "Accès à l'eau potable",
        description: "Projets d'accès à l'eau dans les zones rurales",
        target: "50000.00",
        raised: "32100.00",
        status: "active" as const,
        contactCount: 720,
        deadline: new Date("2025-03-31")
      }
    ];

    const createdCampaigns = await db.insert(campaigns).values(campaignData).returning();
    console.log("✅ Campaigns created:", createdCampaigns.length);

    // Create sample donors
    const donorData = [
      {
        firstName: "Marie",
        lastName: "Dubois",
        email: "marie.dubois@email.com",
        phone: "0123456789",
        totalDonated: "2500.00",
        frequency: "monthly" as const,
        tag: "VIP" as const,
        lastDonation: new Date("2024-01-15")
      },
      {
        firstName: "Pierre",
        lastName: "Martin",
        email: "pierre.martin@email.com",
        phone: "0123456790",
        totalDonated: "1800.00",
        frequency: "quarterly" as const,
        tag: "régulier" as const,
        lastDonation: new Date("2024-01-14")
      },
      {
        firstName: "Julie",
        lastName: "Bernard",
        email: "julie.bernard@email.com",
        totalDonated: "1200.00",
        frequency: "unique" as const,
        tag: "nouveau" as const,
        lastDonation: new Date("2024-01-13")
      },
      {
        firstName: "Thomas",
        lastName: "Leroy",
        email: "thomas.leroy@email.com",
        totalDonated: "950.00",
        frequency: "monthly" as const,
        tag: "régulier" as const,
        lastDonation: new Date("2024-01-12")
      },
      {
        firstName: "Sophie",
        lastName: "Moreau",
        email: "sophie.moreau@email.com",
        totalDonated: "750.00",
        frequency: "unique" as const,
        tag: "nouveau" as const,
        lastDonation: new Date("2024-01-11")
      }
    ];

    const createdDonors = await db.insert(donors).values(donorData).returning();
    console.log("✅ Donors created:", createdDonors.length);

    // Create sample donations
    const donationData = [
      {
        campaignId: createdCampaigns[0].id,
        donorId: createdDonors[0].id,
        amount: "250.00",
        description: "Don mensuel - Éducation"
      },
      {
        campaignId: createdCampaigns[1].id,
        donorId: createdDonors[1].id,
        amount: "100.00",
        description: "Soutien alimentaire"
      },
      {
        campaignId: createdCampaigns[0].id,
        donorId: createdDonors[2].id,
        amount: "500.00",
        description: "Don ponctuel - Éducation"
      },
      {
        campaignId: createdCampaigns[2].id,
        donorId: createdDonors[3].id,
        amount: "150.00",
        description: "Accès à l'eau potable"
      },
      {
        campaignId: createdCampaigns[1].id,
        donorId: createdDonors[4].id,
        amount: "75.00",
        description: "Aide alimentaire"
      }
    ];

    const createdDonations = await db.insert(donations).values(donationData).returning();
    console.log("✅ Donations created:", createdDonations.length);

    console.log("🎉 Database seeded successfully!");
    
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  }
}

// Run seed if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedDatabase()
    .then(() => {
      console.log("Seed completed");
      process.exit(0);
    })
    .catch((error) => {
      console.error("Seed failed:", error);
      process.exit(1);
    });
}

export { seedDatabase };