const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function createDataContext(data) {
  try {
    const dataContext = await prisma.dataContext.create({
      data: data,
    });
    return dataContext;
  } catch (error) {
    console.error("Error creating data context:", error);
    return { success: false, error: error.message };
  }
}

async function createSection(data) {
  try {
    const section = await prisma.section.create({
      data: data,
    });
    return section;
  } catch (error) {
    console.error("Error creating section:", error);
    return { success: false, error: error.message };
  }
}

async function addContentToContext(data) {
  try {
    const content = await prisma.content.create({
      data: data,
      include: {
        title: true,
        section: true,
      },
    });

    // Flatten the response
    return {
      id: content.id,
      titleId: content.titleId,
      link: content.link,
      imageUrl: content.imageUrl,
      schoolYear: content.schoolYear,
      createdAt: content.createdAt,
      sectionId: content.sectionId,
      title: content.title?.title || null,
      section: content.section?.sectionTitle || null,
    };
  } catch (error) {
    console.error("Error adding content to context:", error);
    return { success: false, error: error.message };
  }
}

async function getDataContextById(contextId) {
  try {
    const context = await prisma.dataContext.findUnique({
      where: { id: parseInt(contextId) },
    });
    return context;
  } catch (error) {
    console.error("Error fetching data context by ID:", error);
    return { success: false, error: error.message };
  }
}

async function getSectionById(sectionId) {
  try {
    const context = await prisma.section.findUnique({
      where: { id: parseInt(sectionId) },
    });
    return context;
  } catch (error) {
    console.error("Error fetching data section by ID:", error);
    return { success: false, error: error.message };
  }
}

async function getAllSections() {
  try {
    const data = await prisma.section.findMany();
    return data;
  } catch (error) {
    console.error("Error fetching section", error);
    return { success: false, error: error.message };
  }
}

async function getAllContexts() {
  try {
    const data = await prisma.dataContext.findMany({
      include: {
        section: true,
      },
    });
    // Transform the response to include section title
    return data.map((context) => ({
      id: context.id,
      title: context.title,
      sectionId: context.sectionId,
      sectionTitle: context.section?.sectionTitle || null,
      schoolYear: context.schoolYear,
      createdAt: context.createdAt,
    }));
  } catch (error) {
    console.error("Error fetching contexts", error);
    return { success: false, error: error.message };
  }
}

async function getAllContents() {
  try {
    const data = await prisma.content.findMany({
      include: {
        section: true,
        title: true,
      },
    });
    // Transform the response to include section and title names
    return data.map((content) => ({
      id: content.id,
      titleId: content.titleId,
      title: content.title?.title || null,
      link: content.link,
      imageUrl: content.imageUrl,
      schoolYear: content.schoolYear,
      createdAt: content.createdAt,
      sectionId: content.sectionId,
      sectionTitle: content.section?.sectionTitle || null,
    }));
  } catch (error) {
    console.error("Error fetching content", error);
    return { success: false, error: error.message };
  }
}

module.exports = {
  getAllSections,
  getAllContexts,
  getAllContents,
  createDataContext,
  createSection,
  addContentToContext,
  getDataContextById,
  getSectionById,
};
