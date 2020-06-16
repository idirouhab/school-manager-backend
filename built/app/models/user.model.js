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
module.exports = mongoose => {
    const schema = mongoose.Schema({
        email: {
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
            default: "ADMIN",
            required: true,
            enum: ["USER", "ADMIN", "ROOT"],
        },
        isVerified: {
            type: Boolean,
            default: false,
            required: true,
        },
        isBlocked: {
            type: Boolean,
            default: false,
            required: true,
        },
    }, { timestamps: true });
    schema.method("toJSON", function () {
        const _a = this.toObject(), { __v, _id } = _a, object = __rest(_a, ["__v", "_id"]);
        object.id = _id;
        delete object.password;
        return object;
    });
    return mongoose.model("user", schema);
};
