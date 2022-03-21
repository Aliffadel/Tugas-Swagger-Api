const { User, Post } = require('../models')


const CreatePost = async (req, res) => {
  const { user_uuid, title, content } = req.body

  try {
    const user = await User.findOne({ where: { uuid: user_uuid } })

    const post = await Post.create({ title, content, user_uuid: user.uuid })

    return res.status(201).json({
      message: "Post Successfully Created",
      data: post
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: error.message
    })
  }
}

const GetPost = async (req, res) => {
  try {
    const posts = await Post.findAll({ include: 'user' })

    return res.json({
      message: "Posts Successfully Found",
      data: posts
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: error.message
    })
  }
}

const GetPostById = async (req, res) => {
  try {
    const postSelected = await Post.findOne({
      where: {
        uuid: req.params.id
      },
      include: ["user"]
    })

    if (postSelected) {
      res.status(200).json({
        message: "Successfully get post data",
        data: postSelected,
      });
    } else {
      res.status(404).json({
        message: "Post Data Not Found"
      });
    }

  } catch (error) {
    return res.status(500).json({
      message: error.message
    })
  }
}

const EditPost = async (req, res) => {
  try {
    const uuid = req.params.id
    const { title, content, user_uuid } = req.body

    const post = await Post.findOne({
      where: {
        uuid: uuid
      }
    })

    if (!post) {
      res.status(404).json({
        message: "Post Data Not Found"
      })
    }

    if (title) {
      post.title = title
    }
    if (content) {
      post.content = content 
    }
    if (user_uuid) {
      post.user_uuid = user_uuid
    }

    await post.save()

    return res.status(200).json({
      message: "Post Successfully Updated",
      data: post
    })

  } catch (error) {
    return res.status(500).json({
      message: error.message
    })
  }
}

const DeletePost = async (req, res) => {
  try {
    const postToDelete = await Post.findByPk(req.params.id)
    if (postToDelete) {
      const deleted = await Post.destroy({
        where: {
          uuid: req.params.id
        }
      })
      res.status(200).json({
        message: "SUCCESS",
      })
    } else {
      res.status(404).json({
        message: "Post Data Not Found"
      })
    }


  } catch (error) {
    return res.status(500).json({
      message: error.message
    })
  }
}


module.exports = {
  CreatePost,
  GetPost,
  GetPostById,
  EditPost,
  DeletePost
}