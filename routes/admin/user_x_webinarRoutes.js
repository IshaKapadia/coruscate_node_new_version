/**
 * user_x_webinarRoutes.js
 * @description :: CRUD API routes for user_x_webinar
 */

const express = require('express');
const router = express.Router();
const user_x_webinarController = require('../../controller/admin/user_x_webinarController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/user_x_webinar/create').post(auth(PLATFORM.ADMIN),checkRolePermission,user_x_webinarController.addUser_x_webinar);
router.route('/admin/user_x_webinar/list').post(auth(PLATFORM.ADMIN),checkRolePermission,user_x_webinarController.findAllUser_x_webinar);
router.route('/admin/user_x_webinar/count').post(auth(PLATFORM.ADMIN),checkRolePermission,user_x_webinarController.getUser_x_webinarCount);
router.route('/admin/user_x_webinar/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,user_x_webinarController.softDeleteManyUser_x_webinar);
router.route('/admin/user_x_webinar/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,user_x_webinarController.bulkInsertUser_x_webinar);
router.route('/admin/user_x_webinar/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,user_x_webinarController.bulkUpdateUser_x_webinar);
router.route('/admin/user_x_webinar/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,user_x_webinarController.deleteManyUser_x_webinar);
router.route('/admin/user_x_webinar/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,user_x_webinarController.softDeleteUser_x_webinar);
router.route('/admin/user_x_webinar/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,user_x_webinarController.partialUpdateUser_x_webinar);
router.route('/admin/user_x_webinar/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,user_x_webinarController.updateUser_x_webinar);    
router.route('/admin/user_x_webinar/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,user_x_webinarController.getUser_x_webinar);
router.route('/admin/user_x_webinar/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,user_x_webinarController.deleteUser_x_webinar);

module.exports = router;
