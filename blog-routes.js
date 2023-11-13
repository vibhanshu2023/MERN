import express from 'express';
import { getBlogs, AddBlogs, updateBlogs, getBlogsbyId, deleteBlogs } from '../controllers/blog-controller';
const blogRouter = express();

blogRouter.get("/", getBlogs);
blogRouter.post("/add", AddBlogs);
blogRouter.put("/update/:id", updateBlogs);
blogRouter.get("/:id", getBlogsbyId);
blogRouter.delete("/:id", deleteBlogs);
export default blogRouter;