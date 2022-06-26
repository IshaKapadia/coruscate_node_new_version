/**
 * spaceRoutes.js
 * @description :: CRUD API routes for space
 */

const express = require('express');
const router = express.Router();
const spaceController = require('../../controller/admin/spaceController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/space/create').post(auth(PLATFORM.ADMIN),checkRolePermission,spaceController.addSpace);
router.route('/admin/space/list').post(auth(PLATFORM.ADMIN),checkRolePermission,spaceController.findAllSpace);
router.route('/admin/space/count').post(auth(PLATFORM.ADMIN),checkRolePermission,spaceController.getSpaceCount);
router.route('/admin/space/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,spaceController.softDeleteManySpace);
router.route('/admin/space/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,spaceController.bulkInsertSpace);
router.route('/admin/space/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,spaceController.bulkUpdateSpace);
router.route('/admin/space/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,spaceController.deleteManySpace);
router.route('/admin/space/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,spaceController.softDeleteSpace);
router.route('/admin/space/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,spaceController.partialUpdateSpace);
router.route('/admin/space/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,spaceController.updateSpace);    
router.route('/admin/space/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,spaceController.getSpace);
router.route('/admin/space/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,spaceController.deleteSpace);

module.exports = router;
