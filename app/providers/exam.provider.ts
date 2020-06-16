import db from "../models";
import mongoose from "mongoose";

const Exam = db.exam;

class ExamProvider {
    create(data, userId): Promise<mongoose.Document> {
        data.userId = userId;

        const exam = new Exam(data);

        return exam
            .save(exam);
    };

    updateExamAnswers(examId, answerId): Promise<mongoose.Document> {
        return Exam
            .findOneAndUpdate(
                {"_id": examId},
                {"$push": {"answers": answerId}},
                {new: true});
    };

    findAll(userId, role): Promise<Array<mongoose.Document>> {
        let filter = role === "ROOT" ? {} : {
            "userId": userId
        };

        return Exam
            .find(filter)
            .populate(
                "userId",
                "name"
            );
    };

    findOne(id): Promise<mongoose.Document> {
        return Exam
            .findById(id)
            .populate(
                "answers"
            );
    };

    update(id, data): Promise<mongoose.Document> {
        return Exam
            .findByIdAndUpdate(
                id,
                data,
                {
                    useFindAndModify: false
                }
            );
    };

    updateOne(filter, data): Promise<mongoose.Document> {
        return Exam
            .findOneAndUpdate(
                filter,
                data,
                {
                    useFindAndModify: false
                }
            );
    };

    delete(id): Promise<mongoose.Document> {
        return Exam
            .findByIdAndRemove(id);
    };
}


export default new ExamProvider();