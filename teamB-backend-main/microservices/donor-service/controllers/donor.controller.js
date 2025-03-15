const DonorService = require("../service/donor.service");
const { redisClient } = require("../redis/redisClient");
/**
 * Creates a new donor.
 * Handles client input and delegates the creation to the service layer.
 *
 * @param {Object} req - Request object containing donor data in the body.
 * @param {Object} res - Response object for sending the result back to the client.
 */
const createDonor = async (req, res) => {
  try {
    const donorData = req.body;
    const newDonor = await DonorService.createDonor(donorData);

    // Redis stuff {
    await redisClient.del(`donors:all`);
    //}

    res
      .status(201)
      .json({ message: "Donor created successfully", donor: newDonor });
  } catch (error) {
    console.error("Error creating donor:", error.message);
    res.status(400).json({ error: error.message });
  }
};

/**
 * Retrieves all donors.
 * Calls the service layer to fetch and return a list of all donors.
 *
 * @param {Object} req - Request object.
 * @param {Object} res - Response object for sending the result back to the client.
 */
const getAllDonors = async (req, res) => {
  try {
    // Redis stuff {
    const cacheKey = `donors:all`;

    // Check for cached data
    const cachedData = await redisClient.get(cacheKey);

    if (cachedData) {
      console.log("Cache hit all!");
      // If cached, return the data as a response
      return res.status(200).json(JSON.parse(cachedData));
    }
    //}

    const donors = await DonorService.getAllDonors();

    // Cache the result
    await redisClient.set(cacheKey, JSON.stringify(donors), { EX: 3600 }); // Cache for 1 hour

    res.status(200).json(donors);
  } catch (error) {
    console.error("Error fetching donors:", error.message);
    res.status(500).json({ error: error.message });
  }
};

/**
 * Retrieves a specific donor by ID.
 * Calls the service layer to fetch and return donor details by ID.
 *
 * @param {Object} req - Request object containing donor ID in the URL parameters.
 * @param {Object} res - Response object for sending the result back to the client.
 */
const getDonorById = async (req, res) => {
  try {
    let userId = req.params.id;
    // if (req.user.userRole != "Admin") {
    //   // if user not Admin check accessToken userId
    //   userId = req.user.userId;
    // }
    // Redis stuff {
    const cacheKey = `donor:${userId}`;

    // Check for cached data
    const cachedData = await redisClient.get(cacheKey);

    if (cachedData) {
      console.log("Cache hit!");
      // If cached, return the data as a response
      return res.status(200).json(JSON.parse(cachedData));
    }
    //}

    const donor = await DonorService.getDonorById(userId);

    // Redis stuff {
    // Cache the result
    await redisClient.set(`donor:${userId}`, JSON.stringify(donor), {
      EX: 3600,
    });
    //}

    res.status(200).json(donor);
  } catch (error) {
    console.error("Error fetching donor by ID:", error.message);
    res
      .status(error.message === "Donor not found" ? 404 : 500)
      .json({ error: error.message });
  }
};

/**
 * Get stripeId of donor by ID
 * Calls DonorService to fetch stripeId of donor by ID
 *
 * @param {Object} req - Request object containing donor ID in the URL parameters.
 * @param {Object} res - Response object for sending the result back to the client.
 */
const getDonorStripeId = async (req, res) => {
  try {
    const donorId = req.params.id;
    const cacheKey = `donor:${donorId}:stripeId`;

    // Check cache first
    const cachedStripeId = await redisClient.get(cacheKey);
    if (cachedStripeId) {
      console.log("Cache hit for Stripe ID");
      return res.status(200).json({ stripeId: cachedStripeId });
    }

    const stripeId = await DonorService.getDonorStripeId(donorId);
    await redisClient.set(cacheKey, stripeId, { EX: 3600 });

    res.status(200).json({ stripeId });
  } catch (error) {
    console.error("Error fetching donor Stripe ID:", error.message);
    res
      .status(
        error.message === "Stripe ID not found for this donor" ? 404 : 500
      )
      .json({ error: error.message });
  }
};

/**
 * Updates an existing donor by ID.
 * Delegates the update operation to the service layer and responds with the updated donor.
 *
 * @param {Object} req - Request object containing donor ID in the URL parameters and updated data in the body.
 * @param {Object} res - Response object for sending the result back to the client.
 */
const updateDonor = async (req, res) => {
  const updatedData = req.body;
  try {
    let userId = req.params.id;
    // if (req.user.userRole != "Admin") {
    //   // if user not Admin check accessToken userId
    //   userId = req.user.userId;
    // }


    // Ensure donationStat defaults
    if (updatedData.donationStat) {
      updatedData.donationStat.totalDonation =
        updatedData.donationStat.totalDonation || 0;
      updatedData.donationStat.monthlyDonated =
        updatedData.donationStat.monthlyDonated || 0;
      updatedData.donationStat.projectsDonated =
        updatedData.donationStat.projectsDonated || 0;
    }

    const updatedDonor = await DonorService.updateDonor(userId, updatedData);

    // Redis caching
    await redisClient.set(`donor:${userId}`, JSON.stringify(updatedDonor), {
      EX: 3600, // Cache for 1 hour
    });
    await redisClient.del(`donors:all`); // Invalidate all donors cache

    res.status(200).json({
      message: "Donor updated successfully",
      donor: updatedDonor,
    });
  } catch (error) {
    console.error(updatedData)
    // console.error("Error updating donor:", error.message);
    res
      .status(error.message === "Donor not found" ? 404 : 500)
      .json({ error: error.message });
  }
};
// const updateDonor = async (req, res) => {
//   try {
//     let userId = req.params.id;
//     // if (req.user.userRole != "Admin") {
//     //   // if user not Admin check accessToken userId
//     //   userId = req.user.userId;
//     // }

//     const updatedData = req.body;

//     // Ensure donationStat defaults
//     if (updatedData.donationStat) {
//       updatedData.donationStat.totalDonation =
//         updatedData.donationStat.totalDonation || 0;
//       updatedData.donationStat.monthlyDonated =
//         updatedData.donationStat.monthlyDonated || 0;
//       updatedData.donationStat.projectsDonated =
//         updatedData.donationStat.projectsDonated || 0;
//     }

//     const updatedDonor = await DonorService.updateDonor(userId, updatedData);

//     // Redis caching
//     await redisClient.set(`donor:${userId}`, JSON.stringify(updatedDonor), {
//       EX: 3600, // Cache for 1 hour
//     });
//     await redisClient.del(`donors:all`); // Invalidate all donors cache

//     res.status(200).json({
//       message: "Donor updated successfully",
//       donor: updatedDonor,
//     });
//   } catch (error) {
//     console.error("Error updating donor:", error.message);
//     res
//       .status(error.message === "Donor not found" ? 404 : 500)
//       .json({ error: error.message });
//   }
// };

/**
 * Deletes a donor by ID.
 * Delegates the deletion to the service layer and responds with a success message.
 *
 * @param {Object} req - Request object containing donor ID in the URL parameters.
 * @param {Object} res - Response object for sending the result back to the client.
 */
const deleteDonor = async (req, res) => {
  try {
    const userId = req.params.id;
    await DonorService.deleteDonor(userId);

    // Redis stuff {
    // Remove from the cache
    await redisClient.del(`donor:${userId}`);

    // Remove stale all donors from the cache
    await redisClient.del(`donors:all`);
    //}

    res.status(200).json({ message: "Donor deleted successfully" });
  } catch (error) {
    console.error("Error deleting donor:", error.message);
    res
      .status(error.message === "Donor not found" ? 404 : 500)
      .json({ error: error.message });
  }
};

/**
 * Retrieves the email of a donor by ID.
 * Calls the service layer to fetch and return the email by donor ID.
 *
 * @param {Object} req - Request object containing donor ID in the URL parameters.
 * @param {Object} res - Response object for sending the result back to the client.
 */
const getEmailByDonorId = async (req, res) => {
  try {
    const donorId = req.params.id;
    const cacheKey = `donor:${donorId}:email`;

    // Check cache first
    const cachedEmail = await redisClient.get(cacheKey);
    if (cachedEmail) {
      console.log("Cache hit for donor email");
      return res.status(200).json({ email: cachedEmail });
    }

    const email = await DonorService.getEmailByDonorId(donorId);
    await redisClient.set(cacheKey, email, { EX: 3600 });

    res.status(200).json({ email });
  } catch (error) {
    console.error("Error fetching donor email:", error.message);
    res.status(404).json({ error: error.message });
  }
};

/**
 * Verifies if a donor exists by ID.
 * Calls the service layer to verify if a donor exists by ID.
 *
 * @param {Object} req - Request object containing donor ID in the URL parameters.
 * @param {Object} res - Response object for sending the result back to the client.
 */
const verifyDonorExists = async (req, res) => {
  try {
    const donorId = req.params.id;
    const cacheKey = `donor:${donorId}:exists`;

    // Check cache first
    const cachedExists = await redisClient.get(cacheKey);
    if (cachedExists) {
      console.log("Cache hit for donor existence");
      return res.status(200).json({ exists: cachedExists === "true" });
    }

    const exists = await DonorService.verifyDonorExists(donorId);
    await redisClient.set(cacheKey, exists.toString(), { EX: 3600 });

    res.status(200).json({ exists });
  } catch (error) {
    console.error("Error verifying donor existence:", error.message);
    res.status(500).json({ error: error.message });
  }
};

/**
 * Updates donation statistics for a specific donor by ID.
 * Calls the service layer to update and return donor statistics by ID.
 *
 * @param {Object} req - Request object containing donor ID in the URL parameters and updated donation statistics in the body.
 * @param {Object} res - Response object for sending the result back to the client.
 */
const updateDonationStats = async (req, res) => {
  try {
    const { id: donorId } = req.params;
    const { donationAmount, projectId } = req.body;

    // Validate input
    if (!donationAmount || !projectId) {
      return res
        .status(400)
        .json({ error: "donationAmount and projectId are required" });
    }

    // Update donation statistics
    await DonorService.updateDonationStats(donorId, donationAmount, projectId);

    // Fetch updated donor data to update Redis cache
    const updatedDonor = await DonorService.getDonorById(donorId);

    // Redis caching
    await redisClient.set(`donor:${donorId}`, JSON.stringify(updatedDonor), {
      EX: 3600, // Cache for 1 hour
    });
    await redisClient.del(`donors:all`); // Invalidate all donors cache

    res.status(200).json({
      message: "Donation statistics updated successfully",
      donor: updatedDonor,
    });
  } catch (error) {
    console.error("Error updating donation stats:", error.message);
    res
      .status(error.message === "Donor not found" ? 404 : 500)
      .json({ error: error.message });
  }
};

/**
 * Retrieves global statistics for donors.
 * Calls the service layer to fetch and return global donor statistics.
 *
 * @param {Object} req - Request object.
 * @param {Object} res - Response object for sending the result back to the client.
 */
const getGlobalDonorStats = async (req, res) => {
  try {
    const cacheKey = `donors:globalStats`;

    // Check cache first
    const cachedStats = await redisClient.get(cacheKey);
    if (cachedStats) {
      console.log("Cache hit for global donor stats");
      return res.status(200).json(JSON.parse(cachedStats));
    }

    const stats = await DonorService.getGlobalDonorStats();
    await redisClient.set(cacheKey, JSON.stringify(stats), { EX: 3600 });

    res.status(200).json(stats);
  } catch (error) {
    console.error("Error fetching global donor stats:", error.message);
    res.status(500).json({ error: "Failed to fetch global donor stats" });
  }
};

/**
 * Retrieves filtered statistics for donors.
 * Calls the service layer to fetch and return filtered donor statistics.
 *
 * @param {Object} req - Request object containing query parameters for category, region, and type.
 * @param {Object} res - Response object for sending the result back to the client.
 */
const getFilteredDonorStats = async (req, res) => {
  try {
    const { category, region } = req.query;
    const cacheKey = `donors:filtered:${category || "all"}:${region || "all"}`;

    // Check cache first
    const cachedStats = await redisClient.get(cacheKey);
    if (cachedStats) {
      console.log("Cache hit for filtered donor stats");
      return res.status(200).json(JSON.parse(cachedStats));
    }

    const stats = await DonorService.getFilteredDonorStats({
      category,
      region,
    });
    await redisClient.set(cacheKey, JSON.stringify(stats), { EX: 3600 });

    res.status(200).json(stats);
  } catch (error) {
    console.error("Error fetching filtered donor stats:", error.message);
    res.status(500).json({ error: "Failed to fetch filtered donor stats" });
  }
};

/**
 * Retrieves top donors.
 * Calls the service layer to fetch and return a list of top donors.
 *
 * @param {Object} req - Request object.
 * @param {Object} res - Response object for sending the result back to the client.
 */
const getTopDonors = async (req, res) => {
  try {
    const cacheKey = `donors:top`;

    // Check cache first
    const cachedTopDonors = await redisClient.get(cacheKey);
    if (cachedTopDonors) {
      console.log("Cache hit for top donors");
      return res.status(200).json(JSON.parse(cachedTopDonors));
    }

    const topDonors = await DonorService.getTopDonors();
    await redisClient.set(cacheKey, JSON.stringify(topDonors), { EX: 3600 });

    res.status(200).json(topDonors);
  } catch (error) {
    console.error("Error fetching top donors:", error.message);
    res.status(500).json({ error: "Failed to fetch top donors" });
  }
};

/**
 * Retrieves top donors monthly.
 * Calls the service layer to fetch and return a list of top donors.
 *
 * @param {Object} req - Request object.
 * @param {Object} res - Response object for sending the result back to the client.
 */
const getTopDonorsMonthly = async (req, res) => {
  try {
    const cacheKey = `donors:top:monthly`;

    // Check cache first
    const cachedTopDonorsMonthly = await redisClient.get(cacheKey);
    if (cachedTopDonorsMonthly) {
      console.log("Cache hit for top monthly donors");
      return res.status(200).json(JSON.parse(cachedTopDonorsMonthly));
    }

    const topDonorsMonthly = await DonorService.getTopDonorsMonthly();
    await redisClient.set(cacheKey, JSON.stringify(topDonorsMonthly), {
      EX: 3600,
    });

    res.status(200).json(topDonorsMonthly);
  } catch (error) {
    console.error("Error fetching top monthly donors:", error.message);
    res.status(500).json({ error: "Failed to fetch top monthly donors" });
  }
};

/**
 * Retrieves projects and donations of donor.
 * Calls the service layer to fetch and return projects and donations of donor.
 *
 * @param {Object} req - Request object containing donor ID in the URL parameters.
 * @param {Object} res - Response object for sending the result back to the client.
 */
const getProjectsAndDonationsOfDonor = async (req, res) => {
  try {
    const donorId = req.params.id;
    const cacheKey = `donor:${donorId}:projectsAndDonations`;

    // Check cache first
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      console.log("Cache hit for donor projects and donations");
      return res.status(200).json(JSON.parse(cachedData));
    }

    const data = await DonorService.getProjectsAndDonationsOfDonor(donorId);
    await redisClient.set(cacheKey, JSON.stringify(data), { EX: 3600 });

    res.status(200).json(data);
  } catch (error) {
    console.error(
      "Error fetching donor projects and donations:",
      error.message
    );
    res
      .status(500)
      .json({ error: "Failed to fetch donor projects and donations" });
  }
};

module.exports = {
  createDonor,
  getAllDonors,
  getDonorById,
  getDonorStripeId,
  updateDonor,
  deleteDonor,
  getEmailByDonorId,
  verifyDonorExists,
  updateDonationStats,
  getGlobalDonorStats,
  getFilteredDonorStats,
  getTopDonors,
  getTopDonorsMonthly,
  getProjectsAndDonationsOfDonor,
};
