const express = require("express");
const authMiddleware = require("../middlewares/authmiddleware");
const {
  createInventoryController,
  getInventoryController,
  getDonarsController,
  getHospitalController,
  getorganizationController,
  getorganizationForHospitalController,
  getInventoryHospitalController,
  getRecentInventoryController,
} = require("../controllers/inventoryController");

const router = express.Router();

//routes
// ADD INVENTORY || POST
router.post("/create-inventory", authMiddleware, createInventoryController);

//GET ALL BLOOD RECORDS
router.get("/get-inventory", authMiddleware, getInventoryController);
//GET RECENT BLOOD RECORDS
router.get(
  "/get-recent-inventory",
  authMiddleware,
  getRecentInventoryController
);

//GET HOSPITAL BLOOD RECORDS
router.post(
  "/get-inventory-hospital",
  authMiddleware,
  getInventoryHospitalController
);

//GET DONAR RECORDS
router.get("/get-donars", authMiddleware, getDonarsController);

//GET HOSPITAL RECORDS
router.get("/get-hospitals", authMiddleware, getHospitalController);

//GET organization RECORDS
router.get("/get-organization", authMiddleware, getorganizationController);

//GET organization RECORDS
router.get(
  "/get-organization-for-hospital",
  authMiddleware,
  getorganizationForHospitalController
);

module.exports = router;
