import { useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { getPoll, vote } from "../redux/pollsThunk.ts"
import Header from "../components/Header"
import { Ring } from 'ldrs/react'
import 'ldrs/react/Ring.css'
import { motion } from "framer-motion"

const Poll = () => {
    const params = useParams()
    const dispatch = useDispatch()
    const { poll, pollLoading } = useSelector((store) => store.polls)
    const { userData } = useSelector((store) => store.user)

    useEffect(() => {
        // const timer = setTimeout(() => {
        console.log(poll)
        if (!poll) {
            dispatch(getPoll(params.pollId))
        }
        //     }, 500)
        //     // console.log('hi')
        //     return () => clearTimeout(timer)
    }, [dispatch, params.pollId, poll])

    const totalVotes = (options) => (
        options.reduce((votes, currOpt) => votes + currOpt.votes, 0)
    )

    return (
        <>
            <Header />

            <main className="min-h-screen bg-[#d9d9be] pt-[140px]">
                <div className="max-w-[940px] w-full m-auto text-xl">
                    <Link to='/'>{"< Back to all polls"}</Link>
                </div>

                <div
                    className='relative top-2 left-2 max-w-[940px] w-full bg-[#8F9779] m-auto mt-[28px] border-2 border-black p-5 text-white'
                >
                    <div className="absolute right-[-10px] top-[10px] h-full w-[10px] bg-black"></div>
                    <div className="absolute bottom-[-10px] left-[10px] h-[10px] w-full bg-black"></div>

                    {pollLoading || !poll || poll._id !== params.pollId
                        ? (
                            <div
                                className="h-[100px] w-full m-auto flex justify-center items-center"
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
                                <p className="text-[28px] leading-8 mb-1">{poll.question}</p>
                                <p className="text-lg pl-1">
                                    Total Votes: {totalVotes(poll.options)} votes
                                </p>

                                <div className="h-[2px] w-full bg-black my-4"></div>

                                {poll.voted_users && !poll.voted_users.some(user => user.email === userData.email)
                                    ? (
                                        <ul className="px-4 flex flex-col gap-2">
                                            {poll.options.map((opt, idx) => (
                                                <li
                                                    key={idx}
                                                    className="my-1 p-3 text-xl cursor-pointer border-2 border-[#1A1A1A] hover:border-white/60 hover:bg-black/10"
                                                    onClick={() => {
                                                        dispatch(vote({ pollId: poll._id, optionId: opt.id }))
                                                    }}
                                                >
                                                    {opt.text}
                                                </li>
                                            ))}
                                        </ul>
                                    )
                                    : (
                                        <ul>
                                            {poll.options.map((opt) => (
                                                <li
                                                    key={opt.id}
                                                    className="px-3 pb-4"
                                                >
                                                    <div className="flex justify-between">
                                                        <p className="text-[22px]">{opt.text} {opt.id === poll.voted_users.find(user => user.email === userData.email).option ? "(Your Vote)" : ""}</p>
                                                        <span>{Math.round((opt.votes / totalVotes(poll.options)) * 100)}%</span>
                                                    </div>

                                                    <div className="flex items-center text-2xl">
                                                        <div className="w-full bg-black/20 h-[20px] mt-1 rounded-full border border-black">
                                                            <motion.div
                                                                className="h-full bg-white rounded-full"
                                                                initial={{ width: 0 }}
                                                                animate={{ width: `${(opt.votes / totalVotes(poll.options)) * 100}%` }}
                                                                transition={{ duration: 1.5, ease: "easeOut" }}
                                                            >
                                                            </motion.div>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    )
                                }
                            </>
                        )
                    }
                </div>
            </main>
        </>
    )
}

export default Poll