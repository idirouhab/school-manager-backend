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
    options: [optionSchema],
});

module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            text: {
                type: String,
                required: true
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
            }
        },
        {timestamps: true}
    );

    schema.method("toJSON", function () {
        const {__v, _id, ...object} = this.toObject();
        object.id = _id;
        return object;
    });

    return mongoose.model("exam", schema);
};
