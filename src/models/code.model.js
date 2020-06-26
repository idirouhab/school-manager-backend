module.exports = mongoose => {
  const schema = mongoose.Schema(
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
      },
      code: {
        type: Number,
        required: true
      },
      createdAt: {
        type: Date,
        required: true,
        default: Date.now,
        expires: 43200
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

  return mongoose.model("codes", schema);
};
