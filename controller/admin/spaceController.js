/**
 * spaceController.js
 * @description : exports action methods for space.
 */

const Space = require('../../model/space');
const spaceSchemaKey = require('../../utils/validation/spaceValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const deleteDependentService = require('../../utils/deleteDependent');
const utils = require('../../utils/common');
   
/**
 * @description : create document of Space in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Space. {status, message, data}
 */ 
const addSpace = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      spaceSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate = new Space(dataToCreate);
    let createdSpace = await dbService.create(Space,dataToCreate);
    return res.success({ data : createdSpace });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Space in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Spaces. {status, message, data}
 */
const bulkInsertSpace = async (req,res)=>{
  try {
    if (req.body && (!Array.isArray(req.body.data) || req.body.data.length < 1)) {
      return res.badRequest();
    }
    let dataToCreate = [ ...req.body.data ];
    let createdSpaces = await dbService.create(Space,dataToCreate);
    createdSpaces = { count: createdSpaces ? createdSpaces.length : 0 };
    return res.success({ data:{ count:createdSpaces.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Space from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Space(s). {status, message, data}
 */
const findAllSpace = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      spaceSchemaKey.findFilterKeys,
      Space.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Space, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundSpaces = await dbService.paginate( Space,query,options);
    if (!foundSpaces || !foundSpaces.data || !foundSpaces.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundSpaces });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Space from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Space. {status, message, data}
 */
const getSpace = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundSpace = await dbService.findOne(Space,query, options);
    if (!foundSpace){
      return res.recordNotFound();
    }
    return res.success({ data :foundSpace });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Space.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getSpaceCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      spaceSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedSpace = await dbService.count(Space,where);
    return res.success({ data : { count: countedSpace } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Space with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Space.
 * @return {Object} : updated Space. {status, message, data}
 */
const updateSpace = async (req,res) => {
  try {
    let dataToUpdate = { ...req.body, };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      spaceSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedSpace = await dbService.updateOne(Space,query,dataToUpdate);
    if (!updatedSpace){
      return res.recordNotFound();
    }
    return res.success({ data :updatedSpace });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Space with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Spaces.
 * @return {Object} : updated Spaces. {status, message, data}
 */
const bulkUpdateSpace = async (req,res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = { ...req.body.data, };
    }
    let updatedSpace = await dbService.updateMany(Space,filter,dataToUpdate);
    if (!updatedSpace){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedSpace } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Space with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Space.
 * @return {obj} : updated Space. {status, message, data}
 */
const partialUpdateSpace = async (req,res) => {
  try {
    if (!req.params.id){
      res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let dataToUpdate = { ...req.body, };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      spaceSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedSpace = await dbService.updateOne(Space, query, dataToUpdate);
    if (!updatedSpace) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedSpace });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : deactivate document of Space from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Space.
 * @return {Object} : deactivated Space. {status, message, data}
 */
const softDeleteSpace = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const updateBody = { isDeleted: true, };
    let updatedSpace = await deleteDependentService.softDeleteSpace(query, updateBody);
    if (!updatedSpace){
      return res.recordNotFound();
    }
    return res.success({ data:updatedSpace });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : delete document of Space from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Space. {status, message, data}
 */
const deleteSpace = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    let deletedSpace;
    if (req.body.isWarning) { 
      deletedSpace = await deleteDependentService.countSpace(query);
    } else {
      deletedSpace = await deleteDependentService.deleteSpace(query);
    }
    if (!deletedSpace){
      return res.recordNotFound();
    }
    return res.success({ data :deletedSpace });
  }
  catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : delete documents of Space in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManySpace = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    let deletedSpace;
    if (req.body.isWarning) {
      deletedSpace = await deleteDependentService.countSpace(query);
    }
    else {
      deletedSpace = await deleteDependentService.deleteSpace(query);
    }
    if (!deletedSpace){
      return res.recordNotFound();
    }
    return res.success({ data :deletedSpace });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : deactivate multiple documents of Space from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Space.
 * @return {Object} : number of deactivated documents of Space. {status, message, data}
 */
const softDeleteManySpace = async (req,res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const updateBody = { isDeleted: true, };
    let updatedSpace = await deleteDependentService.softDeleteSpace(query, updateBody);
    if (!updatedSpace) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedSpace });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addSpace,
  bulkInsertSpace,
  findAllSpace,
  getSpace,
  getSpaceCount,
  updateSpace,
  bulkUpdateSpace,
  partialUpdateSpace,
  softDeleteSpace,
  deleteSpace,
  deleteManySpace,
  softDeleteManySpace    
};