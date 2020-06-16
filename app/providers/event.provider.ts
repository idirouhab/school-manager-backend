import db from "../models";
import mongoose from "mongoose";

const Event = db.event;

class EventProvider {
    create(data): Promise<mongoose.Document> {
        const event = new Event(data);

        return event
            .save(event);
    };

    findAll(userId, role): Promise<Array<mongoose.Document>> {
        let filter = role === "ROOT" ? {} : {
            "userId": userId
        };

        return Event
            .find(filter)
            .populate("examId", "text");
    };

    findOne(id): Promise<mongoose.Document> {
        return Event.findById(id);
    };

    delete(data): Promise<mongoose.Document> {
        return Event
            .findOneAndRemove(
                {
                    examId: data.examId,
                    date: data.date,
                    userId: data.userId
                });
    };
}

export default new EventProvider();