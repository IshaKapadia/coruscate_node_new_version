/**
 * spaceRoutes.js
 * @description :: CRUD API routes for space
 */

const express = require('express');
const router = express.Router();
const spaceController = require('../../../controller/device/v1/spaceController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/space/create').post(auth(PLATFORM.DEVICE),checkRolePermission,spaceController.addSpace);
router.route('/device/api/v1/space/list').post(auth(PLATFORM.DEVICE),checkRolePermission,spaceController.findAllSpace);
router.route('/device/api/v1/space/count').post(auth(PLATFORM.DEVICE),checkRolePermission,spaceController.getSpaceCount);
router.route('/device/api/v1/space/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,spaceController.softDeleteManySpace);
router.route('/device/api/v1/space/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,spaceController.bulkInsertSpace);
router.route('/device/api/v1/space/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,spaceController.bulkUpdateSpace);
router.route('/device/api/v1/space/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,spaceController.deleteManySpace);
router.route('/device/api/v1/space/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,spaceController.softDeleteSpace);
router.route('/device/api/v1/space/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,spaceController.partialUpdateSpace);
router.route('/device/api/v1/space/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,spaceController.updateSpace);    
router.route('/device/api/v1/space/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,spaceController.getSpace);
router.route('/device/api/v1/space/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,spaceController.deleteSpace);

module.exports = router;
