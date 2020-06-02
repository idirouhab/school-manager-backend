module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user",
                required: true
            },
            date: {
                type: Date,
                required: true
            },
            examId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "exam",
                required: true
            },
        },
        {timestamps: true}
    );

    schema.method("toJSON", function () {
        const {__v, _id, ...object} = this.toObject();
        object.id = _id;
        return object;
    });

    return mongoose.model("events", schema);
};
