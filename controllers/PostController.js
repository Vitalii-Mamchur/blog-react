import PostModel from '../models/Post.js';

export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find().populate('user').exec();

    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Failed to retrieve posts!',
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;

    PostModel.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        $inc: { viewsCount: 1 },
      },
      {
        returnDocument: 'after',
      },
      (error, doc) => {
        if (error) {
          console.error(error);
          return res.status(500).json({
            message: 'Failed to retrieve post!',
          });
        }

        if (!doc) {
          return res.status(404).json({
            message: 'Post not found!',
          });
        }

        res.json(doc);
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Failed to retrieve post!',
    });
  }
};

export const create = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags,
      user: req.userId,
    });

    const post = await doc.save();

    res.json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Failed to create post!',
    });
  }
};

export const remove = async (req, res) => {
  try {
    const postId = req.params.id;

    PostModel.findOneAndRemove(
      {
        _id: postId,
      },
      (error, doc) => {
        if (error) {
          console.error(error);
          return res.status(500).json({
            message: 'Failed to remove post!',
          });
        }

        if (!doc) {
          return res.status(404).json({
            message: 'Post not found!',
          });
        }

        res.json({
          success: true,
        });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Failed to retrieve post!',
    });
  }
};

export const update = async (req, res) => {
  try {
    const postId = req.params.id;

    await PostModel.findOneAndUpdate(
      { _id: postId },
      {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        tags: req.body.tags,
        user: req.userId,
      }
    );

    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Failed to update post!',
    });
  }
};
