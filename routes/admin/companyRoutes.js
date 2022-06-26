/**
 * companyRoutes.js
 * @description :: CRUD API routes for company
 */

const express = require('express');
const router = express.Router();
const companyController = require('../../controller/admin/companyController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/company/create').post(auth(PLATFORM.ADMIN),checkRolePermission,companyController.addCompany);
router.route('/admin/company/list').post(auth(PLATFORM.ADMIN),checkRolePermission,companyController.findAllCompany);
router.route('/admin/company/count').post(auth(PLATFORM.ADMIN),checkRolePermission,companyController.getCompanyCount);
router.route('/admin/company/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,companyController.softDeleteManyCompany);
router.route('/admin/company/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,companyController.bulkInsertCompany);
router.route('/admin/company/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,companyController.bulkUpdateCompany);
router.route('/admin/company/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,companyController.deleteManyCompany);
router.route('/admin/company/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,companyController.softDeleteCompany);
router.route('/admin/company/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,companyController.partialUpdateCompany);
router.route('/admin/company/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,companyController.updateCompany);    
router.route('/admin/company/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,companyController.getCompany);
router.route('/admin/company/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,companyController.deleteCompany);

module.exports = router;
