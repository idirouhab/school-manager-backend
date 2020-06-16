import db from "../models";
import mongoose from "mongoose";

const Folder = db.folder;

class FolderProvider {
    create(data, userId): Promise<mongoose.Document> {
        data.userId = userId;
        const folder = new Folder(data);
        return folder
            .save(folder);
    };

    findAll(userId, role): Promise<Array<mongoose.Document>> {
        let filter = role === "ROOT" ? {} : {
            "userId": userId
        };

        return Folder.find(filter);
    };

    findOne(id: string, userId: number, role: string): Promise<mongoose.Document> {
        let filter = {};
        filter = role === "ROOT" ? [filter] : filter["userId"] = userId;
        filter["_id"] = id;

        return Folder.findOne(filter);
    };

    delete(id, userId, role): Promise<mongoose.Document> {
        let filter = {};
        filter = role === "ROOT" ? [filter] : filter["userId"] = userId;
        filter["_id"] = id;

        return Folder.findOneAndRemove(filter);
    };

    update(id, userId, data): Promise<mongoose.Document> {
        return Folder.findOneAndUpdate({
                "_id": id,
                "userId": userId
            },
            data,
            {
                useFindAndModify: false
            }
        );
    };
}

export default new FolderProvider();
