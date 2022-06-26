/**
 * learnController.js
 * @description : exports action methods for learn.
 */

const Learn = require('../../model/learn');
const learnSchemaKey = require('../../utils/validation/learnValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../utils/common');
   
/**
 * @description : create document of Learn in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Learn. {status, message, data}
 */ 
const addLearn = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      learnSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new Learn(dataToCreate);
    let createdLearn = await dbService.create(Learn,dataToCreate);
    return res.success({ data : createdLearn });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Learn in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Learns. {status, message, data}
 */
const bulkInsertLearn = async (req,res)=>{
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
    let createdLearns = await dbService.create(Learn,dataToCreate);
    createdLearns = { count: createdLearns ? createdLearns.length : 0 };
    return res.success({ data:{ count:createdLearns.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Learn from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Learn(s). {status, message, data}
 */
const findAllLearn = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      learnSchemaKey.findFilterKeys,
      Learn.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Learn, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundLearns = await dbService.paginate( Learn,query,options);
    if (!foundLearns || !foundLearns.data || !foundLearns.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundLearns });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Learn from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Learn. {status, message, data}
 */
const getLearn = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundLearn = await dbService.findOne(Learn,query, options);
    if (!foundLearn){
      return res.recordNotFound();
    }
    return res.success({ data :foundLearn });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Learn.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getLearnCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      learnSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedLearn = await dbService.count(Learn,where);
    return res.success({ data : { count: countedLearn } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Learn with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Learn.
 * @return {Object} : updated Learn. {status, message, data}
 */
const updateLearn = async (req,res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      learnSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedLearn = await dbService.updateOne(Learn,query,dataToUpdate);
    if (!updatedLearn){
      return res.recordNotFound();
    }
    return res.success({ data :updatedLearn });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Learn with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Learns.
 * @return {Object} : updated Learns. {status, message, data}
 */
const bulkUpdateLearn = async (req,res)=>{
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
    let updatedLearn = await dbService.updateMany(Learn,filter,dataToUpdate);
    if (!updatedLearn){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedLearn } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Learn with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Learn.
 * @return {obj} : updated Learn. {status, message, data}
 */
const partialUpdateLearn = async (req,res) => {
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
      learnSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedLearn = await dbService.updateOne(Learn, query, dataToUpdate);
    if (!updatedLearn) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedLearn });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
/**
 * @description : deactivate document of Learn from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Learn.
 * @return {Object} : deactivated Learn. {status, message, data}
 */
const softDeleteLearn = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedLearn = await dbService.updateOne(Learn, query, updateBody);
    if (!updatedLearn){
      return res.recordNotFound();
    }
    return res.success({ data:updatedLearn });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

/**
 * @description : delete document of Learn from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Learn. {status, message, data}
 */
const deleteLearn = async (req,res) => {
  try { 
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const deletedLearn = await dbService.deleteOne(Learn, query);
    if (!deletedLearn){
      return res.recordNotFound();
    }
    return res.success({ data :deletedLearn });
        
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : delete documents of Learn in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyLearn = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const deletedLearn = await dbService.deleteMany(Learn,query);
    if (!deletedLearn){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :deletedLearn } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
/**
 * @description : deactivate multiple documents of Learn from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Learn.
 * @return {Object} : number of deactivated documents of Learn. {status, message, data}
 */
const softDeleteManyLearn = async (req,res) => {
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
    let updatedLearn = await dbService.updateMany(Learn,query, updateBody);
    if (!updatedLearn) {
      return res.recordNotFound();
    }
    return res.success({ data:{ count :updatedLearn } });
        
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addLearn,
  bulkInsertLearn,
  findAllLearn,
  getLearn,
  getLearnCount,
  updateLearn,
  bulkUpdateLearn,
  partialUpdateLearn,
  softDeleteLearn,
  deleteLearn,
  deleteManyLearn,
  softDeleteManyLearn    
};