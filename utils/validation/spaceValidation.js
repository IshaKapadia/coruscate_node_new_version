/**
 * spaceValidation.js
 * @description :: validate each post and put request as per space model
 */

const joi = require('joi');
const {
  options, isCountOnly, populate, select 
} = require('./commonFilterValidation');

/** validation keys and properties of space */
exports.schemaKeys = joi.object({
  space_name: joi.string().allow(null).allow(''),
  space_image: joi.string().allow(null).allow(''),
  total_member_capacity: joi.number().integer().allow(0),
  space_type: joi.string().allow(null).allow(''),
  space_id: joi.number().integer().allow(0),
  isDeleted: joi.boolean()
}).unknown(true);

/** validation keys and properties of space for updation */
exports.updateSchemaKeys = joi.object({
  space_name: joi.string().allow(null).allow(''),
  space_image: joi.string().allow(null).allow(''),
  total_member_capacity: joi.number().integer().allow(0),
  space_type: joi.string().allow(null).allow(''),
  space_id: joi.number().integer().allow(0),
  isDeleted: joi.boolean(),
  _id: joi.string().regex(/^[0-9a-fA-F]{24}$/)
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of space for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      space_name: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      space_image: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      total_member_capacity: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      space_type: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      space_id: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      id: joi.any(),
      _id: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object())
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  populate: joi.array().items(populate),
  select: select
    
}).unknown(true);
