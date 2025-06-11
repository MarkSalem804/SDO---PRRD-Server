const express = require("express");
const onelinkRouter = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const onelinkService = require("../Services/onelink-services");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Configure multer for image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Create images directory if it doesn't exist
    const dir = path.join(__dirname, "../../images");
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    // Create unique filename with timestamp
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

// File filter to only allow images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Not an image! Please upload an image."), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

onelinkRouter.post("/addContext", async (req, res) => {
  try {
    const data = req.body;
    const result = await onelinkService.addDataContext(data);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error in addContext route:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred.",
    });
  }
});

onelinkRouter.post("/addSection", async (req, res) => {
  try {
    const data = req.body;
    const result = await onelinkService.addSection(data);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error in addSection route:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred.",
    });
  }
});

onelinkRouter.post("/addContent", async (req, res) => {
  try {
    const data = req.body;
    const result = await onelinkService.addContent(data);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error in addContent route:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred.",
    });
  }
});

onelinkRouter.post(
  "/addContributor",
  upload.single("image"),
  async (req, res) => {
    try {
      const data = {
        ...req.body,
        // If there's an uploaded file, add its path to imageUrl
        imageUrl: req.file ? `/images/${req.file.filename}` : req.body.imageUrl,
      };

      // Parse socials if it's a string
      if (typeof data.socials === "string") {
        data.socials = JSON.parse(data.socials);
      }

      const result = await onelinkService.addContributors(data);
      res.status(200).json(result);
    } catch (error) {
      console.error("Error in addContributor route:", error);
      res.status(500).json({
        success: false,
        message: error.message || "An error occurred.",
      });
    }
  }
);

onelinkRouter.get("/contents", async (req, res) => {
  try {
    const result = await onelinkService.getAllContent();
    res.status(200).json(result);
  } catch (error) {
    console.error("Error in contents route:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred.",
    });
  }
});

onelinkRouter.get("/contexts", async (req, res) => {
  try {
    const result = await onelinkService.getAllContext();
    res.status(200).json(result);
  } catch (error) {
    console.error("Error in context route:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred.",
    });
  }
});

onelinkRouter.get("/sections", async (req, res) => {
  try {
    const result = await onelinkService.getAllSection();
    res.status(200).json(result);
  } catch (error) {
    console.error("Error in section route:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred.",
    });
  }
});

//view contributor image
onelinkRouter.get("/contributor/:id", async (req, res) => {
  try {
    const contributorId = parseInt(req.params.id);

    if (isNaN(contributorId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid contributor ID",
      });
    }

    const contributor = await prisma.contributors.findUnique({
      where: {
        id: contributorId,
      },
    });

    if (!contributor) {
      return res.status(404).json({
        success: false,
        message: "Contributor not found",
      });
    }

    // If there's no image, return 404
    if (!contributor.imageUrl) {
      return res.status(404).json({
        success: false,
        message: "No image found for this contributor",
      });
    }

    // Get the full path to the image
    const imagePath = path.join(__dirname, "../../", contributor.imageUrl);

    // Check if the image file exists
    if (!fs.existsSync(imagePath)) {
      return res.status(404).json({
        success: false,
        message: "Image file not found",
      });
    }

    // Send the image file
    res.sendFile(imagePath);
  } catch (error) {
    console.error("Error in getContributorImage route:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching the image",
    });
  }
});

// Add this after the other GET endpoints
onelinkRouter.get("/contributors", async (req, res) => {
  try {
    const result = await onelinkService.getAllContributors();
    res.status(200).json(result);
  } catch (error) {
    console.error("Error in contributors route:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching contributors.",
    });
  }
});

module.exports = onelinkRouter;
