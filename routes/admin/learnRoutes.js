/**
 * learnRoutes.js
 * @description :: CRUD API routes for learn
 */

const express = require('express');
const router = express.Router();
const learnController = require('../../controller/admin/learnController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/learn/create').post(auth(PLATFORM.ADMIN),checkRolePermission,learnController.addLearn);
router.route('/admin/learn/list').post(auth(PLATFORM.ADMIN),checkRolePermission,learnController.findAllLearn);
router.route('/admin/learn/count').post(auth(PLATFORM.ADMIN),checkRolePermission,learnController.getLearnCount);
router.route('/admin/learn/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,learnController.softDeleteManyLearn);
router.route('/admin/learn/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,learnController.bulkInsertLearn);
router.route('/admin/learn/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,learnController.bulkUpdateLearn);
router.route('/admin/learn/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,learnController.deleteManyLearn);
router.route('/admin/learn/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,learnController.softDeleteLearn);
router.route('/admin/learn/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,learnController.partialUpdateLearn);
router.route('/admin/learn/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,learnController.updateLearn);    
router.route('/admin/learn/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,learnController.getLearn);
router.route('/admin/learn/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,learnController.deleteLearn);

module.exports = router;
