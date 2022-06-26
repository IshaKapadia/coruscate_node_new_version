/**
 * learnRoutes.js
 * @description :: CRUD API routes for learn
 */

const express = require('express');
const router = express.Router();
const learnController = require('../../../controller/device/v1/learnController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/learn/create').post(auth(PLATFORM.DEVICE),checkRolePermission,learnController.addLearn);
router.route('/device/api/v1/learn/list').post(auth(PLATFORM.DEVICE),checkRolePermission,learnController.findAllLearn);
router.route('/device/api/v1/learn/count').post(auth(PLATFORM.DEVICE),checkRolePermission,learnController.getLearnCount);
router.route('/device/api/v1/learn/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,learnController.softDeleteManyLearn);
router.route('/device/api/v1/learn/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,learnController.bulkInsertLearn);
router.route('/device/api/v1/learn/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,learnController.bulkUpdateLearn);
router.route('/device/api/v1/learn/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,learnController.deleteManyLearn);
router.route('/device/api/v1/learn/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,learnController.softDeleteLearn);
router.route('/device/api/v1/learn/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,learnController.partialUpdateLearn);
router.route('/device/api/v1/learn/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,learnController.updateLearn);    
router.route('/device/api/v1/learn/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,learnController.getLearn);
router.route('/device/api/v1/learn/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,learnController.deleteLearn);

module.exports = router;
