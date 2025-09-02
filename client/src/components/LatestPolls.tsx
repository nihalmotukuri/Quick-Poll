import { useSelector } from 'react-redux'
import { Ring } from 'ldrs/react'
import 'ldrs/react/Ring.css'
import LatestPollsListItem from './LatestPollsListItem'

const LatestPolls = () => {
    const { latestPollsList, latestPollsLoading } = useSelector((store) => store.polls)

    return (
        <>
            <div
                className="relative max-w-[940px] w-full bg-[#00A8FF] border-2 border-black m-auto text-white p-5"
            >
                <div className='absolute right-[-10px] top-[10px] w-[10px] h-full bg-[#1a1a1a]'></div>
                <div className='absolute bottom-[-10px] left-[10px] w-full h-[10px] bg-[#1a1a1a]'></div>

                {latestPollsLoading && !latestPollsList
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
                    )
                    : (
                        <>
                            <div className='border-b-2 border-black pb-2'>
                                <h1 className="text-2xl font-medium">Here are the latest polls</h1>
                            </div>
                            {latestPollsList && latestPollsList.length > 0
                                ? (
                                    <ul className="mt-4">
                                        {
                                            latestPollsList.map((poll, idx) => (
                                                <LatestPollsListItem key={idx} poll={poll} />
                                            ))
                                        }
                                    </ul>
                                )
                                : (
                                    <p className="text-lg font-medium mt-4 px-4">
                                        Looks quiet in here... Time to get a discussion started!
                                    </p>
                                )

                            }
                        </>
                    )
                }
            </div>
        </>
    )
}

export default LatestPolls