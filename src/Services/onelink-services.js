// const xlsx = require("xlsx");
const path = require("path");
const fs = require("fs");
const onelinkData = require("../Data/onelink-data");

async function addDataContext(data) {
  try {
    const dataContext = await onelinkData.createDataContext(data);
    return dataContext;
  } catch (error) {
    console.error("Error creating context:", error);
    return { success: false, error: error.message };
  }
}

async function addSection(data) {
  try {
    const dataSection = await onelinkData.createSection(data);
    return dataSection;
  } catch (error) {
    console.error("Error creating section:", error);
    return { success: false, error: error.message };
  }
}

async function addContent(data) {
  try {
    if (!data.titleId) {
      return { success: false, error: "Title ID is required" };
    }

    if (!data.link) {
      return { success: false, error: "Link is required" };
    }

    // Convert sectionId to integer if it exists
    if (data.sectionId) {
      data.sectionId = parseInt(data.sectionId);
      if (isNaN(data.sectionId)) {
        return { success: false, error: "Invalid section ID" };
      }

      const section = await onelinkData.getSectionById(data.sectionId);
      if (!section) {
        return { success: false, error: "Section not found" };
      }
    }

    const content = await onelinkData.addContentToContext(data);
    return content;
  } catch (error) {
    console.error("Error creating content:", error);
    return { success: false, error: error.message };
  }
}

async function getAllSection() {
  try {
    const section = await onelinkData.getAllSections();
    return section;
  } catch (error) {
    console.error("Error fetching section:", error);
    return { success: false, error: error.message };
  }
}

async function getAllContext() {
  try {
    const section = await onelinkData.getAllContexts();
    return section;
  } catch (error) {
    console.error("Error fetching context:", error);
    return { success: false, error: error.message };
  }
}

async function getAllContent() {
  try {
    const section = await onelinkData.getAllContents();
    return section;
  } catch (error) {
    console.error("Error fetching content:", error);
    return { success: false, error: error.message };
  }
}

async function addContributors(data) {
  try {
    const contributorData = await onelinkData.addContributors(data);
    return contributorData;
  } catch (error) {
    console.error("Error adding contributor:", error);
    return { success: false, error: error.message };
  }
}

async function getAllContributors() {
  try {
    const contributors = await onelinkData.getAllContributors();
    return contributors;
  } catch (error) {
    console.error("Error in getAllContributors service:", error);
    throw error;
  }
}

module.exports = {
  getAllContent,
  getAllContext,
  getAllSection,
  getAllContributors,
  addDataContext,
  addSection,
  addContent,
  addContributors,
  getAllContributors,
};
