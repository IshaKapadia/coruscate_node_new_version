/**
 * bulletinController.js
 * @description : exports action methods for bulletin.
 */

const Bulletin = require('../../model/bulletin');
const bulletinSchemaKey = require('../../utils/validation/bulletinValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../utils/common');
   
/**
 * @description : create document of Bulletin in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Bulletin. {status, message, data}
 */ 
const addBulletin = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      bulletinSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new Bulletin(dataToCreate);
    let createdBulletin = await dbService.create(Bulletin,dataToCreate);
    return res.success({ data : createdBulletin });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Bulletin in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Bulletins. {status, message, data}
 */
const bulkInsertBulletin = async (req,res)=>{
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
    let createdBulletins = await dbService.create(Bulletin,dataToCreate);
    createdBulletins = { count: createdBulletins ? createdBulletins.length : 0 };
    return res.success({ data:{ count:createdBulletins.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Bulletin from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Bulletin(s). {status, message, data}
 */
const findAllBulletin = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      bulletinSchemaKey.findFilterKeys,
      Bulletin.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Bulletin, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundBulletins = await dbService.paginate( Bulletin,query,options);
    if (!foundBulletins || !foundBulletins.data || !foundBulletins.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundBulletins });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Bulletin from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Bulletin. {status, message, data}
 */
const getBulletin = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundBulletin = await dbService.findOne(Bulletin,query, options);
    if (!foundBulletin){
      return res.recordNotFound();
    }
    return res.success({ data :foundBulletin });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Bulletin.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getBulletinCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      bulletinSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedBulletin = await dbService.count(Bulletin,where);
    return res.success({ data : { count: countedBulletin } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Bulletin with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Bulletin.
 * @return {Object} : updated Bulletin. {status, message, data}
 */
const updateBulletin = async (req,res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      bulletinSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedBulletin = await dbService.updateOne(Bulletin,query,dataToUpdate);
    if (!updatedBulletin){
      return res.recordNotFound();
    }
    return res.success({ data :updatedBulletin });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Bulletin with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Bulletins.
 * @return {Object} : updated Bulletins. {status, message, data}
 */
const bulkUpdateBulletin = async (req,res)=>{
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
    let updatedBulletin = await dbService.updateMany(Bulletin,filter,dataToUpdate);
    if (!updatedBulletin){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedBulletin } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Bulletin with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Bulletin.
 * @return {obj} : updated Bulletin. {status, message, data}
 */
const partialUpdateBulletin = async (req,res) => {
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
      bulletinSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedBulletin = await dbService.updateOne(Bulletin, query, dataToUpdate);
    if (!updatedBulletin) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedBulletin });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
/**
 * @description : deactivate document of Bulletin from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Bulletin.
 * @return {Object} : deactivated Bulletin. {status, message, data}
 */
const softDeleteBulletin = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedBulletin = await dbService.updateOne(Bulletin, query, updateBody);
    if (!updatedBulletin){
      return res.recordNotFound();
    }
    return res.success({ data:updatedBulletin });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

/**
 * @description : delete document of Bulletin from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Bulletin. {status, message, data}
 */
const deleteBulletin = async (req,res) => {
  try { 
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const deletedBulletin = await dbService.deleteOne(Bulletin, query);
    if (!deletedBulletin){
      return res.recordNotFound();
    }
    return res.success({ data :deletedBulletin });
        
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : delete documents of Bulletin in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyBulletin = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const deletedBulletin = await dbService.deleteMany(Bulletin,query);
    if (!deletedBulletin){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :deletedBulletin } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
/**
 * @description : deactivate multiple documents of Bulletin from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Bulletin.
 * @return {Object} : number of deactivated documents of Bulletin. {status, message, data}
 */
const softDeleteManyBulletin = async (req,res) => {
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
    let updatedBulletin = await dbService.updateMany(Bulletin,query, updateBody);
    if (!updatedBulletin) {
      return res.recordNotFound();
    }
    return res.success({ data:{ count :updatedBulletin } });
        
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addBulletin,
  bulkInsertBulletin,
  findAllBulletin,
  getBulletin,
  getBulletinCount,
  updateBulletin,
  bulkUpdateBulletin,
  partialUpdateBulletin,
  softDeleteBulletin,
  deleteBulletin,
  deleteManyBulletin,
  softDeleteManyBulletin    
};