/**
 * expertiesRoutes.js
 * @description :: CRUD API routes for experties
 */

const express = require('express');
const router = express.Router();
const expertiesController = require('../../controller/admin/expertiesController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/experties/create').post(auth(PLATFORM.ADMIN),checkRolePermission,expertiesController.addExperties);
router.route('/admin/experties/list').post(auth(PLATFORM.ADMIN),checkRolePermission,expertiesController.findAllExperties);
router.route('/admin/experties/count').post(auth(PLATFORM.ADMIN),checkRolePermission,expertiesController.getExpertiesCount);
router.route('/admin/experties/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,expertiesController.softDeleteManyExperties);
router.route('/admin/experties/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,expertiesController.bulkInsertExperties);
router.route('/admin/experties/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,expertiesController.bulkUpdateExperties);
router.route('/admin/experties/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,expertiesController.deleteManyExperties);
router.route('/admin/experties/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,expertiesController.softDeleteExperties);
router.route('/admin/experties/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,expertiesController.partialUpdateExperties);
router.route('/admin/experties/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,expertiesController.updateExperties);    
router.route('/admin/experties/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,expertiesController.getExperties);
router.route('/admin/experties/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,expertiesController.deleteExperties);

module.exports = router;
