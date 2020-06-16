var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
const mongoose = require('mongoose');
const tagSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});
module.exports = mongoose => {
    const schema = mongoose.Schema({
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
    }, { timestamps: true });
    schema.method("toJSON", function () {
        const _a = this.toObject(), { __v, _id } = _a, object = __rest(_a, ["__v", "_id"]);
        object.id = _id;
        return object;
    });
    return mongoose.model("folder", schema);
};
