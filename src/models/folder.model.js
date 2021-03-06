const mongoose = require('mongoose');

const tagSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        }
    }
);

module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            name: {
                type: String,
                required: true
            },
            userId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "user",
              required: true
            },
          tags: {
            type: [tagSchema],
            required: false
          },

        },
      { timestamps: true },
      { versionKey: false }
    );

    schema.method("toJSON", function () {
        const {_id, ...object} = this.toObject();
        object.id = _id;
        return object;
    });

    return mongoose.model("folder", schema);
};