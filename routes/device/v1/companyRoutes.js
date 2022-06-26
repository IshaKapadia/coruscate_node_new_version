/**
 * companyRoutes.js
 * @description :: CRUD API routes for company
 */

const express = require('express');
const router = express.Router();
const companyController = require('../../../controller/device/v1/companyController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/company/create').post(auth(PLATFORM.DEVICE),checkRolePermission,companyController.addCompany);
router.route('/device/api/v1/company/list').post(auth(PLATFORM.DEVICE),checkRolePermission,companyController.findAllCompany);
router.route('/device/api/v1/company/count').post(auth(PLATFORM.DEVICE),checkRolePermission,companyController.getCompanyCount);
router.route('/device/api/v1/company/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,companyController.softDeleteManyCompany);
router.route('/device/api/v1/company/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,companyController.bulkInsertCompany);
router.route('/device/api/v1/company/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,companyController.bulkUpdateCompany);
router.route('/device/api/v1/company/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,companyController.deleteManyCompany);
router.route('/device/api/v1/company/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,companyController.softDeleteCompany);
router.route('/device/api/v1/company/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,companyController.partialUpdateCompany);
router.route('/device/api/v1/company/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,companyController.updateCompany);    
router.route('/device/api/v1/company/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,companyController.getCompany);
router.route('/device/api/v1/company/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,companyController.deleteCompany);

module.exports = router;
