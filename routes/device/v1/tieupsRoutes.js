/**
 * tieupsRoutes.js
 * @description :: CRUD API routes for tieups
 */

const express = require('express');
const router = express.Router();
const tieupsController = require('../../../controller/device/v1/tieupsController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/tieups/create').post(auth(PLATFORM.DEVICE),checkRolePermission,tieupsController.addTieups);
router.route('/device/api/v1/tieups/list').post(auth(PLATFORM.DEVICE),checkRolePermission,tieupsController.findAllTieups);
router.route('/device/api/v1/tieups/count').post(auth(PLATFORM.DEVICE),checkRolePermission,tieupsController.getTieupsCount);
router.route('/device/api/v1/tieups/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,tieupsController.softDeleteManyTieups);
router.route('/device/api/v1/tieups/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,tieupsController.bulkInsertTieups);
router.route('/device/api/v1/tieups/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,tieupsController.bulkUpdateTieups);
router.route('/device/api/v1/tieups/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,tieupsController.deleteManyTieups);
router.route('/device/api/v1/tieups/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,tieupsController.softDeleteTieups);
router.route('/device/api/v1/tieups/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,tieupsController.partialUpdateTieups);
router.route('/device/api/v1/tieups/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,tieupsController.updateTieups);    
router.route('/device/api/v1/tieups/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,tieupsController.getTieups);
router.route('/device/api/v1/tieups/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,tieupsController.deleteTieups);

module.exports = router;
