import mongoose, {Schema} from 'mongoose';

const tagSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        }
    }
);

const schema = new Schema(
    {
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

    },
    {timestamps: true}
);

schema.method("toJSON", function () {
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
});

export default mongoose.model('answer', schema);

