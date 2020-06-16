import db from "../models";
import crypto from "crypto";
import mongoose from "mongoose";

const Token = db.token;

class TokenProvider {
    create(user): Promise<mongoose.Document> {
        const data = {
            userId: user.id,
            token: crypto.randomBytes(16).toString("hex")
        };
        const token = new Token(data);
        return token
            .save(token);
    };

    findOne(token): Promise<mongoose.Document> {
        return Token
            .findOne(
                {"token": token}
            );
    };

    update(id, data): Promise<mongoose.Document> {
        return Token.findByIdAndUpdate(
            id,
            data,
            {useFindAndModify: false}
        );
    };
}

export default new TokenProvider();