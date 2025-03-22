// A simple function to demonstrate the concept of securing passwords
// This is NOT production-ready encryption - just a demonstration
const getSecurePassword = (password, securityKey) => {
  if (!securityKey) return password; // Fallback if no security key

  try {
    // In a real implementation, you would use proper encryption
    // This is just a simple demonstration of the concept
    // For production, consider:
    // 1. Using a secrets manager like AWS Secrets Manager, HashiCorp Vault, etc.
    // 2. Using environment variables that are securely set in your deployment platform
    // 3. Using proper encryption with IV, salt, etc.

    // Simple XOR demonstration (not secure, just for concept)
    let result = "";
    for (let i = 0; i < password.length; i++) {
      const charCode =
        password.charCodeAt(i) ^ securityKey.charCodeAt(i % securityKey.length);
      result += String.fromCharCode(charCode);
    }

    // In this demo, we're immediately decrypting so the actual password is used
    // This simulates retrieving and decrypting a secured password
    let decrypted = "";
    for (let i = 0; i < result.length; i++) {
      const charCode =
        result.charCodeAt(i) ^ securityKey.charCodeAt(i % securityKey.length);
      decrypted += String.fromCharCode(charCode);
    }

    return decrypted; // Return the original password after demonstrating encryption
  } catch (error) {
    console.error("Error processing secure password", error);
    return password;
  }
};

// Build MongoDB connection string with interpolated variables
const getMongoUri = () => {
  const user = process.env.MONGO_USER;
  const password = getSecurePassword(
    process.env.MONGO_PASSWORD,
    process.env.DB_SECURITY_KEY
  );

  // If MONGO_URI contains placeholders, replace them
  if (process.env.MONGO_URI.includes("${")) {
    return process.env.MONGO_URI.replace("${MONGO_USER}", user).replace(
      "${MONGO_PASSWORD}",
      password
    );
  }

  // Otherwise, assume MONGO_URI is complete
  return process.env.MONGO_URI;
};

module.exports = {
  getMongoUri,
  mongoOptions: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};
