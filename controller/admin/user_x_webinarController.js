/**
 * user_x_webinarController.js
 * @description : exports action methods for user_x_webinar.
 */

const User_x_webinar = require('../../model/user_x_webinar');
const user_x_webinarSchemaKey = require('../../utils/validation/user_x_webinarValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../utils/common');
   
/**
 * @description : create document of User_x_webinar in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created User_x_webinar. {status, message, data}
 */ 
const addUser_x_webinar = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      user_x_webinarSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new User_x_webinar(dataToCreate);
    let createdUser_x_webinar = await dbService.create(User_x_webinar,dataToCreate);
    return res.success({ data : createdUser_x_webinar });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of User_x_webinar in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created User_x_webinars. {status, message, data}
 */
const bulkInsertUser_x_webinar = async (req,res)=>{
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
    let createdUser_x_webinars = await dbService.create(User_x_webinar,dataToCreate);
    createdUser_x_webinars = { count: createdUser_x_webinars ? createdUser_x_webinars.length : 0 };
    return res.success({ data:{ count:createdUser_x_webinars.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of User_x_webinar from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found User_x_webinar(s). {status, message, data}
 */
const findAllUser_x_webinar = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      user_x_webinarSchemaKey.findFilterKeys,
      User_x_webinar.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(User_x_webinar, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundUser_x_webinars = await dbService.paginate( User_x_webinar,query,options);
    if (!foundUser_x_webinars || !foundUser_x_webinars.data || !foundUser_x_webinars.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundUser_x_webinars });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of User_x_webinar from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found User_x_webinar. {status, message, data}
 */
const getUser_x_webinar = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundUser_x_webinar = await dbService.findOne(User_x_webinar,query, options);
    if (!foundUser_x_webinar){
      return res.recordNotFound();
    }
    return res.success({ data :foundUser_x_webinar });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of User_x_webinar.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getUser_x_webinarCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      user_x_webinarSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedUser_x_webinar = await dbService.count(User_x_webinar,where);
    return res.success({ data : { count: countedUser_x_webinar } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of User_x_webinar with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated User_x_webinar.
 * @return {Object} : updated User_x_webinar. {status, message, data}
 */
const updateUser_x_webinar = async (req,res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      user_x_webinarSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedUser_x_webinar = await dbService.updateOne(User_x_webinar,query,dataToUpdate);
    if (!updatedUser_x_webinar){
      return res.recordNotFound();
    }
    return res.success({ data :updatedUser_x_webinar });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of User_x_webinar with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated User_x_webinars.
 * @return {Object} : updated User_x_webinars. {status, message, data}
 */
const bulkUpdateUser_x_webinar = async (req,res)=>{
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
    let updatedUser_x_webinar = await dbService.updateMany(User_x_webinar,filter,dataToUpdate);
    if (!updatedUser_x_webinar){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedUser_x_webinar } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of User_x_webinar with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated User_x_webinar.
 * @return {obj} : updated User_x_webinar. {status, message, data}
 */
const partialUpdateUser_x_webinar = async (req,res) => {
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
      user_x_webinarSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedUser_x_webinar = await dbService.updateOne(User_x_webinar, query, dataToUpdate);
    if (!updatedUser_x_webinar) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedUser_x_webinar });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
/**
 * @description : deactivate document of User_x_webinar from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of User_x_webinar.
 * @return {Object} : deactivated User_x_webinar. {status, message, data}
 */
const softDeleteUser_x_webinar = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedUser_x_webinar = await dbService.updateOne(User_x_webinar, query, updateBody);
    if (!updatedUser_x_webinar){
      return res.recordNotFound();
    }
    return res.success({ data:updatedUser_x_webinar });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

/**
 * @description : delete document of User_x_webinar from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted User_x_webinar. {status, message, data}
 */
const deleteUser_x_webinar = async (req,res) => {
  try { 
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const deletedUser_x_webinar = await dbService.deleteOne(User_x_webinar, query);
    if (!deletedUser_x_webinar){
      return res.recordNotFound();
    }
    return res.success({ data :deletedUser_x_webinar });
        
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : delete documents of User_x_webinar in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyUser_x_webinar = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const deletedUser_x_webinar = await dbService.deleteMany(User_x_webinar,query);
    if (!deletedUser_x_webinar){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :deletedUser_x_webinar } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
/**
 * @description : deactivate multiple documents of User_x_webinar from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of User_x_webinar.
 * @return {Object} : number of deactivated documents of User_x_webinar. {status, message, data}
 */
const softDeleteManyUser_x_webinar = async (req,res) => {
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
    let updatedUser_x_webinar = await dbService.updateMany(User_x_webinar,query, updateBody);
    if (!updatedUser_x_webinar) {
      return res.recordNotFound();
    }
    return res.success({ data:{ count :updatedUser_x_webinar } });
        
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addUser_x_webinar,
  bulkInsertUser_x_webinar,
  findAllUser_x_webinar,
  getUser_x_webinar,
  getUser_x_webinarCount,
  updateUser_x_webinar,
  bulkUpdateUser_x_webinar,
  partialUpdateUser_x_webinar,
  softDeleteUser_x_webinar,
  deleteUser_x_webinar,
  deleteManyUser_x_webinar,
  softDeleteManyUser_x_webinar    
};