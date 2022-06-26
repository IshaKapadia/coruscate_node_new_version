/**
 * meeting.js
 * @description :: model of a database collection meeting
 */

const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence')(mongoose);
const mongoosePaginate = require('mongoose-paginate-v2');
let idValidator = require('mongoose-id-validator');
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

    space_id:{
      type:Schema.Types.ObjectId,
      ref:'space'
    },

    user_id:{
      type:Schema.Types.ObjectId,
      ref:'user'
    },

    meeting_title:{ type:String },

    meeting_date:{ type:String },

    meeting_from:{ type:String },

    meeting_to:{ type:String },

    expected_member:{ type:Number },

    meeting_id:{
      type:Number,
      unique:false
    },

    meeting_description:{ type:String },

    meeting_image:{ type:String },

    isDeleted:{ type:Boolean }
  }
);
schema.plugin(autoIncrement, {
  inc_field: 'meeting_id',
  id:'meeting_meeting_id_sequence',
  inc_amount: 1, 
  start_seq: 1,
  prefix: '',
  suffix: '',
  length: 6
});
schema.pre('save', async function (next) {
  this.isDeleted = false;
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

schema.method('toJSON', function () {
  const {
    _id, __v, ...object 
  } = this.toObject({ virtuals:true });
  object.id = _id;
     
  return object;
});
schema.plugin(mongoosePaginate);
schema.plugin(idValidator);
const meeting = mongoose.model('meeting',schema);
module.exports = meeting;