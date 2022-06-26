/**
 * seeder.js
 * @description :: functions that seeds mock data to run the application
 */

const bcrypt = require('bcrypt');
const User = require('../model/user');
const authConstant = require('../constants/authConstant');
const Role = require('../model/role');
const ProjectRoute = require('../model/projectRoute');
const RouteRole = require('../model/routeRole');
const UserRole = require('../model/userRole');
const { replaceAll } = require('../utils/common');
const dbService = require('../utils/dbService');

/* seeds default users */
async function seedUser () {
  try {
    let userToBeInserted = {};
    userToBeInserted = {
      'password':'A1DWkuvmwvCIJQh',
      'isDeleted':false,
      'username':'Giovanna8',
      'email':'Oswald8@hotmail.com',
      'userType':authConstant.USER_TYPES.User
    };
    userToBeInserted.password = await  bcrypt.hash(userToBeInserted.password, 8);
    let user = await dbService.updateOne(User, { 'username':'Giovanna8' }, userToBeInserted,  { upsert: true });
    userToBeInserted = {
      'password':'f1Mxk1u3P5UPxCZ',
      'isDeleted':false,
      'username':'Kendra38',
      'email':'Jedediah.Jast@yahoo.com',
      'userType':authConstant.USER_TYPES.Admin
    };
    userToBeInserted.password = await  bcrypt.hash(userToBeInserted.password, 8);
    let admin = await dbService.updateOne(User, { 'username':'Kendra38' }, userToBeInserted,  { upsert: true });
    console.info('Users seeded 🍺');
  } catch (error){
    console.log('User seeder failed due to ', error.message);
  }
}
/* seeds roles */
async function seedRole () {
  try {
    const roles = [ 'User', 'Admin', 'System_User' ];
    const insertedRoles = await dbService.findMany(Role, { code: { '$in': roles.map(role => role.toUpperCase()) } });
    const rolesToInsert = [];
    roles.forEach(role => {
      if (!insertedRoles.find(insertedRole => insertedRole.code === role.toUpperCase())) {
        rolesToInsert.push({
          name: role,
          code: role.toUpperCase(),
          weight: 1
        });
      }
    });
    if (rolesToInsert.length) {
      const result = await dbService.create(Role, rolesToInsert);
      if (result) console.log('Role seeded 🍺');
      else console.log('Role seeder failed!');
    } else {
      console.log('Role is upto date 🍺');
    }
  } catch (error) {
    console.log('Role seeder failed due to ', error.message);
  }
}

/* seeds routes of project */
async function seedProjectRoutes (routes) {
  try {
    if (routes  && routes.length) {
      let routeName = '';
      const dbRoutes = await dbService.findMany(ProjectRoute, {});
      let routeArr = [];
      let routeObj = {};
      routes.forEach(route => {
        routeName = `${replaceAll((route.path).toLowerCase(), '/', '_')}`;
        route.methods.forEach(method => {
          routeObj = dbRoutes.find(dbRoute => dbRoute.route_name === routeName && dbRoute.method === method);
          if (!routeObj) {
            routeArr.push({
              'uri': route.path.toLowerCase(),
              'method': method,
              'route_name': routeName,
            });
          }
        });
      });
      if (routeArr.length) {
        const result = await dbService.create(ProjectRoute, routeArr);
        if (result) console.info('ProjectRoute model seeded 🍺');
        else console.info('ProjectRoute seeder failed.');
      } else {
        console.info('ProjectRoute is upto date 🍺');
      }
    }
  } catch (error) {
    console.log('ProjectRoute seeder failed due to ', error.message);
  }
}

/* seeds role for routes */
async function seedRouteRole () {
  try {
    const routeRoles = [ 
      {
        route: '/admin/bulletin/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/bulletin/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/bulletin/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/bulletin/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/bulletin/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/bulletin/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/bulletin/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/bulletin/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/bulletin/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/bulletin/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/bulletin/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/bulletin/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/bulletin/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/bulletin/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/bulletin/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/bulletin/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/bulletin/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/bulletin/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/bulletin/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/bulletin/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/bulletin/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/bulletin/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/bulletin/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/bulletin/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/bulletin/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/bulletin/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/bulletin/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/company/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/company/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/company/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/company/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/company/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/company/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/company/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/company/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/company/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/company/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/company/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/company/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/company/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/company/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/company/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/company/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/company/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/company/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/company/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/company/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/company/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/company/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/company/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/company/delete/:id',
        role: 'Admin',
        method: 'DELETE' 
      },
      {
        route: '/admin/company/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/company/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/company/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/experties/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/experties/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/experties/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/experties/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/experties/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/experties/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/experties/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/experties/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/experties/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/experties/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/experties/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/experties/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/experties/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/experties/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/experties/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/experties/update/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/experties/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/experties/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/experties/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/experties/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/experties/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/experties/updatebulk',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/experties/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/experties/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/experties/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/experties/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/experties/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/experties/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/experties/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/experties/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/experties/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/admin/experties/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/experties/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/experties/deletemany',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/experties/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/experties/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/learn/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/learn/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/learn/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/learn/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/learn/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/learn/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/learn/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/learn/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/learn/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/learn/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/learn/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/learn/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/learn/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/learn/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/learn/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/learn/update/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/learn/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/learn/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/learn/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/learn/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/learn/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/learn/updatebulk',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/learn/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/learn/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/learn/softdelete/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/learn/softdelete/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/learn/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/learn/softdeletemany',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/learn/softdeletemany',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/learn/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/learn/delete/:id',
        role: 'User',
        method: 'DELETE' 
      },
      {
        route: '/admin/learn/delete/:id',
        role: 'Admin',
        method: 'DELETE' 
      },
      {
        route: '/admin/learn/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/learn/deletemany',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/learn/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/learn/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/meeting/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/meeting/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/meeting/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/meeting/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/meeting/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/meeting/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/meeting/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/meeting/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/meeting/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/meeting/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/meeting/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/meeting/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/meeting/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/meeting/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/meeting/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/meeting/update/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/meeting/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/meeting/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/meeting/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/meeting/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/meeting/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/meeting/updatebulk',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/meeting/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/meeting/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/meeting/softdelete/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/meeting/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/meeting/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/meeting/softdeletemany',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/meeting/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/meeting/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/meeting/delete/:id',
        role: 'User',
        method: 'DELETE' 
      },
      {
        route: '/admin/meeting/delete/:id',
        role: 'Admin',
        method: 'DELETE' 
      },
      {
        route: '/admin/meeting/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/meeting/deletemany',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/meeting/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/meeting/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/space/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/space/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/space/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/space/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/space/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/space/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/space/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/space/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/space/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/space/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/space/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/space/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/space/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/space/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/space/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/space/update/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/space/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/space/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/space/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/space/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/space/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/space/updatebulk',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/space/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/space/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/space/softdelete/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/space/softdelete/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/space/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/space/softdeletemany',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/space/softdeletemany',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/space/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/space/delete/:id',
        role: 'User',
        method: 'DELETE' 
      },
      {
        route: '/admin/space/delete/:id',
        role: 'Admin',
        method: 'DELETE' 
      },
      {
        route: '/admin/space/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/space/deletemany',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/space/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/space/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/tieups/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/tieups/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/tieups/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/tieups/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/tieups/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/tieups/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/tieups/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/tieups/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/tieups/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/tieups/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/tieups/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/tieups/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/tieups/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/tieups/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/tieups/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/tieups/update/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/tieups/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/tieups/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/tieups/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/tieups/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/tieups/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/tieups/updatebulk',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/tieups/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/tieups/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/tieups/softdelete/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/tieups/softdelete/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/tieups/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/tieups/softdeletemany',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/tieups/softdeletemany',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/tieups/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/tieups/delete/:id',
        role: 'User',
        method: 'DELETE' 
      },
      {
        route: '/admin/tieups/delete/:id',
        role: 'Admin',
        method: 'DELETE' 
      },
      {
        route: '/admin/tieups/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/tieups/deletemany',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/tieups/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/tieups/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/user/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/user/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/user/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/user/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/user/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/user/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/user/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/user/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/user/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/user/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/user/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/user/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/user/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/user/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/user/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/user/update/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/user/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/user/update/:id',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/user/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/user/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/user/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/user/updatebulk',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/user/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/user/updatebulk',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/user/softdelete/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/user/softdelete/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/user/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/user/softdeletemany',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/user/softdeletemany',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/user/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/user/delete/:id',
        role: 'User',
        method: 'DELETE' 
      },
      {
        route: '/admin/user/delete/:id',
        role: 'Admin',
        method: 'DELETE' 
      },
      {
        route: '/admin/user/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/user/deletemany',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/user/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/user/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/user_x_webinar/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/user_x_webinar/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/user_x_webinar/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/user_x_webinar/addbulk',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/admin/user_x_webinar/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/user_x_webinar/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/user_x_webinar/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/user_x_webinar/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/user_x_webinar/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/user_x_webinar/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/user_x_webinar/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/user_x_webinar/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/user_x_webinar/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/user_x_webinar/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/user_x_webinar/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/user_x_webinar/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/user_x_webinar/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/user_x_webinar/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/user_x_webinar/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/user_x_webinar/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/user_x_webinar/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/user_x_webinar/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/user_x_webinar/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/user_x_webinar/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/user_x_webinar/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/user_x_webinar/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/user_x_webinar/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/user_x_webinar/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/user_x_webinar/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/user_x_webinar/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/user_x_webinar/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/admin/user_x_webinar/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/user_x_webinar/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/user_x_webinar/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/admin/user_x_webinar/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/user_x_webinar/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/user_x_meeting/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/user_x_meeting/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/user_x_meeting/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/user_x_meeting/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/user_x_meeting/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/user_x_meeting/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/user_x_meeting/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/user_x_meeting/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/user_x_meeting/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/user_x_meeting/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/user_x_meeting/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/user_x_meeting/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/usertokens/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/usertokens/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/role/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/role/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/role/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/role/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/role/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/role/update/:id',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/role/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/role/updatebulk',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/role/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/role/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/role/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/role/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/projectroute/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/projectroute/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/routerole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/routerole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/routerole/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/routerole/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/routerole/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/routerole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/routerole/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userrole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userrole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userrole/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/userrole/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/userrole/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/userrole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/userrole/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/bulletin/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/bulletin/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/bulletin/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/bulletin/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/bulletin/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/bulletin/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/bulletin/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/bulletin/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/bulletin/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/bulletin/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/bulletin/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/bulletin/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/bulletin/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/bulletin/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/bulletin/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/bulletin/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/bulletin/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/bulletin/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/bulletin/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/bulletin/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/bulletin/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/bulletin/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/bulletin/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/bulletin/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/bulletin/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/bulletin/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/bulletin/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/company/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/company/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/company/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/company/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/company/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/company/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/company/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/company/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/company/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/company/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/company/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/company/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/company/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/company/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/company/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/company/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/company/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/company/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/company/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/company/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/company/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/company/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/company/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/company/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/company/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/company/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/company/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/experties/create',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/experties/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/experties/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/experties/addbulk',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/experties/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/experties/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/experties/list',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/experties/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/experties/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/experties/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/experties/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/experties/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/experties/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/experties/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/experties/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/experties/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/experties/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/experties/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/experties/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/experties/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/experties/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/experties/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/experties/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/experties/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/experties/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/experties/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/experties/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/experties/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/experties/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/experties/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/experties/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/experties/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/experties/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/experties/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/experties/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/experties/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/learn/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/learn/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/learn/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/learn/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/learn/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/learn/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/learn/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/learn/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/learn/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/learn/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/learn/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/learn/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/learn/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/learn/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/learn/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/learn/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/learn/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/learn/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/learn/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/learn/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/learn/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/learn/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/learn/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/learn/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/learn/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/learn/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/learn/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/learn/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/learn/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/learn/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/learn/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/learn/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/learn/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/learn/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/learn/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/learn/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/meeting/create',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/meeting/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/meeting/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/meeting/addbulk',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/meeting/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/meeting/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/meeting/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/meeting/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/meeting/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/meeting/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/meeting/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/meeting/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/meeting/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/meeting/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/meeting/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/meeting/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/meeting/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/meeting/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/meeting/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/meeting/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/meeting/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/meeting/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/meeting/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/meeting/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/meeting/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/meeting/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/meeting/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/meeting/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/meeting/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/meeting/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/meeting/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/meeting/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/meeting/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/meeting/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/meeting/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/meeting/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/space/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/space/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/space/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/space/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/space/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/space/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/space/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/space/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/space/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/space/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/space/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/space/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/space/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/space/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/space/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/space/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/space/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/space/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/space/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/space/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/space/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/space/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/space/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/space/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/space/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/space/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/space/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/space/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/space/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/space/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/space/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/space/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/space/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/space/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/space/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/space/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/tieups/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/tieups/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/tieups/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/tieups/addbulk',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/tieups/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/tieups/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/tieups/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/tieups/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/tieups/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/tieups/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/tieups/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/tieups/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/tieups/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/tieups/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/tieups/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/tieups/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/tieups/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/tieups/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/tieups/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/tieups/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/tieups/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/tieups/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/tieups/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/tieups/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/tieups/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/tieups/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/tieups/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/tieups/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/tieups/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/tieups/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/tieups/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/tieups/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/tieups/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/tieups/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/tieups/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/tieups/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/user/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/user/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/user/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/user/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/user/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/user/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user_x_webinar/create',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user_x_webinar/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user_x_webinar/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user_x_webinar/addbulk',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user_x_webinar/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user_x_webinar/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user_x_webinar/list',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user_x_webinar/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user_x_webinar/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user_x_webinar/:id',
        role: 'User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/user_x_webinar/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/user_x_webinar/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/user_x_webinar/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user_x_webinar/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user_x_webinar/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user_x_webinar/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user_x_webinar/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user_x_webinar/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user_x_webinar/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user_x_webinar/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user_x_webinar/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user_x_webinar/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user_x_webinar/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user_x_webinar/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user_x_webinar/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user_x_webinar/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user_x_webinar/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user_x_webinar/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user_x_webinar/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user_x_webinar/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user_x_webinar/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/user_x_webinar/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/user_x_webinar/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/user_x_webinar/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user_x_webinar/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user_x_webinar/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user_x_meeting/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user_x_meeting/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user_x_meeting/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user_x_meeting/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/user_x_meeting/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user_x_meeting/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user_x_meeting/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user_x_meeting/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user_x_meeting/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user_x_meeting/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user_x_meeting/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/user_x_meeting/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/usertokens/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/usertokens/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/usertokens/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/usertokens/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/usertokens/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/usertokens/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/usertokens/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/usertokens/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/usertokens/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/usertokens/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/usertokens/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/usertokens/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/role/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/role/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/role/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/role/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/role/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/role/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/role/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/role/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/role/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/role/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/role/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/role/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/projectroute/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/projectroute/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/projectroute/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/projectroute/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/projectroute/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/projectroute/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/projectroute/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/projectroute/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/projectroute/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/projectroute/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/projectroute/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/projectroute/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/routerole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/routerole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/routerole/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/routerole/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/routerole/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/routerole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/routerole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/routerole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/routerole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/routerole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/routerole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/routerole/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userrole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userrole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userrole/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userrole/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/userrole/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userrole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userrole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userrole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userrole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userrole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userrole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/userrole/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/meeting/getmeetingbyspace',
        role: 'System_User',
        method: 'GET'
      },

    ];
    if (routeRoles && routeRoles.length) {
      const routes = [...new Set(routeRoles.map(routeRole => routeRole.route.toLowerCase()))];
      const routeMethods = [...new Set(routeRoles.map(routeRole => routeRole.method))];
      const roles = [ 'User', 'Admin', 'System_User' ];
      const insertedProjectRoute = await dbService.findMany(ProjectRoute, {
        uri: { '$in': routes },
        method: { '$in': routeMethods },
        'isActive': true,
        'isDeleted': false
      });
      const insertedRoles = await dbService.findMany(Role, {
        code: { '$in': roles.map(role => role.toUpperCase()) },
        'isActive': true,
        'isDeleted': false
      });
      let projectRouteId = '';
      let roleId = '';
      let createRouteRoles = routeRoles.map(routeRole => {
        projectRouteId = insertedProjectRoute.find(pr => pr.uri === routeRole.route.toLowerCase() && pr.method === routeRole.method);
        roleId = insertedRoles.find(r => r.code === routeRole.role.toUpperCase());
        if (projectRouteId && roleId) {
          return {
            roleId: roleId.id,
            routeId: projectRouteId.id
          };
        }
      });
      createRouteRoles = createRouteRoles.filter(Boolean);
      const routeRolesToBeInserted = [];
      let routeRoleObj = {};

      await Promise.all(
        createRouteRoles.map(async routeRole => {
          routeRoleObj = await dbService.findOne(RouteRole, {
            routeId: routeRole.routeId,
            roleId: routeRole.roleId,
          });
          if (!routeRoleObj) {
            routeRolesToBeInserted.push({
              routeId: routeRole.routeId,
              roleId: routeRole.roleId,
            });
          }
        })
      );
      if (routeRolesToBeInserted.length) {
        const result = await dbService.create(RouteRole, routeRolesToBeInserted);
        if (result) console.log('RouteRole seeded 🍺');
        else console.log('RouteRole seeder failed!');
      } else {
        console.log('RouteRole is upto date 🍺');
      }
    }
  } catch (error){
    console.log('RouteRole seeder failed due to ', error.message);
  }
}

/* seeds roles for users */
async function seedUserRole (){
  try {
    const userRoles = [{
      'username':'Giovanna8',
      'password':'A1DWkuvmwvCIJQh'
    },{
      'username':'Kendra38',
      'password':'f1Mxk1u3P5UPxCZ'
    }];
    const defaultRole = await dbService.findOne(Role, { code: 'SYSTEM_USER' });
    const insertedUsers = await dbService.findMany(User, { username: { '$in': userRoles.map(userRole => userRole.username) } });
    let user = {};
    const userRolesArr = [];
    userRoles.map(userRole => {
      user = insertedUsers.find(user => user.username === userRole.username && user.isPasswordMatch(userRole.password) && user.isActive && !user.isDeleted);
      if (user) {
        userRolesArr.push({
          userId: user.id,
          roleId: defaultRole.id
        });
      }
    });
    let userRoleObj = {};
    const userRolesToBeInserted = [];
    if (userRolesArr.length) {
      await Promise.all(
        userRolesArr.map(async userRole => {
          userRoleObj = await dbService.findOne(UserRole, {
            userId: userRole.userId,
            roleId: userRole.roleId
          });
          if (!userRoleObj) {
            userRolesToBeInserted.push({
              userId: userRole.userId,
              roleId: userRole.roleId
            });
          }
        })
      );
      if (userRolesToBeInserted.length) {
        const result = await dbService.create(UserRole, userRolesToBeInserted);
        if (result) console.log('UserRole seeded 🍺');
        else console.log('UserRole seeder failed');
      } else {
        console.log('UserRole is upto date 🍺');
      }
    }
  } catch (error) {
    console.log('UserRole seeder failed due to ', error.message);
  }
}

async function seedData (allRegisterRoutes){
  await seedUser();
  await seedRole();
  await seedProjectRoutes(allRegisterRoutes);
  await seedRouteRole();
  await seedUserRole();

};
module.exports = seedData;