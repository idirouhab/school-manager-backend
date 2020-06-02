module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            username: {
                type: String,
                required: true,
                unique: true
            },
            name: {
                type: String,
                required: true,
            },
            lastName: {
                type: String,
                required: true,
            },
            password: {
                type: String,
                required: true
            },
            role: {
                type: String,
                default: 'ADMIN',
                required: true,
                enum: ['USER', 'ADMIN', 'ROOT'],
            },
            isVerified: {
                type: Boolean,
                default: false,
                required: true,
            },
        },
        {timestamps: true}
    );

    schema.method("toJSON", function () {
        const {__v, _id, ...object} = this.toObject();
        object.id = _id;
        delete object.password;

        return object;
    });

    return mongoose.model("user", schema);
};
