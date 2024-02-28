const {vAddToSet}=require('../middleware/validation/vAddToSet')
const {vDelete}=require('../middleware/validation/vDelete')
const {vGet}=require('../middleware/validation/vGet')
const {vPost}=require('../middleware/validation/vPost')
const {vPull}=require('../middleware/validation/vPull')
const {vPut}=require('../middleware/validation/vPut')
const {vSet}=require('../middleware/validation/vSet')


module.exports={
    vAddToSet,
    vDelete,
    vGet,
    vPost,
    vPull,
    vPut,
    vSet
}