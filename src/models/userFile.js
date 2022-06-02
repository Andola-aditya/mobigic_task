import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

const UserFilesSchema = new Schema({
    originalName: {
        type: String,
    },
    storage: {
        type: String,
    },
    link: {
        type: String,
    },
    size: {
        type: Number,
    },
    uniqueCode: {
        type: String,
    },
    createdBy: {
        type: ObjectId,
        ref: 'users',
    },
});

export default mongoose.model('UserFiles', UserFilesSchema);


