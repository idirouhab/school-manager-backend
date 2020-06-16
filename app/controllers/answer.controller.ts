import EventEmitter from "../events/email.emmiter";
import AnswerProvider from "../providers/answer.provider";
import ExamProvider from "../providers/exam.provider";
import * as express from "express";


export default class AnswerController {
    create(req: express.Request, res: express.Response) {
        const answer = req.body.answer;
        const examId = answer.examId;
        return AnswerProvider.create(req.body.answer)
            .then(data => {

                ExamProvider.updateExamAnswers(examId, data._id).then(
                    (data) => {
                        EventEmitter.emit("notify_teacher_new_exam", examId, answer);
                        res.send(data);
                    });
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while creating the Answer."
                });
            });
    };

    findAll(req: express.Request, res: express.Response) {
        return AnswerProvider.findAll()
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving exams."
                });
            });
    };

    findOne(req: express.Request, res: express.Response) {
        return AnswerProvider
            .findOne(req.params.id)
            .then(data => {
                if (!data)
                    res.status(404).send({message: "Not found Answer with id"});
                else res.send(data);
            })
            .catch(err => {
                res
                    .status(500)
                    .send({message: "Error retrieving Answer with id"});
            });
    };

    update(req: express.Request, res: express.Response) {
        if (!req.body) {
            return res.status(400).send({
                message: "Data to update can not be empty!"
            });
        }

        AnswerProvider.update(req.params.id, req.body.answer)
            .then(data => {
                if (!data) {
                    res.status(404).send({
                        message: `Cannot update Answer with id. Maybe Tutorial was not found!`
                    });
                } else res.send({message: "Answer was updated successfully."});
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error updating Answer with id"
                });
            });
    };

    delete(req: express.Request, res: express.Response) {
        const answerId = req.params.id;
        const userId = req["userId"];
        return AnswerProvider.delete(answerId)
            .then(data => {
                if (!data) {
                    res.status(404).send({
                        message: `Cannot delete Answer. Maybe Answer was not found!`
                    });
                } else {
                    res.send({
                        message: "Answer was deleted successfully!"
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Could not delete Answer with id"
                });
            });
    }
}
