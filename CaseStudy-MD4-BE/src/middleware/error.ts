import fs from 'fs';

export const errorHandler = (err, req, res, next) => {
    fs.writeFile("./log.txt", err.message, function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });
    res.status(400).json({
        errorCode: 400,
        message: err.message
    });
    next();
}
