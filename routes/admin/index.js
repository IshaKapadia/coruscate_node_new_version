/**
 * index.js
 * @description :: index route file of admin platform.
 */

const express =  require('express');
const router =  express.Router();
router.use('/admin/auth',require('./auth'));
router.use(require('./user_x_meetingRoutes'));
router.use(require('./expertiesRoutes'));
router.use(require('./tieupsRoutes'));
router.use(require('./learnRoutes'));
router.use(require('./bulletinRoutes'));
router.use(require('./user_x_webinarRoutes'));
router.use(require('./meetingRoutes'));
router.use(require('./spaceRoutes'));
router.use(require('./companyRoutes'));
router.use(require('./userRoutes'));
router.use(require('./roleRoutes'));
router.use(require('./projectRouteRoutes'));
router.use(require('./routeRoleRoutes'));
router.use(require('./userRoleRoutes'));

module.exports = router;
