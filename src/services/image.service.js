const imageService = () => {
  return require("azure-storage").createBlobService();
};

module.exports = { imageService };
