const Router = require("express");
const router = new Router();
const RecordController = require("../controller/user.controller");

router.post("/record", RecordController.createRecord);
router.get("/record", RecordController.getRecords);
router.get("/record/:id", RecordController.getOneRecord);
router.put("/record", RecordController.updateRecord);
router.delete("/record/:id", RecordController.deleteRecord);

module.exports = router;
