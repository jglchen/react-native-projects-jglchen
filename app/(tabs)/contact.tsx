import { SafeAreaView, ScrollView, Text, View, KeyboardAvoidingView, Platform } from 'react-native';
import {useTranslation} from 'react-i18next';
import Contact from '@/components/Contact';

export default function ContactScreen() {
  const {t, i18n} = useTranslation(); 

  return (
    <SafeAreaView className="flex-1 dark:bg-slate-800">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
        >
        <ScrollView>  
          <View className="mx-auto mt-4 xl:mt-5">
            <View className="container">
              <Text className="mx-auto text-center text-[#1f2937] dark:text-[#e5e7eb] md:w-4/5 lg:w-3/5 xl:w-[46%] px-4">
              {t('ContactPage.description')}
              </Text>
              <View className="pt-2 pb-4">
                <View className="container">
                  <Contact />
                </View>
              </View>  
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
