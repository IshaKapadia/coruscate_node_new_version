/**
 * bulletinRoutes.js
 * @description :: CRUD API routes for bulletin
 */

const express = require('express');
const router = express.Router();
const bulletinController = require('../../../controller/device/v1/bulletinController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/bulletin/create').post(auth(PLATFORM.DEVICE),checkRolePermission,bulletinController.addBulletin);
router.route('/device/api/v1/bulletin/list').post(auth(PLATFORM.DEVICE),checkRolePermission,bulletinController.findAllBulletin);
router.route('/device/api/v1/bulletin/count').post(auth(PLATFORM.DEVICE),checkRolePermission,bulletinController.getBulletinCount);
router.route('/device/api/v1/bulletin/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,bulletinController.softDeleteManyBulletin);
router.route('/device/api/v1/bulletin/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,bulletinController.bulkInsertBulletin);
router.route('/device/api/v1/bulletin/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,bulletinController.bulkUpdateBulletin);
router.route('/device/api/v1/bulletin/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,bulletinController.deleteManyBulletin);
router.route('/device/api/v1/bulletin/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,bulletinController.softDeleteBulletin);
router.route('/device/api/v1/bulletin/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,bulletinController.partialUpdateBulletin);
router.route('/device/api/v1/bulletin/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,bulletinController.updateBulletin);    
router.route('/device/api/v1/bulletin/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,bulletinController.getBulletin);
router.route('/device/api/v1/bulletin/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,bulletinController.deleteBulletin);

module.exports = router;
