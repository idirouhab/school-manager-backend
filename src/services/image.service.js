const imageService = () => {
  return require("azure-storage").createBlobService();
};

module.blobService = imageService;
