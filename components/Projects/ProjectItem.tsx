import { Projects } from '@/types/projects';
import { View, Text, Image, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { useState, useCallback } from 'react';
import {useTranslation} from 'react-i18next';
import { getImageSource } from '@/lib/imagesource';

const ProjectItem = ({ project }: { project: Projects;}) => {
  const {t, i18n} = useTranslation(); 
  const { title, description, siteimg, tags, _id } = project;
  const locale = i18n.language ?? 'en';
  const loc = locale === 'zhtw' ? 'zh-tw': locale;
  const slug = _id.replace('projects/','').replace('_'+loc,'').replace('.mdx','');
  const [width, setWidth] = useState(null);

  const onLayout = useCallback((event: any) => {
    const { width, height } = event.nativeEvent.layout;
    setWidth(width);
  }, []);
  
  let tagIndex = 0;
  if (tags && tags.length){
     tagIndex = Math.floor(Math.random() * tags.length);
  }
  
  return (
    <View
      className="animate_top bg-white dark:bg-blacksection rounded-lg"
      >
      <View className="p-3 sm:p-4 md:px-3 md:py-4 lg:p-4 xl:px-2.5 xl:py-4 2xl:p-4">
          <View className="w-full relative block" onLayout={onLayout}>  
            {tags && tags.length &&
            <View className="absolute right-6 top-6 z-20 inline-flex items-center justify-center rounded-full bg-primary px-4 py-2">
              <Text className=" text-sm font-semibold text-white">
              {tags[tagIndex].replace(/_/g, ' ')}
              </Text>
            </View>
            }
            <Link href={{
              pathname: "/(tabs)/projects/[slug]",
              params: {slug: `${slug}`}
            }} asChild> 
              <Pressable>
                <Image source={getImageSource(siteimg)} style={{width: parseInt(width ?? '0'), height: parseInt(width ?? '0')*22/37}} />
              </Pressable>
            </Link>
        </View>
        <Link href={{
          pathname: "/(tabs)/projects/[slug]",
          params: {slug: `${slug}`}

        }} asChild> 
          <Pressable>
            <Text className="mb-1 block text-xl font-bold text-black hover:text-primary dark:text-white dark:hover:text-primary sm:text-2xl">
            {title}
            </Text>
          </Pressable>
        </Link>
        <View>
          <Text className="text-base font-medium text-body-color dark:text-white">
          {description}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ProjectItem;
