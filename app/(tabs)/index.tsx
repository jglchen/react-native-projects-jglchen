import { lazy, Suspense } from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import {useTranslation} from 'react-i18next';

export default function HomeScreen() {
  const {t, i18n} = useTranslation(); 
  
  let MainLines;
  switch(i18n.language ?? 'en') {
    case 'en':
      MainLines = lazy(async () => import(`@/components/Main/en/MainLines`));
      break;
    case 'zhtw':
      MainLines = lazy(async () => import(`@/components/Main/zh-tw/MainLines`));
      break;
    default:
      MainLines = lazy(async () => import(`@/components/Main/en/MainLines`));
  }
  
  return (
    <SafeAreaView className="flex-1 dark:bg-slate-800">
      <ScrollView>
        <View className="pt-4 md:pt-6 xl:pt-8 pb-3 xl:pb-4">
          <View className="mx-auto max-w-[800px] px-4 md:px-8 2xl:px-0">
            <Text className="mb-5 text-center text-2xl font-bold leading-tight text-black dark:text-white sm:text-3xl sm:leading-tight md:text-4xl md:leading-tight">
            {t('HomePage.description')}
            </Text>
            {MainLines &&
              <MainLines />
            }
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
  
}