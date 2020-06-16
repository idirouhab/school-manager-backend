import mongoose, { Schema } from 'mongoose';

const schema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "user",
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        examId: {
            type: Schema.Types.ObjectId,
            ref: "exam",
            required: true
        },
    },
    {timestamps: true}
);

schema.method("toJSON", function () {
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
});

export default mongoose.model('events', schema);
