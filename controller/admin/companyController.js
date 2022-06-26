/**
 * companyController.js
 * @description : exports action methods for company.
 */

const Company = require('../../model/company');
const companySchemaKey = require('../../utils/validation/companyValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const deleteDependentService = require('../../utils/deleteDependent');
const utils = require('../../utils/common');
   
/**
 * @description : create document of Company in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Company. {status, message, data}
 */ 
const addCompany = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      companySchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate = new Company(dataToCreate);
    let createdCompany = await dbService.create(Company,dataToCreate);
    return res.success({ data : createdCompany });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Company in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Companys. {status, message, data}
 */
const bulkInsertCompany = async (req,res)=>{
  try {
    if (req.body && (!Array.isArray(req.body.data) || req.body.data.length < 1)) {
      return res.badRequest();
    }
    let dataToCreate = [ ...req.body.data ];
    let createdCompanys = await dbService.create(Company,dataToCreate);
    createdCompanys = { count: createdCompanys ? createdCompanys.length : 0 };
    return res.success({ data:{ count:createdCompanys.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Company from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Company(s). {status, message, data}
 */
const findAllCompany = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      companySchemaKey.findFilterKeys,
      Company.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Company, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundCompanys = await dbService.paginate( Company,query,options);
    if (!foundCompanys || !foundCompanys.data || !foundCompanys.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundCompanys });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Company from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Company. {status, message, data}
 */
const getCompany = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundCompany = await dbService.findOne(Company,query, options);
    if (!foundCompany){
      return res.recordNotFound();
    }
    return res.success({ data :foundCompany });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Company.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getCompanyCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      companySchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedCompany = await dbService.count(Company,where);
    return res.success({ data : { count: countedCompany } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Company with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Company.
 * @return {Object} : updated Company. {status, message, data}
 */
const updateCompany = async (req,res) => {
  try {
    let dataToUpdate = { ...req.body, };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      companySchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedCompany = await dbService.updateOne(Company,query,dataToUpdate);
    if (!updatedCompany){
      return res.recordNotFound();
    }
    return res.success({ data :updatedCompany });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Company with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Companys.
 * @return {Object} : updated Companys. {status, message, data}
 */
const bulkUpdateCompany = async (req,res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = { ...req.body.data, };
    }
    let updatedCompany = await dbService.updateMany(Company,filter,dataToUpdate);
    if (!updatedCompany){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedCompany } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Company with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Company.
 * @return {obj} : updated Company. {status, message, data}
 */
const partialUpdateCompany = async (req,res) => {
  try {
    if (!req.params.id){
      res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let dataToUpdate = { ...req.body, };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      companySchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedCompany = await dbService.updateOne(Company, query, dataToUpdate);
    if (!updatedCompany) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedCompany });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : deactivate document of Company from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Company.
 * @return {Object} : deactivated Company. {status, message, data}
 */
const softDeleteCompany = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const updateBody = { isDeleted: true, };
    let updatedCompany = await deleteDependentService.softDeleteCompany(query, updateBody);
    if (!updatedCompany){
      return res.recordNotFound();
    }
    return res.success({ data:updatedCompany });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : delete document of Company from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Company. {status, message, data}
 */
const deleteCompany = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    let deletedCompany;
    if (req.body.isWarning) { 
      deletedCompany = await deleteDependentService.countCompany(query);
    } else {
      deletedCompany = await deleteDependentService.deleteCompany(query);
    }
    if (!deletedCompany){
      return res.recordNotFound();
    }
    return res.success({ data :deletedCompany });
  }
  catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : delete documents of Company in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyCompany = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    let deletedCompany;
    if (req.body.isWarning) {
      deletedCompany = await deleteDependentService.countCompany(query);
    }
    else {
      deletedCompany = await deleteDependentService.deleteCompany(query);
    }
    if (!deletedCompany){
      return res.recordNotFound();
    }
    return res.success({ data :deletedCompany });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : deactivate multiple documents of Company from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Company.
 * @return {Object} : number of deactivated documents of Company. {status, message, data}
 */
const softDeleteManyCompany = async (req,res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const updateBody = { isDeleted: true, };
    let updatedCompany = await deleteDependentService.softDeleteCompany(query, updateBody);
    if (!updatedCompany) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedCompany });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addCompany,
  bulkInsertCompany,
  findAllCompany,
  getCompany,
  getCompanyCount,
  updateCompany,
  bulkUpdateCompany,
  partialUpdateCompany,
  softDeleteCompany,
  deleteCompany,
  deleteManyCompany,
  softDeleteManyCompany    
};