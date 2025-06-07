const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");

async function findUserByEmail(email) {
  try {
    // Try findUnique first (if email is unique)
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });
      return user;
    } catch (error) {
      // If findUnique fails, fall back to findFirst
      const user = await prisma.user.findFirst({
        where: {
          email: email,
        },
      });
      return user;
    }
  } catch (error) {
    throw new Error("Error finding user: " + error.message);
  }
}

async function createUser(userData) {
  try {
    const role = userData.role || "USER";
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);

    const user = await prisma.user.create({
      data: {
        email: userData.email,
        password: hashedPassword,
        role: role,
        isActive: true,
        isChanged: false,
        lastLogin: new Date(),
      },
    });
    return user;
  } catch (error) {
    throw new Error("Error creating user: " + error.message);
  }
}

async function getUsers() {
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (error) {
    throw new Error("Error getting users: " + error.message);
  }
}

async function deleteUser(id) {
  try {
    const user = await prisma.user.delete({
      where: {
        id: parseInt(id),
      },
    });
    return user;
  } catch (error) {
    throw new Error("Error deleting user: " + error.message);
  }
}

async function updateUser(id, userData) {
  try {
    const user = await prisma.user.update({
      where: {
        id: parseInt(id),
      },
      data: {
        email: userData.email,
        role: userData.role,
        isActive: userData.isActive,
        isChanged: userData.isChanged,
      },
    });
    return user;
  } catch (error) {
    throw new Error("Error updating user: " + error.message);
  }
}

async function updateLastLogin(id) {
  try {
    const user = await prisma.user.update({
      where: {
        id: parseInt(id),
      },
      data: {
        lastLogin: new Date(),
      },
    });
    return user;
  } catch (error) {
    throw new Error("Error updating last login: " + error.message);
  }
}

async function changePassword(id, newPassword) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    const user = await prisma.user.update({
      where: {
        id: parseInt(id),
      },
      data: {
        password: hashedPassword,
        isChanged: true,
      },
    });
    return user;
  } catch (error) {
    throw new Error("Error changing password: " + error.message);
  }
}

module.exports = {
  findUserByEmail,
  createUser,
  getUsers,
  deleteUser,
  updateUser,
  updateLastLogin,
  changePassword,
};
