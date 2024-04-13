import React, {useState, useEffect} from 'react';
import { MaterialIcons, FontAwesome, FontAwesome5, Entypo } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { View, Pressable, Modal, Text, FlatList, TouchableOpacity } from 'react-native';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import '@/i18n/i18n'; 
import {useTranslation} from 'react-i18next';


// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
/*
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}
*/

type itemProps = {
  label: string;
  value: string;
};

const data: itemProps[] = [
  { label: 'Engilsh', value: 'en' },
  { label: '中文', value: 'zhtw' },
];

export default function TabLayout() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const [modalVisible, setModalVisible] = useState(false);
  const {t, i18n} = useTranslation(); 
  const [currentLanguage,setLanguage] =useState<string>(i18n.language ?? 'en'); 
  const headerHeight = 100;

  useEffect(() => {
    if (!i18n.language){
      changeLanguage('en');
    }
  },[]);

  //const changeLanguage = value => { 
    //i18n 
      //.changeLanguage(value) 
      //.then(() => setLanguage(value)) 
      //.catch(err => console.log(err)); 
  //};
  
  async function changeLanguage(value: string) {
    try {
      await i18n.changeLanguage(value);
      setLanguage(value);
    }catch(err){
      console.log(err); 
    }
  }

  const onItemPress = async (item: itemProps) => {
    await changeLanguage(item.value);
    setModalVisible(false);
  };
  
  const renderItem = ({ item }: {item: itemProps}) => {
    return (
      <TouchableOpacity className={`px-6 py-3 ${item.value === currentLanguage ? 'bg-[#fde68a]':'bg-white'}`} onPress={() => onItemPress(item)}>
        <Text>{item.label}</Text>
      </TouchableOpacity>
    );
  } 

  return (
    <>
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
        headerStyle: {
          height: headerHeight, // Specify the height of your custom header
        },
        headerRight: () => (
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
            <Pressable onPress={() => setModalVisible(true)}>
              {({ pressed }) => (
                <MaterialIcons
                  name="translate"
                  size={28}
                  color={Colors[colorScheme ?? 'light'].text}
                  style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
            <Pressable onPress={toggleColorScheme}>
              {({ pressed }) => (
                <MaterialIcons
                  name={colorScheme ? (colorScheme === 'light' ? 'dark-mode': 'light-mode'): 'dark-mode'}
                  size={28}
                  color={Colors[colorScheme ?? 'light'].text}
                  style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
              )}
            </Pressable>
          </View>
      ),

      }}>
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: t('Navigation.HeadTitle'),
          title: t('Navigation.Home'),
          tabBarIcon: ({ color }) => <FontAwesome name="home" size={28}  style={{marginBottom: -3}} color={color} />,
        }}
      />
      <Tabs.Screen
        name="contact"
        options={{
          headerTitle: t('ContactPage.pagetitle'),
          title: t('Navigation.Contact'),
          tabBarIcon: ({ color }) =>  <MaterialIcons name="contact-page" size={28}  style={{marginBottom: -3}} color={color} />,
        }}
      />
      <Tabs.Screen
        name="projects"
        options={{
          headerTitle: t('ProjectPage.title'),
          title: t('Navigation.Projects'),
          tabBarIcon: ({ color }) =>  <MaterialIcons name="work" size={28}  style={{marginBottom: -3}} color={color} />,
        }}
      />
      <Tabs.Screen
        name="skills"
        options={{
          headerTitle: t('SkillsPage.title'),
          title: t('Navigation.Skills'),
          tabBarIcon: ({ color }) =>  <Entypo name="tools" size={28}  style={{marginBottom: -3}} color={color} />,
        }}
      />
      <Tabs.Screen
        name="blog"
        options={{
          headerTitle: t('Navigation.Blog'),
          title: t('Navigation.Blog'),
          tabBarIcon: ({ color }) =>  <FontAwesome5 name="blogger" size={28}  style={{marginBottom: -3}} color={color} />,
        }}
      />
    </Tabs>
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
        <TouchableOpacity
          className="w-full h-full"
          onPress={() => setModalVisible(false)}
        >
          <View className="absolute bg-white shadow-black shadow top-[100] right-[40]">
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </TouchableOpacity>
    </Modal>
    </>
  );
}
