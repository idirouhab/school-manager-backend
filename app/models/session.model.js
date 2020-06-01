const mongoose = require('mongoose');

module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
            },
            currentPath: {
                type: String,
                required: true,
            }
        },
        {timestamps: true}
    );

    schema.method("toJSON", function () {
        const {__v, _id, ...object} = this.toObject();
        object.id = _id;
        delete object.password;

        return object;
    });

    return mongoose.model("sessions", schema);
};
