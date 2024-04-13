import { Link, Stack } from 'expo-router';
import { Text, View } from 'react-native';
import {useTranslation} from 'react-i18next';

export default function NotFoundScreen() {
  const {t, i18n} = useTranslation(); 
  
  return (
    <>
      <Stack.Screen 
        options={{ 
            title: t('NotFoundPage.Oops'),
            headerBackTitle: t('Navigation.BackPrev'),
        }} 
        />
      <View className="flex-1 items-center justify-center p-5">
        <Text className="text-xl font-bold dark:text-white">{t('NotFoundPage.title')}</Text>

        <Link href="/" className="mt-4 pt-4">
          <Text className="text-base text-black dark:text-white">{t('Navigation.BackHome')}!</Text>
        </Link>
      </View>
    </>
  );
}
