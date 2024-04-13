import { SafeAreaView, Text, View, Pressable } from 'react-native';
import { Link, Stack } from 'expo-router';
import {useTranslation} from 'react-i18next';
import { AntDesign } from '@expo/vector-icons';



export default function BlogScreen() {
  const {t, i18n} = useTranslation(); 


  return (
    <SafeAreaView className="flex-1 dark:bg-slate-800">
      <View className="flex-1 items-center justify-center p-5">
        <Text className="text-xl font-bold dark:text-white">{t('ComingPage.title.blog')}</Text>
        <View className="my-6">
          <Text
            className="text-[#1f2937] dark:text-[#e5e7eb]"
            >{t('ComingPage.description')}</Text>
        </View>
        <Link href="/" asChild>
          <Pressable
            className="inline-flex flex-row items-center bg-black dark:bg-btndark hover:bg-blackho ease-in-out duration-300  rounded-full px-6 py-3"
            >
            <Text className="text-lg text-white font-medium">{t('Navigation.BackHome')}</Text>
            <AntDesign
              name="arrowright"
              size={24}
              color={'white'}
              style={{ marginLeft: 10 }}
              />
          </Pressable>
        </Link>
      </View>
    </SafeAreaView>
  );
  
}
