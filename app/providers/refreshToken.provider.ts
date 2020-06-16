import db from "../models";
import mongoose from "mongoose";

const RefreshToken = db.refreshToken;

class RefreshTokenProvider {
    create(userId, refreshToken): Promise<mongoose.Document> {
        const data = {userId, refreshToken};
        const token = new RefreshToken(data);
        return token
            .save(token);
    };

    findOne(refreshToken): Promise<mongoose.Document> {
        return RefreshToken
            .findOne(
                {"refreshToken": refreshToken}
            );
    };

    findByUser(userId): Promise<mongoose.Document> {
        return RefreshToken
            .findOne(
                {userId}
            );
    };

    update(id, data): Promise<mongoose.Document> {
        return RefreshToken
            .findByIdAndUpdate(
                id,
                data,
                {useFindAndModify: false}
            );
    };
}

export default new RefreshTokenProvider();