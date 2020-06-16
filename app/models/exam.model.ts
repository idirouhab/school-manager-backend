import mongoose, {Schema} from 'mongoose';

const optionSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    correct: {
        type: Boolean,
        required: true,
    }
});

const QuestionSchema = new Schema({
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

const schema = new Schema(
    {
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
                type: Schema.Types.ObjectId,
                ref: "answer"
            }
        ],
        userId: {
            type: Schema.Types.ObjectId,
            ref: "user",
            required: true
        },
        folderId: {
            type: Schema.Types.ObjectId,
            ref: "folder",
            default: null
        },
    },
    {timestamps: true}
);

schema.method("toJSON", function () {
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
});

export default mongoose.model('exam', schema);
