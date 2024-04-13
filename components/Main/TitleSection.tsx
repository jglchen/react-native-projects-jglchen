"use client";
import { motion } from "framer-motion";

const TitleSection = ({mainTitle}: {mainTitle: string;}) => {

    return (
        
        <motion.div
            variants={{
                hidden: {
                opacity: 0,
                y: -20,
            },

                visible: {
                    opacity: 1,
                    y: 0,
                },
            }}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 1, delay: 0.1 }}
            viewport={{ once: true }}
            className="animate_top text-center mx-auto"
        >
            <h1 className="mb-5 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
            {mainTitle}
            </h1>
        </motion.div>

    );
};

export default TitleSection;
