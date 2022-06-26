/**
 * deleteDependent.js
 * @description :: exports deleteDependent service for project.
 */

let User_x_meeting = require('../model/user_x_meeting');
let Experties = require('../model/experties');
let Tieups = require('../model/tieups');
let Learn = require('../model/learn');
let Bulletin = require('../model/bulletin');
let User_x_webinar = require('../model/user_x_webinar');
let Meeting = require('../model/meeting');
let Space = require('../model/space');
let Company = require('../model/company');
let User = require('../model/user');
let UserTokens = require('../model/userTokens');
let Role = require('../model/role');
let ProjectRoute = require('../model/projectRoute');
let RouteRole = require('../model/routeRole');
let UserRole = require('../model/userRole');
let dbService = require('.//dbService');

const deleteUser_x_meeting = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(User_x_meeting,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteExperties = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Experties,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteTieups = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Tieups,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteLearn = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Learn,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteBulletin = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Bulletin,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUser_x_webinar = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(User_x_webinar,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteMeeting = async (filter) =>{
  try {
    let meeting = await dbService.findMany(Meeting,filter);
    if (meeting && meeting.length){
      meeting = meeting.map((obj) => obj.id);

      const user_x_meetingFilter = { $or: [{ meeting_id : { $in : meeting } }] };
      const user_x_meetingCnt = await dbService.deleteMany(User_x_meeting,user_x_meetingFilter);

      let deleted  = await dbService.deleteMany(Meeting,filter);
      let response = { user_x_meeting :user_x_meetingCnt, };
      return response; 
    } else {
      return {  meeting : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteSpace = async (filter) =>{
  try {
    let space = await dbService.findMany(Space,filter);
    if (space && space.length){
      space = space.map((obj) => obj.id);

      const meetingFilter = { $or: [{ space_id : { $in : space } }] };
      const meetingCnt = await dbService.deleteMany(Meeting,meetingFilter);

      let deleted  = await dbService.deleteMany(Space,filter);
      let response = { meeting :meetingCnt, };
      return response; 
    } else {
      return {  space : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteCompany = async (filter) =>{
  try {
    let company = await dbService.findMany(Company,filter);
    if (company && company.length){
      company = company.map((obj) => obj.id);

      const userFilter = { $or: [{ user_company : { $in : company } }] };
      const userCnt = await dbService.deleteMany(User,userFilter);

      let deleted  = await dbService.deleteMany(Company,filter);
      let response = { user :userCnt, };
      return response; 
    } else {
      return {  company : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUser = async (filter) =>{
  try {
    let user = await dbService.findMany(User,filter);
    if (user && user.length){
      user = user.map((obj) => obj.id);

      const user_x_meetingFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } },{ user_id : { $in : user } }] };
      const user_x_meetingCnt = await dbService.deleteMany(User_x_meeting,user_x_meetingFilter);

      const expertiesFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } },{ user_id : { $in : user } }] };
      const expertiesCnt = await dbService.deleteMany(Experties,expertiesFilter);

      const tieupsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const tieupsCnt = await dbService.deleteMany(Tieups,tieupsFilter);

      const learnFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } },{ user_id : { $in : user } }] };
      const learnCnt = await dbService.deleteMany(Learn,learnFilter);

      const bulletinFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } },{ user_id : { $in : user } }] };
      const bulletinCnt = await dbService.deleteMany(Bulletin,bulletinFilter);

      const user_x_webinarFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } },{ user_id : { $in : user } }] };
      const user_x_webinarCnt = await dbService.deleteMany(User_x_webinar,user_x_webinarFilter);

      const meetingFilter = { $or: [{ user_id : { $in : user } }] };
      const meetingCnt = await dbService.deleteMany(Meeting,meetingFilter);

      const userTokensFilter = { $or: [{ userId : { $in : user } },{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userTokensCnt = await dbService.deleteMany(UserTokens,userTokensFilter);

      const roleFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const roleCnt = await dbService.deleteMany(Role,roleFilter);

      const projectRouteFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const projectRouteCnt = await dbService.deleteMany(ProjectRoute,projectRouteFilter);

      const routeRoleFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const routeRoleCnt = await dbService.deleteMany(RouteRole,routeRoleFilter);

      const userRoleFilter = { $or: [{ userId : { $in : user } },{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userRoleCnt = await dbService.deleteMany(UserRole,userRoleFilter);

      let deleted  = await dbService.deleteMany(User,filter);
      let response = {
        user_x_meeting :user_x_meetingCnt,
        experties :expertiesCnt,
        tieups :tieupsCnt,
        learn :learnCnt,
        bulletin :bulletinCnt,
        user_x_webinar :user_x_webinarCnt,
        meeting :meetingCnt,
        userTokens :userTokensCnt,
        role :roleCnt,
        projectRoute :projectRouteCnt,
        routeRole :routeRoleCnt,
        userRole :userRoleCnt,
      };
      return response; 
    } else {
      return {  user : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUserTokens = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(UserTokens,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteRole = async (filter) =>{
  try {
    let role = await dbService.findMany(Role,filter);
    if (role && role.length){
      role = role.map((obj) => obj.id);

      const routeRoleFilter = { $or: [{ roleId : { $in : role } }] };
      const routeRoleCnt = await dbService.deleteMany(RouteRole,routeRoleFilter);

      const userRoleFilter = { $or: [{ roleId : { $in : role } }] };
      const userRoleCnt = await dbService.deleteMany(UserRole,userRoleFilter);

      let deleted  = await dbService.deleteMany(Role,filter);
      let response = {
        routeRole :routeRoleCnt,
        userRole :userRoleCnt,
      };
      return response; 
    } else {
      return {  role : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteProjectRoute = async (filter) =>{
  try {
    let projectroute = await dbService.findMany(ProjectRoute,filter);
    if (projectroute && projectroute.length){
      projectroute = projectroute.map((obj) => obj.id);

      const routeRoleFilter = { $or: [{ routeId : { $in : projectroute } }] };
      const routeRoleCnt = await dbService.deleteMany(RouteRole,routeRoleFilter);

      let deleted  = await dbService.deleteMany(ProjectRoute,filter);
      let response = { routeRole :routeRoleCnt, };
      return response; 
    } else {
      return {  projectroute : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteRouteRole = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(RouteRole,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUserRole = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(UserRole,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const countUser_x_meeting = async (filter) =>{
  try {
    const user_x_meetingCnt =  await dbService.count(User_x_meeting,filter);
    return { user_x_meeting : user_x_meetingCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countExperties = async (filter) =>{
  try {
    const expertiesCnt =  await dbService.count(Experties,filter);
    return { experties : expertiesCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countTieups = async (filter) =>{
  try {
    const tieupsCnt =  await dbService.count(Tieups,filter);
    return { tieups : tieupsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countLearn = async (filter) =>{
  try {
    const learnCnt =  await dbService.count(Learn,filter);
    return { learn : learnCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countBulletin = async (filter) =>{
  try {
    const bulletinCnt =  await dbService.count(Bulletin,filter);
    return { bulletin : bulletinCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countUser_x_webinar = async (filter) =>{
  try {
    const user_x_webinarCnt =  await dbService.count(User_x_webinar,filter);
    return { user_x_webinar : user_x_webinarCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countMeeting = async (filter) =>{
  try {
    let meeting = await dbService.findMany(Meeting,filter);
    if (meeting && meeting.length){
      meeting = meeting.map((obj) => obj.id);

      const user_x_meetingFilter = { $or: [{ meeting_id : { $in : meeting } }] };
      const user_x_meetingCnt =  await dbService.count(User_x_meeting,user_x_meetingFilter);

      let response = { user_x_meeting : user_x_meetingCnt, };
      return response; 
    } else {
      return {  meeting : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countSpace = async (filter) =>{
  try {
    let space = await dbService.findMany(Space,filter);
    if (space && space.length){
      space = space.map((obj) => obj.id);

      const meetingFilter = { $or: [{ space_id : { $in : space } }] };
      const meetingCnt =  await dbService.count(Meeting,meetingFilter);

      let response = { meeting : meetingCnt, };
      return response; 
    } else {
      return {  space : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countCompany = async (filter) =>{
  try {
    let company = await dbService.findMany(Company,filter);
    if (company && company.length){
      company = company.map((obj) => obj.id);

      const userFilter = { $or: [{ user_company : { $in : company } }] };
      const userCnt =  await dbService.count(User,userFilter);

      let response = { user : userCnt, };
      return response; 
    } else {
      return {  company : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countUser = async (filter) =>{
  try {
    let user = await dbService.findMany(User,filter);
    if (user && user.length){
      user = user.map((obj) => obj.id);

      const user_x_meetingFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } },{ user_id : { $in : user } }] };
      const user_x_meetingCnt =  await dbService.count(User_x_meeting,user_x_meetingFilter);

      const expertiesFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } },{ user_id : { $in : user } }] };
      const expertiesCnt =  await dbService.count(Experties,expertiesFilter);

      const tieupsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const tieupsCnt =  await dbService.count(Tieups,tieupsFilter);

      const learnFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } },{ user_id : { $in : user } }] };
      const learnCnt =  await dbService.count(Learn,learnFilter);

      const bulletinFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } },{ user_id : { $in : user } }] };
      const bulletinCnt =  await dbService.count(Bulletin,bulletinFilter);

      const user_x_webinarFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } },{ user_id : { $in : user } }] };
      const user_x_webinarCnt =  await dbService.count(User_x_webinar,user_x_webinarFilter);

      const meetingFilter = { $or: [{ user_id : { $in : user } }] };
      const meetingCnt =  await dbService.count(Meeting,meetingFilter);

      const userTokensFilter = { $or: [{ userId : { $in : user } },{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userTokensCnt =  await dbService.count(UserTokens,userTokensFilter);

      const roleFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const roleCnt =  await dbService.count(Role,roleFilter);

      const projectRouteFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const projectRouteCnt =  await dbService.count(ProjectRoute,projectRouteFilter);

      const routeRoleFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const routeRoleCnt =  await dbService.count(RouteRole,routeRoleFilter);

      const userRoleFilter = { $or: [{ userId : { $in : user } },{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userRoleCnt =  await dbService.count(UserRole,userRoleFilter);

      let response = {
        user_x_meeting : user_x_meetingCnt,
        experties : expertiesCnt,
        tieups : tieupsCnt,
        learn : learnCnt,
        bulletin : bulletinCnt,
        user_x_webinar : user_x_webinarCnt,
        meeting : meetingCnt,
        userTokens : userTokensCnt,
        role : roleCnt,
        projectRoute : projectRouteCnt,
        routeRole : routeRoleCnt,
        userRole : userRoleCnt,
      };
      return response; 
    } else {
      return {  user : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countUserTokens = async (filter) =>{
  try {
    const userTokensCnt =  await dbService.count(UserTokens,filter);
    return { userTokens : userTokensCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countRole = async (filter) =>{
  try {
    let role = await dbService.findMany(Role,filter);
    if (role && role.length){
      role = role.map((obj) => obj.id);

      const routeRoleFilter = { $or: [{ roleId : { $in : role } }] };
      const routeRoleCnt =  await dbService.count(RouteRole,routeRoleFilter);

      const userRoleFilter = { $or: [{ roleId : { $in : role } }] };
      const userRoleCnt =  await dbService.count(UserRole,userRoleFilter);

      let response = {
        routeRole : routeRoleCnt,
        userRole : userRoleCnt,
      };
      return response; 
    } else {
      return {  role : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countProjectRoute = async (filter) =>{
  try {
    let projectroute = await dbService.findMany(ProjectRoute,filter);
    if (projectroute && projectroute.length){
      projectroute = projectroute.map((obj) => obj.id);

      const routeRoleFilter = { $or: [{ routeId : { $in : projectroute } }] };
      const routeRoleCnt =  await dbService.count(RouteRole,routeRoleFilter);

      let response = { routeRole : routeRoleCnt, };
      return response; 
    } else {
      return {  projectroute : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countRouteRole = async (filter) =>{
  try {
    const routeRoleCnt =  await dbService.count(RouteRole,filter);
    return { routeRole : routeRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countUserRole = async (filter) =>{
  try {
    const userRoleCnt =  await dbService.count(UserRole,filter);
    return { userRole : userRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUser_x_meeting = async (filter,updateBody) =>{  
  try {
    const user_x_meetingCnt =  await dbService.updateMany(User_x_meeting,filter);
    return { user_x_meeting : user_x_meetingCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteExperties = async (filter,updateBody) =>{  
  try {
    const expertiesCnt =  await dbService.updateMany(Experties,filter);
    return { experties : expertiesCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteTieups = async (filter,updateBody) =>{  
  try {
    const tieupsCnt =  await dbService.updateMany(Tieups,filter);
    return { tieups : tieupsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteLearn = async (filter,updateBody) =>{  
  try {
    const learnCnt =  await dbService.updateMany(Learn,filter);
    return { learn : learnCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteBulletin = async (filter,updateBody) =>{  
  try {
    const bulletinCnt =  await dbService.updateMany(Bulletin,filter);
    return { bulletin : bulletinCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUser_x_webinar = async (filter,updateBody) =>{  
  try {
    const user_x_webinarCnt =  await dbService.updateMany(User_x_webinar,filter);
    return { user_x_webinar : user_x_webinarCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteMeeting = async (filter,updateBody) =>{  
  try {
    let meeting = await dbService.findMany(Meeting,filter, { id:1 });
    if (meeting.length){
      meeting = meeting.map((obj) => obj.id);

      const user_x_meetingFilter = { '$or': [{ meeting_id : { '$in' : meeting } }] };
      const user_x_meetingCnt = await dbService.updateMany(User_x_meeting,user_x_meetingFilter,updateBody);
      let updated = await dbService.updateMany(Meeting,filter,updateBody);

      let response = { user_x_meeting :user_x_meetingCnt, };
      return response;
    } else {
      return {  meeting : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteSpace = async (filter,updateBody) =>{  
  try {
    let space = await dbService.findMany(Space,filter, { id:1 });
    if (space.length){
      space = space.map((obj) => obj.id);

      const meetingFilter = { '$or': [{ space_id : { '$in' : space } }] };
      const meetingCnt = await dbService.updateMany(Meeting,meetingFilter,updateBody);
      let updated = await dbService.updateMany(Space,filter,updateBody);

      let response = { meeting :meetingCnt, };
      return response;
    } else {
      return {  space : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteCompany = async (filter,updateBody) =>{  
  try {
    let company = await dbService.findMany(Company,filter, { id:1 });
    if (company.length){
      company = company.map((obj) => obj.id);

      const userFilter = { '$or': [{ user_company : { '$in' : company } }] };
      const userCnt = await dbService.updateMany(User,userFilter,updateBody);
      let updated = await dbService.updateMany(Company,filter,updateBody);

      let response = { user :userCnt, };
      return response;
    } else {
      return {  company : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUser = async (filter,updateBody) =>{  
  try {
    let user = await dbService.findMany(User,filter, { id:1 });
    if (user.length){
      user = user.map((obj) => obj.id);

      const user_x_meetingFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } },{ user_id : { '$in' : user } }] };
      const user_x_meetingCnt = await dbService.updateMany(User_x_meeting,user_x_meetingFilter,updateBody);

      const expertiesFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } },{ user_id : { '$in' : user } }] };
      const expertiesCnt = await dbService.updateMany(Experties,expertiesFilter,updateBody);

      const tieupsFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const tieupsCnt = await dbService.updateMany(Tieups,tieupsFilter,updateBody);

      const learnFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } },{ user_id : { '$in' : user } }] };
      const learnCnt = await dbService.updateMany(Learn,learnFilter,updateBody);

      const bulletinFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } },{ user_id : { '$in' : user } }] };
      const bulletinCnt = await dbService.updateMany(Bulletin,bulletinFilter,updateBody);

      const user_x_webinarFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } },{ user_id : { '$in' : user } }] };
      const user_x_webinarCnt = await dbService.updateMany(User_x_webinar,user_x_webinarFilter,updateBody);

      const meetingFilter = { '$or': [{ user_id : { '$in' : user } }] };
      const meetingCnt = await dbService.updateMany(Meeting,meetingFilter,updateBody);

      const userTokensFilter = { '$or': [{ userId : { '$in' : user } },{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const userTokensCnt = await dbService.updateMany(UserTokens,userTokensFilter,updateBody);

      const roleFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const roleCnt = await dbService.updateMany(Role,roleFilter,updateBody);

      const projectRouteFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const projectRouteCnt = await dbService.updateMany(ProjectRoute,projectRouteFilter,updateBody);

      const routeRoleFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const routeRoleCnt = await dbService.updateMany(RouteRole,routeRoleFilter,updateBody);

      const userRoleFilter = { '$or': [{ userId : { '$in' : user } },{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const userRoleCnt = await dbService.updateMany(UserRole,userRoleFilter,updateBody);
      let updated = await dbService.updateMany(User,filter,updateBody);

      let response = {
        user_x_meeting :user_x_meetingCnt,
        experties :expertiesCnt,
        tieups :tieupsCnt,
        learn :learnCnt,
        bulletin :bulletinCnt,
        user_x_webinar :user_x_webinarCnt,
        meeting :meetingCnt,
        userTokens :userTokensCnt,
        role :roleCnt,
        projectRoute :projectRouteCnt,
        routeRole :routeRoleCnt,
        userRole :userRoleCnt,
      };
      return response;
    } else {
      return {  user : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUserTokens = async (filter,updateBody) =>{  
  try {
    const userTokensCnt =  await dbService.updateMany(UserTokens,filter);
    return { userTokens : userTokensCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteRole = async (filter,updateBody) =>{  
  try {
    let role = await dbService.findMany(Role,filter, { id:1 });
    if (role.length){
      role = role.map((obj) => obj.id);

      const routeRoleFilter = { '$or': [{ roleId : { '$in' : role } }] };
      const routeRoleCnt = await dbService.updateMany(RouteRole,routeRoleFilter,updateBody);

      const userRoleFilter = { '$or': [{ roleId : { '$in' : role } }] };
      const userRoleCnt = await dbService.updateMany(UserRole,userRoleFilter,updateBody);
      let updated = await dbService.updateMany(Role,filter,updateBody);

      let response = {
        routeRole :routeRoleCnt,
        userRole :userRoleCnt,
      };
      return response;
    } else {
      return {  role : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteProjectRoute = async (filter,updateBody) =>{  
  try {
    let projectroute = await dbService.findMany(ProjectRoute,filter, { id:1 });
    if (projectroute.length){
      projectroute = projectroute.map((obj) => obj.id);

      const routeRoleFilter = { '$or': [{ routeId : { '$in' : projectroute } }] };
      const routeRoleCnt = await dbService.updateMany(RouteRole,routeRoleFilter,updateBody);
      let updated = await dbService.updateMany(ProjectRoute,filter,updateBody);

      let response = { routeRole :routeRoleCnt, };
      return response;
    } else {
      return {  projectroute : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteRouteRole = async (filter,updateBody) =>{  
  try {
    const routeRoleCnt =  await dbService.updateMany(RouteRole,filter);
    return { routeRole : routeRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUserRole = async (filter,updateBody) =>{  
  try {
    const userRoleCnt =  await dbService.updateMany(UserRole,filter);
    return { userRole : userRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

module.exports = {
  deleteUser_x_meeting,
  deleteExperties,
  deleteTieups,
  deleteLearn,
  deleteBulletin,
  deleteUser_x_webinar,
  deleteMeeting,
  deleteSpace,
  deleteCompany,
  deleteUser,
  deleteUserTokens,
  deleteRole,
  deleteProjectRoute,
  deleteRouteRole,
  deleteUserRole,
  countUser_x_meeting,
  countExperties,
  countTieups,
  countLearn,
  countBulletin,
  countUser_x_webinar,
  countMeeting,
  countSpace,
  countCompany,
  countUser,
  countUserTokens,
  countRole,
  countProjectRoute,
  countRouteRole,
  countUserRole,
  softDeleteUser_x_meeting,
  softDeleteExperties,
  softDeleteTieups,
  softDeleteLearn,
  softDeleteBulletin,
  softDeleteUser_x_webinar,
  softDeleteMeeting,
  softDeleteSpace,
  softDeleteCompany,
  softDeleteUser,
  softDeleteUserTokens,
  softDeleteRole,
  softDeleteProjectRoute,
  softDeleteRouteRole,
  softDeleteUserRole,
};
