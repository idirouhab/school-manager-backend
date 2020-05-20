const db = require("../models");
const Folder = db.folder;

exports.create = (data, userId) => {
    data.userId = userId;
    const folder = new Folder(data);
    return folder
        .save(folder)
};

exports.findAll = (userId, role) => {
    let filter = role === 'ROOT' ? {} : {
        "userId": userId
    };

    return Folder.find(filter);
};

exports.findOne = (id, userId, role) => {
    let filter = {
        '_id': id
    };

    filter = role === 'ROOT' ? filter : filter.userId = userId;

    return Folder.findOne(filter)
};

exports.delete = (id, userId) => {
    return Folder.findOneAndRemove({
        "_id": id,
        userId: userId
    })
};

exports.update = (id, userId, data) => {
    return Folder.findOneAndUpdate({
            "_id": id,
            "userId": userId
        }, data,
        {useFindAndModify: false}
    );
};
