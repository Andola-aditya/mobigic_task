import mongoose from 'mongoose';
import devConfig from '../config/development.json';
// import prodConfig from '../config/production.json';

mongoose
    .connect(devConfig.mongoUrl, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .catch((err) => {
        console.log(err);
        process.exit(1);
    });
mongoose.Promise = global.Promise;

export default mongoose;
