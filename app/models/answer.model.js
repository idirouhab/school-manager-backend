const mongoose = require('mongoose');

const answerSchema = mongoose.Schema(
    {
        question_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        option_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        }
    }
);

module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            playerName: {
                type: String,
                required: true
            },
            time: {
                type: Number,
                required: true
            },
            score: {
                type: Number,
                required: true
            },
            answers: {
                type: [answerSchema]
            }
        },
        {timestamps: true}
    );

    schema.method("toJSON", function () {
        const {__v, _id, ...object} = this.toObject();
        object.id = _id;
        return object;
    });

    const Answer = mongoose.model("answer", schema);
    return Answer;
};