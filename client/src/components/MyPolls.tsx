import { useSelector } from "react-redux"
import { Ring } from 'ldrs/react'
import 'ldrs/react/Ring.css'
import MyPollsListItem from "./MyPollsListItem"

const MyPolls = ({ setShowCreatePoll }) => {
    const { pollsList, pollsLoading } = useSelector((store) => store.polls)
    
    return (
        <>
            <div
                className="relative max-w-[940px] w-full bg-[#d07353] border-2 border-black m-auto text-white p-5 mt-[28px]"
            >
                <div className='absolute right-[-10px] top-[10px] w-[10px] h-full bg-[#1a1a1a]'></div>
                <div className='absolute bottom-[-10px] left-[10px] w-full h-[10px] bg-[#1a1a1a]'></div>

                {pollsLoading && !pollsList
                    ? (
                        <div
                            className="h-[100px] w-full flex justify-center items-center"
                        >
                            <Ring
                                size="50"
                                stroke="6"
                                bgOpacity="0"
                                speed="2"
                                color="#ffffff9c"
                            />
                        </div>
                    ) : (
                        <>
                            <div className="flex justify-between items-center pb-2 border-b-2 border-black">
                                <h1 className="text-2xl font-medium">My Polls</h1>

                                <div className="relative w-[156px] h-[42px] bg-black">
                                    <button
                                        className="absolute w-full right-[4px] bottom-[4px] bg-[#F7FAFC] border border-black p-2 text-black font-bold cursor-pointer btn-hover"
                                        onClick={() => setShowCreatePoll(true)}
                                    >
                                        CREATE POLL
                                    </button>
                                </div>
                            </div>

                            {pollsList && pollsList.length > 0
                                ? (
                                    <ul className="mt-4">
                                        {
                                            pollsList.map((poll, idx) => (
                                                <MyPollsListItem key={idx} poll={poll} />
                                            ))
                                        }
                                    </ul>
                                )
                                : (
                                    <p className="text-lg font-medium mt-4 px-4">No polls created. Let's make your first one!</p>
                                )
                            }
                        </>
                    )
                }
            </div>
        </>
    )
}

export default MyPolls