import React, { useState, useEffect } from "react";
import { Text, View, TextInput, Pressable, ActivityIndicator, Linking, Button, Image, Alert } from 'react-native';
import {useTranslation} from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import contactData from "@/configdata/contactData";
import { DOMAIN_URL } from '@/configdata/domainurl';
import { useColorScheme } from '@/components/useColorScheme';
import InputError from '@/components/Utils/InputError';
import { ErrorsType } from '@/types/errorstype';
import { ContactInputType } from '@/types/contactinput';
import validateContactInputClient from '@/validate/contactinput-client';

const Contact = () => {
    const { colorScheme } = useColorScheme();
    const {t, i18n} = useTranslation(); 
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [pending, setPending] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errors, setErrors] = useState<ErrorsType>({});
    const [showQRCode, setShowQRCode] = useState(false);

    useEffect(() => {
        if (success){
          setTimeout(() => {
            setSuccess(false);
          }, 5000)
        }
    },[success]);

    const openUrlLinking = async (url:string) => {
        // Checking if the link is supported for links with custom URL scheme.
        const supported = await Linking.canOpenURL(url);
        if (supported) {
            // Opening the link with some app, if the URL scheme is "http" the web link should be opened
            // by some browser in the mobile
            await Linking.openURL(url);
        } else {
            Alert.alert(`${t('ContactPage.NoknowOpenURL')}: ${url}`);
        }
    };
    
    const formReset = () => {
        setName('');
        setEmail('');
        setSubject('');
        setPhone('');
        setMessage('');
    };
    
    const sendMessage = async () => {
        setErrors({});
    
        const formObj: ContactInputType = {
          name,
          email,
          message,
        }
    
        if (subject){
          formObj.subject = subject;
        }
        if (phone){
          formObj.phone = phone;
        }
      
        const validateResult = validateContactInputClient(formObj, {
          FieldRequied: t('ContactPage.FieldRequied'),
          NameMax: t('ContactPage.NameMax'),
          EmailMax: t('ContactPage.EmailMax'),
          EmailNotValid: t('ContactPage.EmailNotValid')
        });
        if (!validateResult.valid){
          const errorMsg = validateResult.errorMsg;
          setErrors(errorMsg as ErrorsType);
          return; 
        }

        let locale = i18n.language;
        if (locale == 'zhtw'){
            locale = 'zh-tw';
        }

        const submitData = {...formObj, locale, msgAppreciate: t('ContactPage.MsgAppreciate'), headTitle: t('Navigation.HeadTitle')}
    
        console.log(submitData);

        setPending(true);
        
        try {
            const res = await fetch(`${DOMAIN_URL}/api/sendmessage`,{
              method: 'POST',
              body: JSON.stringify(submitData),
              headers: {
                'content-type': 'application/json'
              }
            });
            if(res.ok){
                setPending(false);
                formReset();
                setSuccess(true);
            }
        } catch (error) {
              console.log(error)
        }

        setPending(false);
    } 
    
   
    return (
        <View className="px-4 md:px-8 2xl:px-0">
            <View className="mx-auto max-w-c-1390 relative pt-2 px-7.5 lg:px-15 xl:px-20 overflow-hidden">
                <View className="flex flex-wrap md:flex-nowrap flex-col-reverse md:flex-row gap-4 xl:gap-10 md:justify-between">
                    <View>
                    <Text className="text-black dark:text-white text-2xl xl:text-sectiontitle4 font-semibold mb-2">
                    {t('ContactPage.title')}
                    </Text>
                    
                    <View className="flex flex-col lg:flex-row lg:justify-between gap-7.5 lg:gap-14 mb-7.5">
                        <View className="w-full lg:w-1/2">
                            <TextInput
                                placeholder={`${t('ContactPage.Name')}*`}
                                placeholderTextColor={colorScheme === 'light' ? '#4b5563': '#e5e7eb'}
                                onChangeText={text => setName(text)}
                                value={name}
                                className="w-full dark:text-white bg-transparent border-b border-stroke dark:border-strokedark focus-visible:outline-none focus:border-waterloo dark:focus:border-manatee focus:placeholder:text-black dark:focus:placeholder:text-white py-3.5"
                                //required
                                />
                            <InputError messages={errors.name} className="mt-0.5" />    
                        </View>
                        <View className="w-full lg:w-1/2">
                            <TextInput
                                placeholder={`${t('ContactPage.Email')}*`}
                                placeholderTextColor={colorScheme === 'light' ? '#4b5563': '#e5e7eb'}
                                onChangeText={text => setEmail(text)}
                                value={email}
                                keyboardType="email-address"
                                className="w-full dark:text-white bg-transparent border-b border-stroke dark:border-strokedark focus-visible:outline-none focus:border-waterloo dark:focus:border-manatee focus:placeholder:text-black dark:focus:placeholder:text-white py-3.5"
                                //required
                                />
                            <InputError messages={errors.email} className="mt-0.5" />
                        </View>
                    </View>
                    <View className="flex flex-col lg:flex-row lg:justify-between gap-7.5 lg:gap-14 mb-12.5">
                        <View className="w-full lg:w-1/2">
                            <TextInput
                                placeholder={t('ContactPage.Subject')}
                                placeholderTextColor={colorScheme === 'light' ? '#4b5563': '#e5e7eb'}
                                onChangeText={text => setSubject(text)}
                                value={subject}
                                className="w-full dark:text-white bg-transparent border-b border-stroke dark:border-strokedark focus-visible:outline-none focus:border-waterloo dark:focus:border-manatee focus:placeholder:text-black dark:focus:placeholder:text-white py-3.5"
                                />
                            <InputError messages={errors.subject} className="mt-0.5" />    
                        </View>
                        <View className="w-full lg:w-1/2">
                            <TextInput
                                placeholder={t('ContactPage.Phone')}
                                placeholderTextColor={colorScheme === 'light' ? '#4b5563': '#e5e7eb'}
                                onChangeText={text => setPhone(text)}
                                value={phone}
                                className="w-full dark:text-white bg-transparent border-b border-stroke dark:border-strokedark focus-visible:outline-none focus:border-waterloo dark:focus:border-manatee focus:placeholder:text-black dark:focus:placeholder:text-white py-3.5"
                                />
                            <InputError messages={errors.phone} className="mt-0.5" />
                        </View>
                    </View>
                   <View>
                        <TextInput
                            placeholder={`${t('ContactPage.Message')}*`}
                            placeholderTextColor={colorScheme === 'light' ? '#4b5563': '#e5e7eb'}
                            onChangeText={text => setMessage(text)}
                            value={message}
                            multiline
                            numberOfLines={4}
                            className="w-full dark:text-white bg-transparent border-b border-stroke dark:border-strokedark focus-visible:outline-none focus:border-waterloo dark:focus:border-manatee focus:placeholder:text-black dark:focus:placeholder:text-white pt-10 mb-4"
                            />
                    </View>
                    <View className="flex mb-11.5">
                        <InputError messages={errors.message} className="w-full mt-1" />
                    </View>
                    <View className="flex flex-wrap xl:justify-between">
                        <Pressable
                            onPress={() => {sendMessage();}}
                            disabled={pending}
                            className="inline-flex items-center flex-row bg-black hover:bg-blackho ease-in-out duration-300 dark:bg-btndark rounded-full px-6 py-3"
                            >
                            <Text 
                                className="font-medium text-white"
                            >{pending ? t('ContactPage.SendingMsg'): t('ContactPage.SendMsg')}</Text>
                            {pending ? 
                                (<ActivityIndicator size="small" color="white" />)
                            :
                                (<Ionicons name="arrow-forward" size={24} color="white" />)
                            }
                        </Pressable>
                    </View>
                    <View className="py-0.5 px-2">
                        <Text className="text-[#2d3748] dark:text-[#edf2f7]">
                        {success ? t('ContactPage.SendMsgSuccess'):''}
                        </Text>
                    </View>
                    </View>

                    <View>
                    <Text className="text-black dark:text-white text-2xl xl:text-sectiontitle4 font-semibold mb-2">
                        {t('ContactPage.FindUs')}
                    </Text>
                    <View className="mb-7 5">
                        <Text className="font-medium text-black dark:text-white text-metatitle3 mb-2">
                        {t('ContactPage.Email')}
                        </Text>
                        <View className="flex flex-row justify-start">
                            <Button 
                                title={contactData.email} 
                                onPress={() => openUrlLinking(`mailtp:${contactData.email}`)}
                             />
                        </View>
                    </View>
                    <View className="mb-7 5">
                        <Text className="font-medium text-black dark:text-white text-metatitle3 mb-2">
                        WhatsApp
                        </Text>
                        <View className="flex flex-row justify-start">
                            <Button 
                                title={showQRCode ? t('ContactPage.CloseQRCode'): t('ContactPage.OpenQRCode')} 
                                onPress={() => setShowQRCode(!showQRCode)}
                             />
                        </View>
                        {showQRCode &&
                        <View>
                           <Image 
                                source={require('@/assets/images/whatsapp_qrcode.jpg')} 
                                style={{width: 251.8, height: 248.5}}
                                />
                        </View>
                        }
                    </View>

                    </View>
                </View>    
            </View>
        </View> 
    );
}

export default Contact;
