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
const optionSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    correct: {
        type: Boolean,
        required: true,
    }
});
const QuestionSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['free_text', 'multiple_choice'],
        required: true
    },
    options: [optionSchema],
    image: {
        type: String,
        default: null
    }
});
module.exports = mongoose => {
    const schema = mongoose.Schema({
        text: {
            type: String,
            required: true
        },
        subtitle: {
            type: String,
            default: ""
        },
        questions: {
            type: [QuestionSchema],
            required: true
        },
        answers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "answer"
            }
        ],
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true
        },
        folderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "folder",
            default: null
        },
    }, { timestamps: true });
    schema.method("toJSON", function () {
        const _a = this.toObject(), { __v, _id } = _a, object = __rest(_a, ["__v", "_id"]);
        object.id = _id;
        return object;
    });
    return mongoose.model("exam", schema);
};
