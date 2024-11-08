import {
  createCircleService,
  deleteCircleService,
  joinCircleService,
} from "../services/circle.js";

// create a circle
export const createCircle = async (req, res, next) => {
  try {
    const { name } = req.body;
    const newCircle = await createCircleService(req.auth.id, name);
    res.status(201).json(newCircle);
  } catch (error) {
    next(error);
  }
};
// delete circle

export const deleteCircle = async (req, res, next) => {
  const { circleId } = req.params;

  try {
    await deleteCircleService(circleId);
    res.status(200).json({ message: "Circle Deleted successfully" });
  } catch (error) {
    next(error);
  }
};
// join circle
export const joinCircle = async (req, res, next) => {
  try {
    const { inviteCode, userId } = req.body;
    const result = await joinCircleService(userId, inviteCode);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};


