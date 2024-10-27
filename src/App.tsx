import { useEffect, useState } from "react";
import "./App.css";
// import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/toggle-theme";

import { ArticleCard } from "@/components/articleCard";
// import { cn } from "@/lib/utils";
import { HeroHighlight, Highlight } from "@/components/ui/background-hero-highlight";
import { motion } from "framer-motion";
import GithubSnake from "@/components/GithubSnake";
import { StackIcons } from "@/components/StackIcons";
import { ExtraStackIcons } from "@/components/ExtraStackIcons";
import Sns from "@/components/Sns";
import { useTypingText } from "@/components/useTypingText";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";


const workerAPI = "https://wokerd1-blue-math-ewq.1790414525klz.workers.dev"
const showingPageURL = "https://tiptap-blog-showing.pages.dev"

function App() {
    const [allArticles, setAllArticles] = useState<any[]>([])
    const [hovered, setHovered] = useState<number | null>(null);


    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`${workerAPI}/api/all_doc`);
            const data = await res.json();
            console.log(data)
            setAllArticles(data)
        };
        fetchData();
    }, [])

    function formatTimestamp(timestamp: number): string {
        const date = new Date(timestamp * 1000);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');

        return `${year}-${month}-${day}-${hours}:${minutes}`;
    }

    const { word } = useTypingText(
        ["Hi🤗", "泥嚎😆", "こんにちは😇"],
        130, //keyspeed
        20 //maxPauseAmount
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => { }

    return (
        <>
            <HeroHighlight />
            <div className="relative z-10 min-h-screen overflow-y-auto p-10 w-[calc(100vw-16px)] ml-[8px]">
                <motion.h1
                    initial={{
                        opacity: 0,
                        y: 20,
                    }}
                    animate={{
                        opacity: 1,
                        y: [20, -5, 0],
                    }}
                    transition={{
                        duration: 0.5,
                        ease: [0.4, 0.0, 0.2, 1],
                    }}
                    className="text-2xl mt-12 px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto "
                >
                    <p>{word}</p>
                    <br />
                    This is
                    <Highlight className="text-black dark:text-white ml-2">
                        klz's blog
                    </Highlight>
                </motion.h1>

                <motion.h1
                    initial={{
                        opacity: 0,
                        y: 20,
                    }}
                    animate={{
                        opacity: 1,
                        y: [20, -5, 0],
                    }}
                    transition={{
                        duration: 0.5,
                        ease: [0.4, 0.0, 0.2, 1],
                    }}
                    className="text-md mt-12 px-4 md:text-md lg:text-lg  text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto "
                >
                    There should be some self-introduction here.<br />
                    But I have no idea what to write now.<br />
                    just leave it blank as a placeholder
                </motion.h1>

                <Sns className="mt-24" />


                <div className="my-8 max-w-[768px] mx-auto">
                    <GithubSnake />
                </div>

                <div className="mt-20 mb-28">
                    <StackIcons />
                    <div className="flex justify-center mt-2">
                        <ExtraStackIcons />
                    </div>

                </div>

                <div className="mb-16">
                    <PlaceholdersAndVanishInput
                        placeholders={[
                            "i don't think a search bar is necessary",
                            "i hope it can do fuzzy text search",
                            "u really need a search function?"
                        ]}
                        onChange={handleChange}
                        onSubmit={onSubmit}
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center max-w-7xl mx-auto px-4">
                    {allArticles.map((article, index) => (
                        <ArticleCard
                            key={index}
                            index={index}
                            hovered={hovered}
                            setHovered={setHovered}
                            className="h-[300px] w-full sm:max-w-[calc(50vw-3rem)] lg:max-w-[calc(33.33vw-3rem)] xl:max-w-[calc(25vw-3rem)] flex flex-col justify-center items-center cursor-pointer"
                            onClick={() => {
                                window.location.href = `${showingPageURL}/${article.id}`
                            }}
                        >
                            <p className="text-xl font-bold relative z-20 mt-2 text-white">
                                {article.title}
                            </p>
                            <div className="text-neutral-200 mt-4 relative z-20">
                                {formatTimestamp(article.update_time)}
                            </div>
                            <p className="text-neutral-300 mt-6 relative z-20 text-sm">
                                Ensuring your account is properly secured helps protect your personal
                                information and data.
                            </p>
                        </ArticleCard>
                    ))}
                </div>

                <div className="z-20 flex gap-2 justify-center mt-10">
                    <ModeToggle />
                </div>
            </div>
        </>
    );
}

export default App;
