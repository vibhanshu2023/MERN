import Blog from "../model/Blog";
import User from "../model/User";


export const getBlogs = async(req, res, next) => {
    let blogs;
    try {
        blogs = await Blog.find();
    } catch (err) {
        return console.log(err);
    }
    if (!blogs) {
        return res.status(404).json({ message: "Blog not found" });
    }
    return res.status(200).json({ blogs });
};
export const AddBlogs = async(req, res, next) => {
    const { title, description, image, user } = req.body;

    let existingUsers;
    try {
        existingUsers = await User.findById(user);
    } catch (err) {
        return console.log(err);
    }
    if (!existingUsers) {
        return res.status(400).json({ message: "User not found by this ID" });
    }
    const blog = new Blog({ title, description, image, user });
    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await blog.save({ session });
        existingUsers.blogs.push(blog);
        await existingUsers.save({ session })
        await session.commitTransaction();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err })
    }
    return res.status(200).json({ blog });
};
export const updateBlogs = async(req, res, next) => {
    const { title, description } = req.body;
    const blogID = req.params.id;
    let blog;
    try {
        blog = await Blog.findByIdAndUpdate(blogID, { title, description });
    } catch (err) {
        return console.log(err);
    }
    if (!blog) {
        return res.status(500).json({ message: 'Unable to update the Blog' });
    }
    return res.status(200).json({ blog });

};
export const getBlogsbyId = async(req, res, next) => {
    const id = req.params.id;
    let blog;
    try {
        blog = await Blog.findById(id)
    } catch (err) {
        return console.log(err);
    }
    if (!blog) {
        return res.status(404).json({ message: 'No Blog Found' });
    }
    return res.status(200).json({ blog });
};
export const deleteBlogs = async(req, res, next) => {
    const id = req.params.id;
    let blog;
    try {
        blog = await Blog.findByIdAndRemove(id).populate("user");
        await blog.user.blogs.pull(blog);
    } catch (err) {
        return console.log(err);
    }
    if (!blog) {
        return res.status(400).json({ message: "Unable to Delete" });
    }
    return res.status(200).json({ message: "Successfully deleted" });
};