import db from "../models";
import mongoose from "mongoose";

const Answer = db.answer;

class AnswerProvider {
    create(data): Promise<mongoose.Document> {
        const answer = new Answer(data);
        return answer
            .save(answer);
    };

    findAll(): Promise<[mongoose.Document]> {
        return Answer
            .find({});
    };

    findOne(id): Promise<mongoose.Document> {
        return Answer
            .findById(id);
    }

    update(id, data): Promise<mongoose.Document> {
        return Answer.findByIdAndUpdate(
            id,
            data,
            {useFindAndModify: true}
        );
    }

    deleteAnswers(ids): Promise<mongoose.Document> {
        return Answer.remove({
            "_id": {
                $in: ids
            }
        });
    };

    delete(id): Promise<mongoose.Document> {
        return Answer.findByIdAndRemove(id);
    }
}

export default new AnswerProvider();