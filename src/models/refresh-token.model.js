module.exports = mongoose => {
  const schema = mongoose.Schema(
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
        unique: true,
        index: true
      },
      refreshToken: {
        type: String,
        required: true,
        default: null
      },
    },
    { timestamps: true },
    { versionKey: false }
  );
  schema.method("toJSON", function () {
    const { _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });
  schema.index({ userId: 1 });
  return mongoose.model("refreshTokens", schema);
};
