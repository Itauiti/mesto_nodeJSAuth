const Card = require('../models/card');

module.exports.getAllCards = async (req, res) => {
  try {
    const card = await Card.find({});
    return res.send(card);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports.createCard = async (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  try {
    const card = await Card.create({ name, link, owner });
    return res.send(card);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).send({ message: 'Ошибка валидации' });
    } else {
      res.status(500).send({ message: err.message });
    }
  }
};

module.exports.deleteCard = async (req, res) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  try {
    const card = await Card.findById(cardId);
    if (card === null) {
      res.status(404).send({ message: 'Объект не найден' });
    } else {
      const cardToDelete = await Card.findById({ _id: cardId, owner: userId });
      if (!cardToDelete) {
        res.status(404).send({ message: 'Вы не можете удалить чужую карточку' });
      } else {
        cardToDelete.remove();
        return res.send(cardToDelete);
      }
    }
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(400).send({ message: 'Ошибка валидации ID' });
    } else {
      res.status(500).send({ message: err.message });
    }
  }
};

module.exports.likeCard = async (req, res) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findById(cardId);
    if (card === null) {
      res.status(404).send({ message: 'Объект не найден' });
    } else {
      const cardToLike = await Card.findByIdAndUpdate(
        cardId,
        { $addToSet: { likes: req.user._id } },
        { new: true },
      );
      return res.send(cardToLike);
    }
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(400).send({ message: 'Ошибка валидации ID' });
    } else {
      res.status(500).send({ message: err.message });
    }
  }
};

module.exports.dislikeCard = async (req, res) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findById(cardId);
    if (card === null) {
      res.status(404).send({ message: 'Объект не найден' });
    } else {
      const cardToDislike = await Card.findByIdAndUpdate(
        cardId,
        { $pull: { likes: req.user._id } },
        { new: true },
      );
      return res.send(cardToDislike);
    }
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(400).send({ message: 'Ошибка валидации ID' });
    } else {
      res.status(500).send({ message: err.message });
    }
  }
};
