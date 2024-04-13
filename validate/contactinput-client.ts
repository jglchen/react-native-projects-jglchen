import * as EmailValidator from 'email-validator';
import { ErrorsType } from '@/types/errorstype';
import { ContactInputType } from '@/types/contactinput';

export default function validateContactInputClient(inputObj: ContactInputType, contactPage: any){
    const {name, email, message} = inputObj;
    const errorMsg: ErrorsType = {};
    let valid = true;
    if (!name){
        //errorMsg.name = ['This field is required.'];
        errorMsg.name = [contactPage.FieldRequied || 'FieldRequied'];
        valid = false;
    }else if(name.length > 255){
        if (errorMsg.name){
            //errorMsg.name.push('The name field can not be longer than 255 characters.');
            errorMsg.name.push(contactPage.NameMax || 'NameMax');
        }else{
            //errorMsg.name = ['The name field can not be longer than 255 characters.'];
            errorMsg.name = [contactPage.NameMax || 'NameMax'];
            valid = false;
        }
    }

    if (!email){
        //errorMsg.email = ['This field is required.'];
        errorMsg.email = [contactPage.FieldRequied || 'FieldRequied'];
        valid = false;
    }else if(email.length > 255){
        if (errorMsg.email){
            //errorMsg.email.push('The email field can not be longer than 255 characters.');
            errorMsg.email.push(contactPage.EmailMax || 'EmailMax');
        }else{
            errorMsg.email = [contactPage.EmailMax || 'EmailMax'];
            valid = false;
        }
    }else if (!EmailValidator.validate(email)){
        if (errorMsg.email){
            //errorMsg.email.push('The email is not a valid email.');
            errorMsg.email.push(contactPage.EmailNotValid || 'EmailNotValid');
        }else{
            //errorMsg.email = ['The email is not a valid email.'];
            errorMsg.email = [contactPage.EmailNotValid || 'EmailNotValid'];
            valid = false;
        }
    }

    if (!message){
        //errorMsg.message = ['This field is required.'];
        errorMsg.message = [contactPage.FieldRequied || 'FieldRequied'];
        valid = false;
    }

    if (valid){
        return {
         valid
        };
     }
 
     return {
         valid,
         errorMsg
     };
}    