/**
 * tieupsController.js
 * @description : exports action methods for tieups.
 */

const Tieups = require('../../../model/tieups');
const tieupsSchemaKey = require('../../../utils/validation/tieupsValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../../utils/common');
   
/**
 * @description : create document of Tieups in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Tieups. {status, message, data}
 */ 
const addTieups = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      tieupsSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new Tieups(dataToCreate);
    let createdTieups = await dbService.create(Tieups,dataToCreate);
    return res.success({ data : createdTieups });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Tieups in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Tieupss. {status, message, data}
 */
const bulkInsertTieups = async (req,res)=>{
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
    let createdTieupss = await dbService.create(Tieups,dataToCreate);
    createdTieupss = { count: createdTieupss ? createdTieupss.length : 0 };
    return res.success({ data:{ count:createdTieupss.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Tieups from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Tieups(s). {status, message, data}
 */
const findAllTieups = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      tieupsSchemaKey.findFilterKeys,
      Tieups.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Tieups, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundTieupss = await dbService.paginate( Tieups,query,options);
    if (!foundTieupss || !foundTieupss.data || !foundTieupss.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundTieupss });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Tieups from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Tieups. {status, message, data}
 */
const getTieups = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundTieups = await dbService.findOne(Tieups,query, options);
    if (!foundTieups){
      return res.recordNotFound();
    }
    return res.success({ data :foundTieups });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Tieups.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getTieupsCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      tieupsSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedTieups = await dbService.count(Tieups,where);
    return res.success({ data : { count: countedTieups } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Tieups with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Tieups.
 * @return {Object} : updated Tieups. {status, message, data}
 */
const updateTieups = async (req,res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      tieupsSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedTieups = await dbService.updateOne(Tieups,query,dataToUpdate);
    if (!updatedTieups){
      return res.recordNotFound();
    }
    return res.success({ data :updatedTieups });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Tieups with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Tieupss.
 * @return {Object} : updated Tieupss. {status, message, data}
 */
const bulkUpdateTieups = async (req,res)=>{
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
    let updatedTieups = await dbService.updateMany(Tieups,filter,dataToUpdate);
    if (!updatedTieups){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedTieups } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Tieups with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Tieups.
 * @return {obj} : updated Tieups. {status, message, data}
 */
const partialUpdateTieups = async (req,res) => {
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
      tieupsSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedTieups = await dbService.updateOne(Tieups, query, dataToUpdate);
    if (!updatedTieups) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedTieups });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
/**
 * @description : deactivate document of Tieups from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Tieups.
 * @return {Object} : deactivated Tieups. {status, message, data}
 */
const softDeleteTieups = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedTieups = await dbService.updateOne(Tieups, query, updateBody);
    if (!updatedTieups){
      return res.recordNotFound();
    }
    return res.success({ data:updatedTieups });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

/**
 * @description : delete document of Tieups from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Tieups. {status, message, data}
 */
const deleteTieups = async (req,res) => {
  try { 
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const deletedTieups = await dbService.deleteOne(Tieups, query);
    if (!deletedTieups){
      return res.recordNotFound();
    }
    return res.success({ data :deletedTieups });
        
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : delete documents of Tieups in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyTieups = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const deletedTieups = await dbService.deleteMany(Tieups,query);
    if (!deletedTieups){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :deletedTieups } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
/**
 * @description : deactivate multiple documents of Tieups from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Tieups.
 * @return {Object} : number of deactivated documents of Tieups. {status, message, data}
 */
const softDeleteManyTieups = async (req,res) => {
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
    let updatedTieups = await dbService.updateMany(Tieups,query, updateBody);
    if (!updatedTieups) {
      return res.recordNotFound();
    }
    return res.success({ data:{ count :updatedTieups } });
        
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addTieups,
  bulkInsertTieups,
  findAllTieups,
  getTieups,
  getTieupsCount,
  updateTieups,
  bulkUpdateTieups,
  partialUpdateTieups,
  softDeleteTieups,
  deleteTieups,
  deleteManyTieups,
  softDeleteManyTieups    
};