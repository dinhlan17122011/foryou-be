
import mongoose from "mongoose";
export const connect=()=>{
    mongoose.connect(`mongodb://127.0.0.1:27017/cake`)
  .then(() => console.log('Connected!'));
}
export const connectslider=()=>{
  mongoose.createConnection('mongodb:// 127.0.0.1:27017/cake/slider')
  console.log('Connected!')
}
export const connectsaccessory=()=>{
mongoose.createConnection('mongodb:// 127.0.0.1:27017/cake/accessory')
}
export const connectsdetailcake=()=>{
  mongoose.createConnection('mongodb:// 127.0.0.1:27017/cake/detailcake')
  }
export const connectintroduction=()=>{
    mongoose.createConnection('mongodb:// 127.0.0.1:27017/cake/introduction')

    }
export const connectcontact=()=>{
    mongoose.createConnection('mongodb:// 127.0.0.1:27017/cake/contact')

}
export const connectpolicy=()=>{
  mongoose.createConnection('mongodb:// 127.0.0.1:27017/cake/policy')
}
