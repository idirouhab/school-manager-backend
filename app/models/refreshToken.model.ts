import mongoose, {Schema} from 'mongoose';

const schema = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
            unique: true,
            index: true
        },
        refreshToken: {
            type: String,
            required: true,
            default: null
        },
    },
    {timestamps: true},
);
schema.method("toJSON", function () {
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
});

export default mongoose.model("refreshTokens", schema);
