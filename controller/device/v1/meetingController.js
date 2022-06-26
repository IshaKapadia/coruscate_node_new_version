/**
 * meetingController.js
 * @description : exports action methods for meeting.
 */

const Meeting = require('../../../model/meeting');
const meetingSchemaKey = require('../../../utils/validation/meetingValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const deleteDependentService = require('../../../utils/deleteDependent');
const utils = require('../../../utils/common');
   
/**
 * @description : create document of Meeting in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Meeting. {status, message, data}
 */ 
const addMeeting = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      meetingSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate = new Meeting(dataToCreate);
    let createdMeeting = await dbService.create(Meeting,dataToCreate);
    return res.success({ data : createdMeeting });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Meeting in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Meetings. {status, message, data}
 */
const bulkInsertMeeting = async (req,res)=>{
  try {
    if (req.body && (!Array.isArray(req.body.data) || req.body.data.length < 1)) {
      return res.badRequest();
    }
    let dataToCreate = [ ...req.body.data ];
    let createdMeetings = await dbService.create(Meeting,dataToCreate);
    createdMeetings = { count: createdMeetings ? createdMeetings.length : 0 };
    return res.success({ data:{ count:createdMeetings.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Meeting from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Meeting(s). {status, message, data}
 */
const findAllMeeting = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      meetingSchemaKey.findFilterKeys,
      Meeting.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Meeting, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundMeetings = await dbService.paginate( Meeting,query,options);
    if (!foundMeetings || !foundMeetings.data || !foundMeetings.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundMeetings });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Meeting from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Meeting. {status, message, data}
 */
const getMeeting = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundMeeting = await dbService.findOne(Meeting,query, options);
    if (!foundMeeting){
      return res.recordNotFound();
    }
    return res.success({ data :foundMeeting });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Meeting.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getMeetingCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      meetingSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedMeeting = await dbService.count(Meeting,where);
    return res.success({ data : { count: countedMeeting } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Meeting with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Meeting.
 * @return {Object} : updated Meeting. {status, message, data}
 */
const updateMeeting = async (req,res) => {
  try {
    let dataToUpdate = { ...req.body, };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      meetingSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedMeeting = await dbService.updateOne(Meeting,query,dataToUpdate);
    if (!updatedMeeting){
      return res.recordNotFound();
    }
    return res.success({ data :updatedMeeting });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Meeting with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Meetings.
 * @return {Object} : updated Meetings. {status, message, data}
 */
const bulkUpdateMeeting = async (req,res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = { ...req.body.data, };
    }
    let updatedMeeting = await dbService.updateMany(Meeting,filter,dataToUpdate);
    if (!updatedMeeting){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedMeeting } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Meeting with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Meeting.
 * @return {obj} : updated Meeting. {status, message, data}
 */
const partialUpdateMeeting = async (req,res) => {
  try {
    if (!req.params.id){
      res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let dataToUpdate = { ...req.body, };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      meetingSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedMeeting = await dbService.updateOne(Meeting, query, dataToUpdate);
    if (!updatedMeeting) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedMeeting });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : deactivate document of Meeting from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Meeting.
 * @return {Object} : deactivated Meeting. {status, message, data}
 */
const softDeleteMeeting = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const updateBody = { isDeleted: true, };
    let updatedMeeting = await deleteDependentService.softDeleteMeeting(query, updateBody);
    if (!updatedMeeting){
      return res.recordNotFound();
    }
    return res.success({ data:updatedMeeting });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : delete document of Meeting from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Meeting. {status, message, data}
 */
const deleteMeeting = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    let deletedMeeting;
    if (req.body.isWarning) { 
      deletedMeeting = await deleteDependentService.countMeeting(query);
    } else {
      deletedMeeting = await deleteDependentService.deleteMeeting(query);
    }
    if (!deletedMeeting){
      return res.recordNotFound();
    }
    return res.success({ data :deletedMeeting });
  }
  catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : delete documents of Meeting in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyMeeting = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    let deletedMeeting;
    if (req.body.isWarning) {
      deletedMeeting = await deleteDependentService.countMeeting(query);
    }
    else {
      deletedMeeting = await deleteDependentService.deleteMeeting(query);
    }
    if (!deletedMeeting){
      return res.recordNotFound();
    }
    return res.success({ data :deletedMeeting });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : deactivate multiple documents of Meeting from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Meeting.
 * @return {Object} : number of deactivated documents of Meeting. {status, message, data}
 */
const softDeleteManyMeeting = async (req,res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const updateBody = { isDeleted: true, };
    let updatedMeeting = await deleteDependentService.softDeleteMeeting(query, updateBody);
    if (!updatedMeeting) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedMeeting });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addMeeting,
  bulkInsertMeeting,
  findAllMeeting,
  getMeeting,
  getMeetingCount,
  updateMeeting,
  bulkUpdateMeeting,
  partialUpdateMeeting,
  softDeleteMeeting,
  deleteMeeting,
  deleteManyMeeting,
  softDeleteManyMeeting    
};