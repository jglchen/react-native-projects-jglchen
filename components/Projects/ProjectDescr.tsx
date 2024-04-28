import { Projects } from '@/types/projects';
import { View, Text, Image, Pressable, Linking, Alert, Dimensions, StyleSheet } from 'react-native';
import { useState, useCallback } from 'react';
import {useTranslation} from 'react-i18next';
import TagButton from '../Utils/TagButton';
import ProjectTagButton from '../Utils/ProjectTagButton';
import { getImageSource } from '@/lib/imagesource';
import HTMLView from 'react-native-htmlview';
import { useColorScheme } from 'nativewind';

type Props = {
    project: Projects;
}

const ProjectDescr = ({ project }: Props) => {
    const { title, description, siteurl, appurl, source, nativepub, iosbuild, androidbuild, nativesource, siteimg, mobileimg, docker, tags, body } = project;
    const {t, i18n} = useTranslation(); 
    const { colorScheme } = useColorScheme();
    const windowWidth = Dimensions.get('window').width;
    const [width, setWidth] = useState(null);

    const onLayout = useCallback((event: any) => {
        const { width, height } = event.nativeEvent.layout;
        setWidth(width);
    }, []);
    
    const handlePress = async (url: string) => {
        // Checking if the link is supported for links with custom URL scheme.
        const supported = await Linking.canOpenURL(url);
    
        if (supported) {
          // Opening the link with some app, if the URL scheme is "http" the web link should be opened
          // by some browser in the mobile
          await Linking.openURL(url);
        } else {
          Alert.alert(`Don't know how to open this URL: ${url}`);
        }
    };
    
    return (
        <View onLayout={onLayout}>
            <Text className="mb-2 text-center text-xl font-bold leading-tight text-black dark:text-white sm:text-2xl sm:leading-tight">
            {title}
            </Text>
            <View className="mb-1 flex flex-row flex-wrap items-center justify-between border-b border-body-color border-opacity-10 pb-1 dark:border-white dark:border-opacity-10">
                {siteurl && <TagButton text={t('ProjectPage.ViewSite')} url={siteurl} />}
                {appurl && <TagButton text={t('ProjectPage.ViewApp')} url={appurl} />}
                {source && <TagButton text={t('ProjectPage.GitHub')} url={source} />}
                {nativepub && <TagButton text={t('ProjectPage.Expo')} url={nativepub} />}
                {iosbuild && <TagButton text={t('ProjectPage.iOS')} url={iosbuild} />}
                {androidbuild && <TagButton text={t('ProjectPage.Andriod')} url={androidbuild} />}
                {nativesource && <TagButton text={t('ProjectPage.GitHubMobile')} url={nativesource} />}
            </View>
            {docker && docker.split(' | ').length < 2 &&
            <View className="mb-2 border-b border-body-color border-opacity-10 pb-2 dark:border-white dark:border-opacity-10">
                <Text className="font-bold dark:text-white">
                Docker: {docker}
                </Text>
            </View>
            }
            {docker && docker.split(' | ').length > 1 &&
            <View className="mb-2 border-b border-body-color border-opacity-10 pb-2 dark:border-white dark:border-opacity-10">
                <Text className="font-bold dark:text-white">
                Docker:
                </Text>
                {docker.split(' | ').map((item, index) => <View key={index}><Text className="font-bold dark:text-white">{item}</Text></View>)}
            </View>
            }
            <View className="mb-1 flex flex-row flex-wrap items-center justify-between border-b border-body-color border-opacity-10 pb-1 dark:border-white dark:border-opacity-10">
            {tags?.map((tag, i) => 
                <ProjectTagButton 
                    key={i}
                    tag={tag}
                    text={tag.replace(/_/g, ' ')}
                />
            )}
            </View>
            <Text
                className="mb-4 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed"
                >
                {description}
            </Text>
            {siteimg && mobileimg &&
            <View className="mb-4 w-full flex flex-row justify-between">
                <View
                    className="w-[75%] rounded"
                    >
                    <Pressable onPress={() => handlePress((siteurl || appurl) as string)}>
                        <Image 
                            source={getImageSource(siteimg)}
                            style={{width: parseInt(width ?? '0')*0.75, height: parseInt(width ?? '0')*0.75*60/97}}
                            resizeMode="cover"
                            />
                    </Pressable>
                </View>
                <View
                    className="w-[24%] rounded"
                    >
                    <Pressable onPress={() => handlePress(nativepub as string)}>
                        <Image 
                            source={getImageSource(mobileimg)}
                            style={{width: parseInt(width ?? '0')*0.24, height: parseInt(width ?? '0')*0.24*54/27}}
                            resizeMode="cover"
                            />
                    </Pressable>
                </View>
            </View>
            }
            {siteimg && !mobileimg &&
            <View className="mb-4 w-full overflow-hidden rounded">
                <Pressable onPress={() => handlePress((siteurl || appurl) as string)}>
                    <Image 
                        source={getImageSource(siteimg)}
                        style={{width: parseInt(width ?? '0'), height: windowWidth>640 ? parseInt(width ?? '0')*48/97: parseInt(width ?? '0')*60/97}}
                        resizeMode="cover"
                        />
                </Pressable>
            </View>
            }
            <HTMLView
                value={body.html.replace(/<p>/g, '<div>').replace(/<\/p>/g, '</div>')}
                stylesheet={ colorScheme as string === 'light' ? lightViewStyle: darkViewStyle}
            />            
        </View>
    );    
} 

const lightViewStyle = StyleSheet.create({
    div: {
      color: '#000000',
      marginVertical: 2,
    },
    ul: {
        color: '#000000'
    },
    ol: {
        color: '#000000'
    },
    li: {
        color: '#000000'
    },
});

const darkViewStyle = StyleSheet.create({
    div: {
      color: '#FFFFFF',
      marginVertical: 2,
    },
    ul: {
        color: '#FFFFFF',
   
    },
    ol: {
        color: '#FFFFFF',
    },
    li: {
        color: '#FFFFFF',
    },
});

export default ProjectDescr;
