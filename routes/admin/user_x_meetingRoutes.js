/**
 * user_x_meetingRoutes.js
 * @description :: CRUD API routes for user_x_meeting
 */

const express = require('express');
const router = express.Router();
const user_x_meetingController = require('../../controller/admin/user_x_meetingController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/user_x_meeting/create').post(auth(PLATFORM.ADMIN),checkRolePermission,user_x_meetingController.addUser_x_meeting);
router.route('/admin/user_x_meeting/list').post(auth(PLATFORM.ADMIN),checkRolePermission,user_x_meetingController.findAllUser_x_meeting);
router.route('/admin/user_x_meeting/count').post(auth(PLATFORM.ADMIN),checkRolePermission,user_x_meetingController.getUser_x_meetingCount);
router.route('/admin/user_x_meeting/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,user_x_meetingController.softDeleteManyUser_x_meeting);
router.route('/admin/user_x_meeting/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,user_x_meetingController.bulkInsertUser_x_meeting);
router.route('/admin/user_x_meeting/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,user_x_meetingController.bulkUpdateUser_x_meeting);
router.route('/admin/user_x_meeting/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,user_x_meetingController.deleteManyUser_x_meeting);
router.route('/admin/user_x_meeting/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,user_x_meetingController.softDeleteUser_x_meeting);
router.route('/admin/user_x_meeting/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,user_x_meetingController.partialUpdateUser_x_meeting);
router.route('/admin/user_x_meeting/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,user_x_meetingController.updateUser_x_meeting);    
router.route('/admin/user_x_meeting/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,user_x_meetingController.getUser_x_meeting);
router.route('/admin/user_x_meeting/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,user_x_meetingController.deleteUser_x_meeting);

module.exports = router;
