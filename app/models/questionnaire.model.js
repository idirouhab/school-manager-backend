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

const Question = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    options: [optionSchema],
});

module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            questions: {
                type: [Question],
                required: true
            },
            title: {
                type: String,
                required: true
            }
        },
        {timestamps: true}
    );

    schema.method("toJSON", function () {
        const {__v, _id, ...object} = this.toObject();
        object.id = _id;
        return object;
    });

    const Questionnaire = mongoose.model("questionnaire", schema);
    return Questionnaire;
};