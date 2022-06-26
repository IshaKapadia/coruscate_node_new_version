/**
 * meetingRoutes.js
 * @description :: CRUD API routes for meeting
 */

const express = require('express');
const router = express.Router();
const meetingController = require('../../../controller/device/v1/meetingController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/meeting/create').post(auth(PLATFORM.DEVICE),checkRolePermission,meetingController.addMeeting);
router.route('/device/api/v1/meeting/list').post(auth(PLATFORM.DEVICE),checkRolePermission,meetingController.findAllMeeting);
router.route('/device/api/v1/meeting/count').post(auth(PLATFORM.DEVICE),checkRolePermission,meetingController.getMeetingCount);
router.route('/device/api/v1/meeting/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,meetingController.softDeleteManyMeeting);
router.route('/device/api/v1/meeting/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,meetingController.bulkInsertMeeting);
router.route('/device/api/v1/meeting/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,meetingController.bulkUpdateMeeting);
router.route('/device/api/v1/meeting/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,meetingController.deleteManyMeeting);
router.route('/device/api/v1/meeting/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,meetingController.softDeleteMeeting);
router.route('/device/api/v1/meeting/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,meetingController.partialUpdateMeeting);
router.route('/device/api/v1/meeting/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,meetingController.updateMeeting);    
router.route('/device/api/v1/meeting/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,meetingController.getMeeting);
router.route('/device/api/v1/meeting/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,meetingController.deleteMeeting);

module.exports = router;
