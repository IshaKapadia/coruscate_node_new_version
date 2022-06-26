/**
 * bulletinRoutes.js
 * @description :: CRUD API routes for bulletin
 */

const express = require('express');
const router = express.Router();
const bulletinController = require('../../controller/admin/bulletinController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/bulletin/create').post(auth(PLATFORM.ADMIN),checkRolePermission,bulletinController.addBulletin);
router.route('/admin/bulletin/list').post(auth(PLATFORM.ADMIN),checkRolePermission,bulletinController.findAllBulletin);
router.route('/admin/bulletin/count').post(auth(PLATFORM.ADMIN),checkRolePermission,bulletinController.getBulletinCount);
router.route('/admin/bulletin/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,bulletinController.softDeleteManyBulletin);
router.route('/admin/bulletin/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,bulletinController.bulkInsertBulletin);
router.route('/admin/bulletin/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,bulletinController.bulkUpdateBulletin);
router.route('/admin/bulletin/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,bulletinController.deleteManyBulletin);
router.route('/admin/bulletin/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,bulletinController.softDeleteBulletin);
router.route('/admin/bulletin/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,bulletinController.partialUpdateBulletin);
router.route('/admin/bulletin/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,bulletinController.updateBulletin);    
router.route('/admin/bulletin/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,bulletinController.getBulletin);
router.route('/admin/bulletin/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,bulletinController.deleteBulletin);

module.exports = router;
