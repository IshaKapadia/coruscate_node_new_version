/**
 * tieupsValidation.js
 * @description :: validate each post and put request as per tieups model
 */

const joi = require('joi');
const {
  options, isCountOnly, populate, select 
} = require('./commonFilterValidation');

/** validation keys and properties of tieups */
exports.schemaKeys = joi.object({
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  tieup_id: joi.number().integer().allow(0),
  organization_name: joi.string().allow(null).allow(''),
  organization_description: joi.string().allow(null).allow(''),
  organization_image: joi.string().allow(null).allow('')
}).unknown(true);

/** validation keys and properties of tieups for updation */
exports.updateSchemaKeys = joi.object({
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  tieup_id: joi.number().integer().allow(0),
  organization_name: joi.string().allow(null).allow(''),
  organization_description: joi.string().allow(null).allow(''),
  organization_image: joi.string().allow(null).allow(''),
  _id: joi.string().regex(/^[0-9a-fA-F]{24}$/)
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of tieups for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      tieup_id: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      organization_name: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      organization_description: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      organization_image: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      id: joi.any(),
      _id: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object())
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  populate: joi.array().items(populate),
  select: select
    
}).unknown(true);
