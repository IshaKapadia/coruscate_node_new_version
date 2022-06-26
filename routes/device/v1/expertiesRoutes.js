/**
 * expertiesRoutes.js
 * @description :: CRUD API routes for experties
 */

const express = require('express');
const router = express.Router();
const expertiesController = require('../../../controller/device/v1/expertiesController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/experties/create').post(auth(PLATFORM.DEVICE),checkRolePermission,expertiesController.addExperties);
router.route('/device/api/v1/experties/list').post(auth(PLATFORM.DEVICE),checkRolePermission,expertiesController.findAllExperties);
router.route('/device/api/v1/experties/count').post(auth(PLATFORM.DEVICE),checkRolePermission,expertiesController.getExpertiesCount);
router.route('/device/api/v1/experties/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,expertiesController.softDeleteManyExperties);
router.route('/device/api/v1/experties/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,expertiesController.bulkInsertExperties);
router.route('/device/api/v1/experties/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,expertiesController.bulkUpdateExperties);
router.route('/device/api/v1/experties/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,expertiesController.deleteManyExperties);
router.route('/device/api/v1/experties/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,expertiesController.softDeleteExperties);
router.route('/device/api/v1/experties/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,expertiesController.partialUpdateExperties);
router.route('/device/api/v1/experties/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,expertiesController.updateExperties);    
router.route('/device/api/v1/experties/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,expertiesController.getExperties);
router.route('/device/api/v1/experties/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,expertiesController.deleteExperties);

module.exports = router;
