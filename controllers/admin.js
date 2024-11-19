import { CircleModel } from "../models/circle.js";
import {
  createCircleService,
  deleteCircleService,
  getCircleService,
  joinCircleService,
} from "../services/circle.js";
import { joinCircleValidator } from "../validation/circle.js";

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
  const { id } = req.params;

  try {
    const deleting = await deleteCircleService(id);
    // check if theres an error returned
    if (deleting.error) {
      return res.status(404).json({ message: result.error });
    }
    res.status(200).json({ message: "Circle Deleted successfully" });
  } catch (error) {
    next(error);
  }
};
// join circle
export const joinCircle = async (req, res, next) => {
  try {
    const { error, value } = joinCircleValidator.validate(req.body);
    const result = await joinCircleService(req.auth.id, value.inviteCode);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getCircleById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const aCircle = await getCircleService(id);
    if (!aCircle) {
      return res.status(404).json({ message: "found" });
    }
    res.status(200).json(aCircle);
  } catch (error) {
    next(error);
  }
};
