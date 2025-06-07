const bcrypt = require("bcryptjs");
const userDAO = require("./user-data");
const sendEmail = require("../Middlewares/sendEmail");

async function login(email, password) {
  try {
    // Find user by email
    const user = await userDAO.findUserByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }

    // Check if user is active
    if (!user.isActive) {
      throw new Error("Account is deactivated");
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error("Invalid password");
    }

    // Update last login
    await userDAO.updateLastLogin(user.id);

    // Return user data
    return {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
        isChanged: user.isChanged,
        lastLogin: user.lastLogin,
      },
    };
  } catch (error) {
    throw new Error(error.message);
  }
}

async function register(data) {
  try {
    // Check if user already exists
    const existingUser = await userDAO.findUserByEmail(data.email);
    if (existingUser) {
      throw new Error("Email already registered");
    }

    // Create user
    const user = await userDAO.createUser(data);

    // Return user data
    return {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
        isChanged: user.isChanged,
      },
    };
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getAllUsers() {
  try {
    const users = await userDAO.getUsers();
    return users;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function deleteUser(id) {
  try {
    const deletedUser = await userDAO.deleteUser(id);
    return deletedUser;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function updateUser(id, userData) {
  try {
    const updatedUser = await userDAO.updateUser(id, userData);
    return updatedUser;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function changePassword(userId, newPassword) {
  try {
    const updatedUser = await userDAO.changePassword(userId, newPassword);
    return updatedUser;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function resetPassword(email, newPassword) {
  try {
    const user = await userDAO.findUserByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }
    const updatedUser = await userDAO.changePassword(user.id, newPassword);

    // Send email notification
    const emailSubject = "Your Password Has Been Reset";
    const emailBody = `
      <p>Hello,</p>
      <p>Your password for your account has been successfully reset. Below is your new password</p>
      <p><strong style="font-size: 1.5em;">${newPassword}</strong></p>
      <p>Please log in with your new password.</p>
      <p>If you did not request this change, please contact support immediately.</p>
      <p>Thank you.</p>
    `;
    await sendEmail(user.email, emailSubject, emailBody);

    return updatedUser;
  } catch (error) {
    console.error("[resetPassword] Error:", error);
    throw new Error("Error resetting password: " + error.message);
  }
}

module.exports = {
  getAllUsers,
  register,
  login,
  deleteUser,
  updateUser,
  changePassword,
  resetPassword,
};
