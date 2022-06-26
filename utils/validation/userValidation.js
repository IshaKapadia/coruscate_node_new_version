/**
 * userValidation.js
 * @description :: validate each post and put request as per user model
 */

const joi = require('joi');
const {
  options, isCountOnly, populate, select 
} = require('./commonFilterValidation');
const { USER_TYPES } = require('../../constants/authConstant');
const { convertObjectToEnum } = require('../common');   

/** validation keys and properties of user */
exports.schemaKeys = joi.object({
  user_name: joi.string().allow(null).allow(''),
  password: joi.string().allow(null).allow(''),
  email: joi.string().allow(null).allow(''),
  user_company: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  designation: joi.string().allow(null).allow(''),
  experties: joi.string().allow(null).allow(''),
  mobile_no: joi.string().allow(null).allow(''),
  user_id: joi.number().integer().allow(0),
  user_image: joi.string().allow(null).allow(''),
  mobileNo: joi.string().allow(null).allow(''),
  username: joi.string().allow(null).allow(''),
  isDeleted: joi.boolean(),
  userType: joi.number().integer().valid(...convertObjectToEnum(USER_TYPES)).allow(0),
  resetPasswordLink: joi.object({
    code:joi.string(),
    expireTime:joi.date().options({ convert: true })
  })
}).unknown(true);

/** validation keys and properties of user for updation */
exports.updateSchemaKeys = joi.object({
  user_name: joi.string().allow(null).allow(''),
  password: joi.string().allow(null).allow(''),
  email: joi.string().allow(null).allow(''),
  user_company: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  designation: joi.string().allow(null).allow(''),
  experties: joi.string().allow(null).allow(''),
  mobile_no: joi.string().allow(null).allow(''),
  user_id: joi.number().integer().allow(0),
  user_image: joi.string().allow(null).allow(''),
  mobileNo: joi.string().allow(null).allow(''),
  username: joi.string().allow(null).allow(''),
  isDeleted: joi.boolean(),
  userType: joi.number().integer().valid(...convertObjectToEnum(USER_TYPES)).allow(0),
  resetPasswordLink: joi.object({
    code:joi.string(),
    expireTime:joi.date().options({ convert: true })
  }),
  _id: joi.string().regex(/^[0-9a-fA-F]{24}$/)
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of user for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      user_name: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      password: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      email: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      user_company: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
      designation: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      experties: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      mobile_no: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      user_id: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      user_image: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      mobileNo: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      username: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      userType: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      id: joi.any(),
      _id: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object())
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  populate: joi.array().items(populate),
  select: select
    
}).unknown(true);
