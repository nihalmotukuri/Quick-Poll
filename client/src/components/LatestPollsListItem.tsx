import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setPoll } from '../redux/pollsSlice.ts'
import { HiOutlineChevronRight } from "react-icons/hi"

const LatestPollsListItem = ({ poll }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const totalVotes = (options) => (
        options.reduce((votes, currOpt) => votes + currOpt.votes, 0)
    )

    return (
        <li
            className="relative flex items-start py-2 px-4 cursor-pointer border-l-3 hover:border-white/60 hover:bg-white/10 border-transparent"
            onClick={() => {
                dispatch(setPoll(poll))
                navigate(`/polls/${poll._id}`)
            }}
        >
            <span className="text-[28px] mt-[-16px] pr-2">--</span>

            <div className="mt-[-6px]">
                <p className="text-lg">{poll.question}</p>
                <p className="text-[14px]">( Asked by {poll.creator_name} | {totalVotes(poll.options)} votes )</p>
            </div>

            <div className="ml-auto">
                <HiOutlineChevronRight />
            </div>
        </li>
    )
}

export default LatestPollsListItem