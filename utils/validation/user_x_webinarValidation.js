/**
 * user_x_webinarValidation.js
 * @description :: validate each post and put request as per user_x_webinar model
 */

const joi = require('joi');
const {
  options, isCountOnly, populate, select 
} = require('./commonFilterValidation');

/** validation keys and properties of user_x_webinar */
exports.schemaKeys = joi.object({
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  webinar_id: joi.number().integer().allow(0),
  webinar_link: joi.string().allow(null).allow(''),
  webinar_date: joi.string().allow(null).allow(''),
  user_id: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  webinar_time: joi.string().allow(null).allow(''),
  webinar_description: joi.string().allow(null).allow('')
}).unknown(true);

/** validation keys and properties of user_x_webinar for updation */
exports.updateSchemaKeys = joi.object({
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  webinar_id: joi.number().integer().allow(0),
  webinar_link: joi.string().allow(null).allow(''),
  webinar_date: joi.string().allow(null).allow(''),
  user_id: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  webinar_time: joi.string().allow(null).allow(''),
  webinar_description: joi.string().allow(null).allow(''),
  _id: joi.string().regex(/^[0-9a-fA-F]{24}$/)
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of user_x_webinar for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      webinar_id: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      webinar_link: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      webinar_date: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      user_id: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
      webinar_time: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      webinar_description: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      id: joi.any(),
      _id: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object())
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  populate: joi.array().items(populate),
  select: select
    
}).unknown(true);
