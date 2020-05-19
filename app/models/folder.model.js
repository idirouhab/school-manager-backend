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
        {timestamps: true}
    );

    schema.method("toJSON", function () {
        const {__v, _id, ...object} = this.toObject();
        object.id = _id;
        return object;
    });

    const Folder = mongoose.model("folder", schema);
    return Folder;
};