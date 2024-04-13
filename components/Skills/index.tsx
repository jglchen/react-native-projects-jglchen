import { View, Dimensions } from 'react-native';
import React, { useState, useEffect } from "react";
import SingleSkill from "./SingleSkill";
import skillData from "./skillData";
import { Projects } from '@/types/projects';
import ProjectsDisplay from "../Projects/ProjectsDisplay";

const Skills = ({ projects }:{ projects: Projects[];}) => {
    const windowWidth = Dimensions.get('window').width;
    const [width, setWidth] = useState(100);
    const [skillSelected, setSkillSelected] = useState('');
    const projectsList = skillSelected ? projects.filter(project => project.skills?.includes(skillSelected)): [];
  
    useEffect(() => {
      if (windowWidth < 768){
         const gapX = 30; 
         const imgWidth = (windowWidth - 2 * 16 - 2 * gapX) / 3;
         setWidth(imgWidth);
      }else if (windowWidth >= 768){
         let gapX = 30; 
         if (windowWidth >= 1024){
            gapX = 50;
         }
         if (windowWidth >= 1280){
            gapX = 116;
         }
         const imgWidth = (Math.min(windowWidth, 1390) - 2 * 16 - 5 * gapX) / 6;
         setWidth(imgWidth);
      }
    },[]);
    
    function selectSkill(skill: string){
      setSkillSelected(skill);
    }
  
    return (
        <>
                 
        <View className="bg-alabaster dark:bg-black border border-x-0 border-y-stroke dark:border-y-strokedark">
            <View className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
                {/*
                <View className="grid grid-cols-3 md:grid-cols-6 gap-x-7.5 gap-y-7.5 lg:gap-x-12.5 xl:gap-x-29 justify-center items-center">
                */}
                <View className="flex flex-row flex-wrap justify-between items-center">
                {skillData.map(skill => (
                <View key={skill.srno} className="my-4">
                  <SingleSkill 
                    skill={skill} 
                    selectSkill={selectSkill} 
                    skillSelected={skillSelected}
                    imageStyle={{width: width, height: width}}
                    />
                </View>  
                ))}
                </View>
            </View>
            <View className="mx-auto max-w-c-1280 px-4 md:px-8 2xl:px-0 mt-14 xl:mt-18">
              <View className="pb-10 pt-10">
                <View className="container">
                <ProjectsDisplay
                  projects={projectsList}
                  />
                </View>
              </View>
            </View>
         </View>
        </>
    )
  };
  
  export default Skills;
  