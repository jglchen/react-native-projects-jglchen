import { View, Text } from 'react-native';
import {useTranslation} from 'react-i18next';
import { Projects } from '@/types/projects';
import RelatedWork from './RelatedWork';
import LinkTagButton from "../Utils/LinkTagButton";

const ProjectSidebar = ({slug, projects, tagList}: {slug: string; projects: Projects[]; tagList: string[];}) => {
    const {t, i18n} = useTranslation(); 
    const locale = i18n.language ?? 'en';
    const keySlugElms = slug.split('-');  
    const _id = `projects/${slug}${locale === 'zhtw' ? '_zh-tw':''}.mdx`;

    const relatedWorks = projects.filter(item => item._id !== _id)
                          .map(project => {
                            const keyElms = project._raw.sourceFileName.replace('_'+(locale === 'zhtw' ? 'zh-tw':locale), '')
                                              .replace('.mdx','').split('-');
                          
                            let score = 0;  
                            for (let elm of keyElms) {
                                if (keySlugElms.includes(elm)){
                                  score += 3;
                                }
                            }                 

                            return  {
                               title: project.title,
                               siteimg: project.siteimg,
                               mobileimg: project.mobileimg,
                               //url: project.url.replace('_'+(locale === 'zhtw' ? 'zh-tw':locale),'').replace('projects/',''),
                               slug: project._id.replace('_'+(locale === 'zhtw' ? 'zh-tw':locale),'').replace('projects/','').replace('.mdx',''),
                               score
                            };                
                          }).sort(
                            (a, b) => b.score - a.score
                          ).slice(0, 3);

    return (
      <>  
        <View className="shadow-three mb-3 rounded-sm bg-white dark:bg-[#221822] dark:shadow-none">
            <Text className="border-b border-body-color border-opacity-10 px-2 py-4 text-lg font-semibold text-black dark:border-white dark:border-opacity-10 dark:text-white">
            {t('ProjectPage.RelatedWorks')}
            </Text>
            <View className="p-2">
                {relatedWorks.map(work => 
                <View key={work.slug} className="mb-6 border-b border-body-color border-opacity-10 pb-6 dark:border-white dark:border-opacity-10">
                    <RelatedWork 
                        title={work.title}
                        siteimg={work.siteimg}
                        mobileimg={work.mobileimg}
                        slug={work.slug}
                    />
                </View>
                )}
            </View>  
        </View>
        
        <View className="shadow-three mb-3 rounded-sm bg-white dark:bg-[#221822] dark:shadow-none">
            <Text className="border-b border-body-color border-opacity-10 px-2 py-4 text-lg font-semibold text-black dark:border-white dark:border-opacity-10 dark:text-white">
            {t('ProjectPage.PopularTags')}
            </Text>
            <View className="flex flex-row flex-wrap px-2 py-2">
            {tagList.slice(0,6).map((tag, index) =>
              <LinkTagButton 
                key={index}
                tag={tag}
                text={tag.replace(/_/g, ' ')}
              />
            )}  
            </View>
        </View>
      </>   
    );

}  

export default ProjectSidebar;

