import UserFiles from '../models/userFile';
import AWS from 'aws-sdk';
import devConfig from '../../config/development.json';
import fs from 'fs';


export async function add(req, res) {

    const file = req.file;
    const config = devConfig.aws;

    const buffer = await fs.readFileSync(file.path);

    const s3 = new AWS.S3({
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey
    });

    let promise = await s3.upload({
        ACL: 'public-read',
        ContentType: file.mimeType,
        Bucket: config.bucket,
        Key: file.originalname,
        Body: buffer
    }).promise().then((data)=>{
        return data;
    });

    const userFile = {
        originalName: file.originalname,
        storage: 's3',
        link: promise.Location,
        size: file.size,
        createdBy: req.userId,
        uniqueCode: Math.random().toString(36).substring(2,8)
    };

    return await UserFiles.create(userFile)
        .then(function (file) {
            res.status(200).json({ file });
        })
        .catch(function (err) {
            return err;
        });
}

export async function view(req, res) {
    return await UserFiles.find({createdBy : req.userId})
        .then(function (file) {
            res.status(200).json({ file });
        })
        .catch(function (err) {
            return err;
        });
}

export async function deleteFile(req, res) {
    await UserFiles.findOneAndRemove(req.query).then(function (file) {
        res.status(200).json({ file });
    }).catch(function (err) {
        return err;
    });
}

