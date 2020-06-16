import db from "../models";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const
    Exam = db.exam,
    User = db.user;

class UserProvider {
    create(data): Promise<mongoose.Document> {
        const user = new User({
            email: data.email,
            password: bcrypt.hashSync(data.password, 10),
            name: data.name,
            lastName: data.lastName,
            language: data.language
        });

        return user.save(user);
    };

    findUserByEmail(email: string): Promise<mongoose.Document> {
        return User.findOne({email: email});
    };

    findUserByExamId(id: string): Promise<mongoose.Document> {
        return Exam.findById(id).populate("userId", ["name", "email"]);
    };

    findAll(): Promise<Array<mongoose.Document>> {
        return User.find({}, {password: 0});
    };

    findOne(id: string): Promise<mongoose.Document> {
        return User.findById((id), {password: 0});

    };

    update(id: string, user): Promise<mongoose.Document> {
        return User.findByIdAndUpdate(
            id,
            user,
            {useFindAndModify: false}
        );
    };

    delete(id: string): Promise<any> {
        return User.findByIdAndRemove(id);
    };

}

export default new UserProvider();
