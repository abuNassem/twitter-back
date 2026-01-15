const mongo=require('mongoose')

const reactSchema=new mongo.Schema({
    userId:mongo.Schema.Types.ObjectId,
    postId:mongo.Schema.Types.ObjectId
})
reactSchema.index({ userId: 1, postId: 1 }, { unique: true })

const React=mongo.model('react',reactSchema)
module.exports=React