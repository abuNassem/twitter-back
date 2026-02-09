const Post = require("../model/post")
const User = require("../model/user")

exports.suggestions = async (req, res) => {
    try {
        const searchKey = req.query.key
        const searchRegex = new RegExp(searchKey, 'i')
        if (!searchKey) return res.status(200).json({ users: [], posts: [] })


        const [user, post] = await Promise.all([
            User.find({ name: searchRegex }).select('name profileImage'),
            Post.find({
                $or: [
                    { postHashtags: { $regex: searchRegex } },
                    { "content.text": { $regex: searchRegex } }
                ]
            }).select('content.text postHashtags')
        ]);

        res.status(200).json({ user, post })


    } catch (error) {
        res.status(500).json({ message: error })
    }
}

exports.search = async (req, res) => {
    try {
        const keySearch = req.params.key
        const regexSearch = new RegExp(keySearch, 'i')
        const [posts, users] = await Promise.all([
            Post.find({ postHashtags: { $regex: regexSearch } }),
            User.find({ name: { $regex: regexSearch } })
        ])
        res.status(200).json({ posts, users })
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

exports.getUserByEmail = async (req, res) => {
    try {
        const email = req.params.email
        const user = await User.findOne({ email }).select('name profileImage email ')
        if (!user) {
            return res.status(200).json({ user: null, message: 'no user with this email' })
        }
        res.status(200).json({ user, message: null })
    } catch (error) {
        res.status(500).json({ error })
    }
}
