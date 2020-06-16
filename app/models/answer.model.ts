import mongoose, {Schema} from 'mongoose';

const answerSchema = new Schema(
    {
        question_id: {
            type: Schema.Types.ObjectId,
            required: true
        },
        option_id: {
            type: Schema.Types.ObjectId,
            required: true
        }
    }
);

const schema: Schema = new Schema(
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

export default mongoose.model('answer', schema);
