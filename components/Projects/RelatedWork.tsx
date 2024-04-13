import { View, Text, Image, Pressable, Linking, Alert, Dimensions, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { useState, useEffect, useCallback } from 'react';
//import {useTranslation} from 'react-i18next';
import { getImageSource } from '@/lib/imagesource';

const RelatedWork = ({
    title,
    siteimg,
    mobileimg,
    slug,
  }: {
    title: string;
    siteimg: string;
    mobileimg?: string;
    slug: string;
}) => {
    const [imgWidth, setImgWidth] = useState(70);
    const [imgHeight, setImgHeight] = useState(60);
    const [viewWidth, setViewWidth] = useState(null);

    const windowWidth = Dimensions.get('window').width;

    useEffect(() => {
        if (windowWidth >= 640){
            setImgWidth(85);
            setImgHeight(75);
        }
    },[]);

    const onLayout = useCallback((event: any) => {
        const { width, height } = event.nativeEvent.layout;
        setViewWidth(width);
    }, []);
    


    return (
        <View className="flex flex-row items-center lg:block xl:flex" onLayout={onLayout}>
            <Link href={{
                pathname: "/(tabs)/projects/[slug]",
                params: {slug: `${slug}`}
            }} asChild> 
                <Pressable>
                    <Image source={getImageSource(siteimg)} style={{width: imgWidth, height: imgHeight}} />
                </Pressable>
            </Link>
            <Link href={{
                pathname: "/(tabs)/projects/[slug]",
                params: {slug: `${slug}`}
            }} asChild> 
                <Pressable className="px-4" style={{width: viewWidth ? viewWidth-imgWidth: 0}}>
                    <Text
                        className="mb-[6px] block text-base font-medium leading-snug text-black hover:text-primary dark:text-white dark:hover:text-primary"
                    >{title}</Text>
                </Pressable>
            </Link>
        </View>
    );
};

export default RelatedWork;

  