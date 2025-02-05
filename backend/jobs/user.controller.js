import User from "../models/user.model.js";
export const clickHandler = async (req, res) => {
  const { userId } = req.body;
  try {
    let user = await User.findOne({ userId });
    if (!user) {
      user = new User({ userId });
    }

    user.totalClicks += 1;
    let reward = null;
    const random = Math.random();
    reward = "10 points";
    if (random < 0.5) {
      user.totalPoints += 10;
    } else if (random < 0.75) {
      user.prizesWon += 1;
      reward = "prize won";
    } else {
      user.totalPoints += 1;
    }
    await user.save();
    res.status(201).json({
      totalClicks: user.totalClicks,
      totalPoints: user.totalPoints,
      prizesWon: user.prizesWon,
      reward,
    });
  } catch (error) {
    console.log(`Error in clickHandler`, error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.params.id });
    if (!user) {
      return res
        .status(201)
        .json({ totalClicks: 0, totalPoints: 0, prizesWon: 0 });
    }
    res.status(201).json(user);
  } catch (error) {
    console.log(`Error in getUser`, error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
