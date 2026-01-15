const Comment = require("../model/comment");
const { getIo } = require("../socket/socket");
const Post = require("../model/post");

exports.CreateComment = async (req, res) => {
  try {
    const io = getIo();
    const user = req.user;
    const postId = req.params.id;
    const comment = req.body.text;
    const newComment = new Comment({
      text: comment,
      nameUser: user.name,
      profileImage: user.profileImage,
      userId: user._id,
      postId,
    });
     await Post.findOneAndUpdate(
      { _id: postId },
      { $inc: { commentCount: 1 } }
    );

    await newComment.save();
    const comments = await Comment.find({ postId });

    io.emit("rePostComment", comments);

        const posts = await Post.find().populate('userId','profileImage name email').lean()

    io.emit("sendPost", posts);
    res.status(200).json({ newComment });
  } catch (err) {
    console.log(err);
  }
};

exports.getComment = async (req, res) => {
  try {
    const postId = req.params.id;
    const comments = await Comment.find({ postId });

    res.status(200).json({ comments });
  } catch (err) {
    console.log(err);
  }
};
