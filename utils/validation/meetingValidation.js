/**
 * meetingValidation.js
 * @description :: validate each post and put request as per meeting model
 */

const joi = require('joi');
const {
  options, isCountOnly, populate, select 
} = require('./commonFilterValidation');

/** validation keys and properties of meeting */
exports.schemaKeys = joi.object({
  space_id: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  user_id: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  meeting_title: joi.string().allow(null).allow(''),
  meeting_date: joi.string().allow(null).allow(''),
  meeting_from: joi.string().allow(null).allow(''),
  meeting_to: joi.string().allow(null).allow(''),
  expected_member: joi.number().integer().allow(0),
  meeting_id: joi.number().integer().allow(0),
  meeting_description: joi.string().allow(null).allow(''),
  meeting_image: joi.string().allow(null).allow(''),
  isDeleted: joi.boolean()
}).unknown(true);

/** validation keys and properties of meeting for updation */
exports.updateSchemaKeys = joi.object({
  space_id: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  user_id: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  meeting_title: joi.string().allow(null).allow(''),
  meeting_date: joi.string().allow(null).allow(''),
  meeting_from: joi.string().allow(null).allow(''),
  meeting_to: joi.string().allow(null).allow(''),
  expected_member: joi.number().integer().allow(0),
  meeting_id: joi.number().integer().allow(0),
  meeting_description: joi.string().allow(null).allow(''),
  meeting_image: joi.string().allow(null).allow(''),
  isDeleted: joi.boolean(),
  _id: joi.string().regex(/^[0-9a-fA-F]{24}$/)
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of meeting for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      space_id: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
      user_id: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
      meeting_title: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      meeting_date: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      meeting_from: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      meeting_to: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      expected_member: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      meeting_id: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      meeting_description: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      meeting_image: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      id: joi.any(),
      _id: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object())
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  populate: joi.array().items(populate),
  select: select
    
}).unknown(true);
