import express from 'express';
import mongoose from 'mongoose';
import router from './route/user_routes';
import blogRouter from './route/blog-routes';
const app = express();
app.use(express.json());
app.use("/api/user", router);
app.use("/api/blog", blogRouter);
mongoose.connect('mongodb+srv://vibhanshuiit:R0UqobPwbtwo5zMS@cluster0.l7rbe4f.mongodb.net/?retryWrites=true&w=majority').then(() => app.listen(5000)).then(() => console.log('Connected to Mongo')).catch(err => console.log(err));
//R0UqobPwbtwo5zMS