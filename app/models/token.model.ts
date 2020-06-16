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

const schema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "user",
            required: true
        },
        token: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            required: true,
            default: Date.now,
            expires: 43200
        },
    },
    {timestamps: true},
);

schema.method("toJSON", function () {
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
});

export default mongoose.model("tokens", schema);