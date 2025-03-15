const CharityService = require("../service/charity.service");
const { redisClient } = require("../redis/redisClient");

/**
 * Creates a new charity.
 * Handles input from the client and delegates creation logic to CharityService.
 *
 * @param {Object} req - Request object containing charity data in the body.
 * @param {Object} res - Response object for sending the result back to the client.
 */
const createCharity = async (req, res) => {
  try {
    const charityData = req.body;
    const newCharity = await CharityService.createCharity(charityData);

    // Redis stuff {
    // delete stale data
    await redisClient.del(`charities:all`);
    //}

    res
      .status(201)
      .json({ message: "Charity created successfully", charity: newCharity });
  } catch (error) {
    console.error("Error creating charity:", error.message);
    res.status(400).json({ error: error.message });
  }
};

/**
 * Retrieves all charities.
 * Calls CharityService to fetch and return a list of all charities.
 *
 * @param {Object} req - Request object.
 * @param {Object} res - Response object for sending the result back to the client.
 */
const getAllCharities = async (req, res) => {
  try {
    // Redis stuff {
    const cacheKey = `charities:all`;

    // Check for cached data
    const cachedData = await redisClient.get(cacheKey);

    if (cachedData) {
      console.log("Cache hit all!");
      // If cached, return the data as a response
      return res.status(200).json(JSON.parse(cachedData));
    }
    //}

    const charities = await CharityService.getAllCharities();

    // Cache the result
    await redisClient.set(cacheKey, JSON.stringify(charities), { EX: 3600 }); // Cache for 1 hour

    res.status(200).json(charities);
  } catch (error) {
    console.error("Error fetching charities:", error.message);
    res.status(500).json({ error: error.message });
  }
};

/**
 * Retrieves a specific charity by ID.
 * Calls CharityService to fetch and return a charity by its ID.
 *
 * @param {Object} req - Request object containing charity ID in the URL parameters.
 * @param {Object} res - Response object for sending the result back to the client.
 */
const getCharityById = async (req, res) => {
  try {
    let userId = req.params.id;
    // if (req.user.userRole != "Admin") {
    //   // if user not Admin check accessToken userId
    //   userId = req.user.userId;
    // }

    // Redis stuff {
    const cacheKey = `charity:${userId}`;

    // Check for cached data
    const cachedData = await redisClient.get(cacheKey);

    if (cachedData) {
      console.log("Cache hit!");
      // If cached, return the data as a response
      return res.status(200).json(JSON.parse(cachedData));
    }
    //}

    const charity = await CharityService.getCharityById(userId);

    // Redis stuff {
    // Cache the result
    await redisClient.set(`charity:${userId}`, JSON.stringify(charity), {
      EX: 3600,
    });
    //}

    res.status(200).json(charity);
  } catch (error) {
    console.error("Error fetching charity:", error.message);
    res
      .status(error.message === "Charity not found" ? 404 : 500)
      .json({ error: error.message });
  }
};

/**
 * Get stripeId of charity by ID.
 * Calls CharityService to fetch stripeId of charity by id.
 *
 * @param {Object} req - Request object containing charity ID in the URL parameters.
 * @param {Object} res - Response object for sending the result back to the client.
 */
const getCharityStripeId = async (req, res) => {
  try {
    const charityId = req.params.id;
    const cacheKey = `charity:${charityId}:stripeId`;

    // Check for cached data
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      console.log("Cache hit for Stripe ID!");
      return res.status(200).json({ stripeId: JSON.parse(cachedData) });
    }

    const stripeId = await CharityService.getCharityStripeId(charityId);
    if (!stripeId) {
      throw new Error("Stripe ID not found for this charity");
    }

    // Cache the Stripe ID
    await redisClient.set(cacheKey, JSON.stringify(stripeId), { EX: 3600 }); // Cache for 1 hour

    res.status(200).json({ stripeId });
  } catch (error) {
    console.error("Error fetching charity stripeId:", error.message);
    res
      .status(
        error.message === "Charity not found" ||
          error.message === "Stripe ID not found for this charity"
          ? 404
          : 500
      )
      .json({ error: error.message });
  }
};


/**
 * Updates an existing charity by ID.
 * Passes updated data to CharityService for processing and responds with the updated charity.
 *
 * @param {Object} req - Request object containing charity ID in the URL parameters and updated data in the body.
 * @param {Object} res - Response object for sending the result back to the client.
 */
const updateCharity = async (req, res) => {
  try {
    let userId = req.params.id;
    // if (req.user.userRole != "Admin") {
    //   // if user not Admin check accessToken userId
    //   userId = req.user.userId;
    // }

    const updatedData = req.body;
    const updatedCharity = await CharityService.updateCharity(
      userId,
      updatedData
    );

    // Redis stuff {
    // Cache the result
    await redisClient.set(`charity:${userId}`, JSON.stringify(updatedCharity), {
      EX: 3600,
    });
    // Remove stale all charities from the cache
    await redisClient.del(`charities:all`);
    //}

    res
      .status(200)
      .json({
        message: "Charity updated successfully",
        charity: updatedCharity,
      });
  } catch (error) {
    console.error("Error updating charity:", error.message);
    res
      .status(error.message === "Charity not found" ? 404 : 500)
      .json({ error: error.message });
  }
};

/**
 * Deletes a charity by ID.
 * Delegates deletion to CharityService and responds with a success message.
 *
 * @param {Object} req - Request object containing charity ID in the URL parameters.
 * @param {Object} res - Response object for sending the result back to the client.
 */
const deleteCharity = async (req, res) => {
  try {
    const userId = req.params.id;
    await CharityService.deleteCharity(userId);

    // Redis stuff {
    // Remove from the cache
    await redisClient.del(`charity:${userId}`);

    // Remove stale all charities from the cache
    await redisClient.del(`charities:all`);
    //}

    res.status(200).json({ message: "Charity deleted successfully" });
  } catch (error) {
    console.error("Error deleting charity:", error.message);
    res
      .status(error.message === "Charity not found" ? 404 : 500)
      .json({ error: error.message });
  }
};

/**
 * Get charity names by an array of IDs.
 *
 * @param {Object} req - Request object containing the charity IDs in the body.
 * @param {Object} res - Response object to send the result back to the client.
 */
const getCharityNamesByIds = async (req, res) => {
  try {
    const { charityIds } = req.body;

    if (!Array.isArray(charityIds) || charityIds.length === 0) {
      return res
        .status(400)
        .json({ error: "Charity IDs must be a non-empty array" });
    }

    const results = [];
    const cacheMisses = [];

    for (const charityId of charityIds) {
      const cacheKey = `charity:${charityId}:name`;
      const cachedName = await redisClient.get(cacheKey);

      if (cachedName) {
        results.push({ id: charityId, name: JSON.parse(cachedName) });
      } else {
        cacheMisses.push(charityId);
      }
    }

    if (cacheMisses.length > 0) {
      const fetchedNames = await CharityService.getCharityNamesByIds(
        cacheMisses
      );
      for (const { id, name } of fetchedNames) {
        const cacheKey = `charity:${id}:name`;
        await redisClient.set(cacheKey, JSON.stringify(name), { EX: 3600 }); // Cache for 1 hour
        results.push({ id, name });
      }
    }

    res.status(200).json(results);
  } catch (error) {
    console.error("Error fetching charity names:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while fetching charity names" });
  }
};


/**
 * Verify if a charity ID exists.
 *
 * @param {Object} req - Request object containing the charity ID in the URL parameters.
 * @param {Object} res - Response object to send the result back to the client.
 */
const verifyCharityExists = async (req, res) => {
  try {
    const charityId = req.params.id;
    const cacheKey = `charity:${charityId}:exists`;

    // Check for cached data
    const cachedExists = await redisClient.get(cacheKey);
    if (cachedExists !== null) {
      console.log("Cache hit for charity existence!");
      return res.status(200).json({ exists: JSON.parse(cachedExists) });
    }

    const exists = await CharityService.verifyCharityExists(charityId);

    // Cache the existence check
    await redisClient.set(cacheKey, JSON.stringify(exists), { EX: 3600 }); // Cache for 1 hour

    res.status(200).json({ exists });
  } catch (error) {
    console.error("Error verifying charity ID:", error.message);
    res.status(400).json({ error: error.message });
  }
};


/**
 * Get charity IDs whose names contain the specified keyword.
 *
 * @param {Object} req - Request object containing the keyword in query parameters.
 * @param {Object} res - Response object to send results back to the client.
 */
const getCharitiesByKeyword = async (req, res) => {
  try {
    const { keyword } = req.query;
    if (!keyword || typeof keyword !== "string") {
      throw new Error("Keyword must be a non-empty string");
    }

    const cacheKey = `charities:keyword:${keyword}`;

    // Check for cached data
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      console.log("Cache hit for keyword search!");
      return res.status(200).json(JSON.parse(cachedData));
    }

    const charityIds = await CharityService.getCharitiesByKeyword(keyword);
    if (!charityIds || charityIds.length === 0) {
      throw new Error("Charity not found");
    }

    // Cache the result
    await redisClient.set(cacheKey, JSON.stringify(charityIds), { EX: 3600 }); // Cache for 1 hour

    res.status(200).json(charityIds);
  } catch (error) {
    console.error("Error fetching charities by keyword:", error.message);
    res
      .status(error.message === "Charity not found" ? 404 : 500)
      .json({ error: error.message });
  }
};

/**
 * Get a charity by its ID.
 *
 * @param {Object} req - Request object containing the charity ID in the URL parameters.
 * @param {Object} res - Response object to send the result back to the client.
 */
const getCharityByCharityId = async (req, res) => {
  try {
    const { charityId } = req.params;
    const cacheKey = `charity:${charityId}`;

    // Check for cached data
    const cachedCharity = await redisClient.get(cacheKey);
    if (cachedCharity) {
      console.log("Cache hit for charity by ID!");
      return res.status(200).json(JSON.parse(cachedCharity));
    }

    const charity = await CharityService.getCharityByCharityId(charityId);

    // Cache the result
    await redisClient.set(cacheKey, JSON.stringify(charity), { EX: 3600 }); // Cache for 1 hour

    res.status(200).json(charity);
  } catch (error) {
    console.error("Error fetching charity by charityId:", error.message);
    res
      .status(error.message === "Charity not found" ? 404 : 400)
      .json({ error: error.message });
  }
};


/**
 * Get a charity by its ID.
 *
 * @param {Object} req - Request object containing the charity ID in the URL parameters.
 * @param {Object} res - Response object to send the result back to the client.
 */
const getUserIdByCharityId = async (req, res) => {
  try {
    const { charityId } = req.params;
    const cacheKey = `charity:${charityId}:userId`;

    // Check for cached data
    const cachedUserId = await redisClient.get(cacheKey);
    if (cachedUserId) {
      console.log("Cache hit for userId by charityId!");
      return res.status(200).json({ userId: JSON.parse(cachedUserId) });
    }

    const userId = await CharityService.getUserIdByCharityId(charityId);

    // Cache the result
    await redisClient.set(cacheKey, JSON.stringify(userId), { EX: 3600 }); // Cache for 1 hour

    res.status(200).json({ userId });
  } catch (error) {
    console.error("Error fetching userId by charityId:", error.message);
    res
      .status(error.message.includes("not found") ? 404 : 400)
      .json({ error: error.message });
  }
};


module.exports = {
  createCharity,
  getAllCharities,
  getCharityById,
  getCharityStripeId,
  updateCharity,
  deleteCharity,
  getCharityNamesByIds,
  verifyCharityExists,
  getCharitiesByKeyword,
  getCharityByCharityId,
  getUserIdByCharityId,
};
