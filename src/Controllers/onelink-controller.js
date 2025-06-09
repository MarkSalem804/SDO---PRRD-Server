const express = require("express");
const onelinkRouter = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const onelinkService = require("../Services/onelink-services");

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

module.exports = onelinkRouter;
