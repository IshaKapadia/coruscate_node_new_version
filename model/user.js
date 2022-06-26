/**
 * user.js
 * @description :: model of a database collection user
 */

const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence')(mongoose);
const mongoosePaginate = require('mongoose-paginate-v2');
let idValidator = require('mongoose-id-validator');
const bcrypt = require('bcrypt');
const { USER_TYPES } = require('../constants/authConstant');
const { convertObjectToEnum } = require('../utils/common');
const myCustomLabels = {
  totalDocs: 'itemCount',
  docs: 'data',
  limit: 'perPage',
  page: 'currentPage',
  nextPage: 'next',
  prevPage: 'prev',
  totalPages: 'pageCount',
  pagingCounter: 'slNo',
  meta: 'paginator',
};
mongoosePaginate.paginate.options = { customLabels: myCustomLabels };
const Schema = mongoose.Schema;
const schema = new Schema(
  {

    user_name:{ type:String },

    password:{ type:String },

    email:{ type:String },

    user_company:{
      type:Schema.Types.ObjectId,
      ref:'company'
    },

    designation:{ type:String },

    experties:{ type:String },

    mobile_no:{ type:String },

    user_id:{
      type:Number,
      unique:false
    },

    user_image:{ type:String },

    mobileNo:{ type:String },

    username:{ type:String },

    isDeleted:{ type:Boolean },

    userType:{
      type:Number,
      enum:convertObjectToEnum(USER_TYPES),
      required:true
    },

    resetPasswordLink:{
      code:String,
      expireTime:Date
    },

    loginRetryLimit:{
      type:Number,
      default:0
    },

    loginReactiveTime:{ type:Date }
  }
);
schema.plugin(autoIncrement, {
  inc_field: 'user_id',
  id:'user_user_id_sequence',
  inc_amount: 1, 
  start_seq: 1,
  prefix: '',
  suffix: '',
  length: 6
});
schema.pre('save', async function (next) {
  this.isDeleted = false;
  if (this.password){
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

schema.pre('insertMany', async function (next, docs) {
  if (docs && docs.length){
    for (let index = 0; index < docs.length; index++) {
      const element = docs[index];
      element.isDeleted = false;
    }
  }
  next();
});

schema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};
schema.method('toJSON', function () {
  const {
    _id, __v, ...object 
  } = this.toObject({ virtuals:true });
  object.id = _id;
  delete object.password;
     
  return object;
});
schema.plugin(mongoosePaginate);
schema.plugin(idValidator);
const user = mongoose.model('user',schema);
module.exports = user;