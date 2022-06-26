/**
 * meetingRoutes.js
 * @description :: CRUD API routes for meeting
 */

const express = require('express');
const router = express.Router();
const meetingController = require('../../controller/admin/meetingController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/meeting/create').post(auth(PLATFORM.ADMIN),checkRolePermission,meetingController.addMeeting);
router.route('/admin/meeting/list').post(auth(PLATFORM.ADMIN),checkRolePermission,meetingController.findAllMeeting);
router.route('/admin/meeting/count').post(auth(PLATFORM.ADMIN),checkRolePermission,meetingController.getMeetingCount);
router.route('/admin/meeting/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,meetingController.softDeleteManyMeeting);
router.route('/admin/meeting/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,meetingController.bulkInsertMeeting);
router.route('/admin/meeting/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,meetingController.bulkUpdateMeeting);
router.route('/admin/meeting/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,meetingController.deleteManyMeeting);
router.route('/admin/meeting/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,meetingController.softDeleteMeeting);
router.route('/admin/meeting/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,meetingController.partialUpdateMeeting);
router.route('/admin/meeting/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,meetingController.updateMeeting);    
router.route('/admin/meeting/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,meetingController.getMeeting);
router.route('/admin/meeting/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,meetingController.deleteMeeting);
router.route('/admin/meeting/getMeetingBySpace').get(meetingController.getMeetingBySpace);

module.exports = router;
