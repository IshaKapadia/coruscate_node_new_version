/**
 * user_x_meetingController.js
 * @description : exports action methods for user_x_meeting.
 */

const User_x_meeting = require('../../../model/user_x_meeting');
const user_x_meetingSchemaKey = require('../../../utils/validation/user_x_meetingValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../../utils/common');
   
/**
 * @description : create document of User_x_meeting in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created User_x_meeting. {status, message, data}
 */ 
const addUser_x_meeting = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      user_x_meetingSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new User_x_meeting(dataToCreate);
    let createdUser_x_meeting = await dbService.create(User_x_meeting,dataToCreate);
    return res.success({ data : createdUser_x_meeting });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of User_x_meeting in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created User_x_meetings. {status, message, data}
 */
const bulkInsertUser_x_meeting = async (req,res)=>{
  try {
    if (req.body && (!Array.isArray(req.body.data) || req.body.data.length < 1)) {
      return res.badRequest();
    }
    let dataToCreate = [ ...req.body.data ];
    for (let i = 0;i < dataToCreate.length;i++){
      dataToCreate[i] = {
        ...dataToCreate[i],
        addedBy: req.user.id
      };
    }
    let createdUser_x_meetings = await dbService.create(User_x_meeting,dataToCreate);
    createdUser_x_meetings = { count: createdUser_x_meetings ? createdUser_x_meetings.length : 0 };
    return res.success({ data:{ count:createdUser_x_meetings.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of User_x_meeting from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found User_x_meeting(s). {status, message, data}
 */
const findAllUser_x_meeting = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      user_x_meetingSchemaKey.findFilterKeys,
      User_x_meeting.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(User_x_meeting, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundUser_x_meetings = await dbService.paginate( User_x_meeting,query,options);
    if (!foundUser_x_meetings || !foundUser_x_meetings.data || !foundUser_x_meetings.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundUser_x_meetings });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of User_x_meeting from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found User_x_meeting. {status, message, data}
 */
const getUser_x_meeting = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundUser_x_meeting = await dbService.findOne(User_x_meeting,query, options);
    if (!foundUser_x_meeting){
      return res.recordNotFound();
    }
    return res.success({ data :foundUser_x_meeting });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of User_x_meeting.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getUser_x_meetingCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      user_x_meetingSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedUser_x_meeting = await dbService.count(User_x_meeting,where);
    return res.success({ data : { count: countedUser_x_meeting } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of User_x_meeting with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated User_x_meeting.
 * @return {Object} : updated User_x_meeting. {status, message, data}
 */
const updateUser_x_meeting = async (req,res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      user_x_meetingSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedUser_x_meeting = await dbService.updateOne(User_x_meeting,query,dataToUpdate);
    if (!updatedUser_x_meeting){
      return res.recordNotFound();
    }
    return res.success({ data :updatedUser_x_meeting });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of User_x_meeting with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated User_x_meetings.
 * @return {Object} : updated User_x_meetings. {status, message, data}
 */
const bulkUpdateUser_x_meeting = async (req,res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    delete dataToUpdate['addedBy'];
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = { 
        ...req.body.data,
        updatedBy : req.user.id
      };
    }
    let updatedUser_x_meeting = await dbService.updateMany(User_x_meeting,filter,dataToUpdate);
    if (!updatedUser_x_meeting){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedUser_x_meeting } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of User_x_meeting with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated User_x_meeting.
 * @return {obj} : updated User_x_meeting. {status, message, data}
 */
const partialUpdateUser_x_meeting = async (req,res) => {
  try {
    if (!req.params.id){
      res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    delete req.body['addedBy'];
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      user_x_meetingSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedUser_x_meeting = await dbService.updateOne(User_x_meeting, query, dataToUpdate);
    if (!updatedUser_x_meeting) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedUser_x_meeting });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
/**
 * @description : deactivate document of User_x_meeting from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of User_x_meeting.
 * @return {Object} : deactivated User_x_meeting. {status, message, data}
 */
const softDeleteUser_x_meeting = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedUser_x_meeting = await dbService.updateOne(User_x_meeting, query, updateBody);
    if (!updatedUser_x_meeting){
      return res.recordNotFound();
    }
    return res.success({ data:updatedUser_x_meeting });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

/**
 * @description : delete document of User_x_meeting from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted User_x_meeting. {status, message, data}
 */
const deleteUser_x_meeting = async (req,res) => {
  try { 
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const deletedUser_x_meeting = await dbService.deleteOne(User_x_meeting, query);
    if (!deletedUser_x_meeting){
      return res.recordNotFound();
    }
    return res.success({ data :deletedUser_x_meeting });
        
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : delete documents of User_x_meeting in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyUser_x_meeting = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const deletedUser_x_meeting = await dbService.deleteMany(User_x_meeting,query);
    if (!deletedUser_x_meeting){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :deletedUser_x_meeting } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
/**
 * @description : deactivate multiple documents of User_x_meeting from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of User_x_meeting.
 * @return {Object} : number of deactivated documents of User_x_meeting. {status, message, data}
 */
const softDeleteManyUser_x_meeting = async (req,res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedUser_x_meeting = await dbService.updateMany(User_x_meeting,query, updateBody);
    if (!updatedUser_x_meeting) {
      return res.recordNotFound();
    }
    return res.success({ data:{ count :updatedUser_x_meeting } });
        
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addUser_x_meeting,
  bulkInsertUser_x_meeting,
  findAllUser_x_meeting,
  getUser_x_meeting,
  getUser_x_meetingCount,
  updateUser_x_meeting,
  bulkUpdateUser_x_meeting,
  partialUpdateUser_x_meeting,
  softDeleteUser_x_meeting,
  deleteUser_x_meeting,
  deleteManyUser_x_meeting,
  softDeleteManyUser_x_meeting    
};