/**
 * tieupsRoutes.js
 * @description :: CRUD API routes for tieups
 */

const express = require('express');
const router = express.Router();
const tieupsController = require('../../controller/admin/tieupsController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/tieups/create').post(auth(PLATFORM.ADMIN),checkRolePermission,tieupsController.addTieups);
router.route('/admin/tieups/list').post(auth(PLATFORM.ADMIN),checkRolePermission,tieupsController.findAllTieups);
router.route('/admin/tieups/count').post(auth(PLATFORM.ADMIN),checkRolePermission,tieupsController.getTieupsCount);
router.route('/admin/tieups/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,tieupsController.softDeleteManyTieups);
router.route('/admin/tieups/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,tieupsController.bulkInsertTieups);
router.route('/admin/tieups/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,tieupsController.bulkUpdateTieups);
router.route('/admin/tieups/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,tieupsController.deleteManyTieups);
router.route('/admin/tieups/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,tieupsController.softDeleteTieups);
router.route('/admin/tieups/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,tieupsController.partialUpdateTieups);
router.route('/admin/tieups/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,tieupsController.updateTieups);    
router.route('/admin/tieups/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,tieupsController.getTieups);
router.route('/admin/tieups/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,tieupsController.deleteTieups);

module.exports = router;
