import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setPoll } from '../redux/pollsSlice'

const MyPollsListItem = ({ poll }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [onHover, setOnHover] = useState<boolean>(false)

    const totalVotes = (options) => (
        options.reduce((votes, currOpt) => votes + currOpt.votes, 0)
    )

    return (
        <li
            className="relative flex items-start py-2 px-4 cursor-pointer border-l-3 hover:border-white/60 hover:bg-black/10 border-transparent"
            onMouseEnter={() => setOnHover(true)}
            onMouseLeave={() => setOnHover(false)}
            onClick={() => {
                dispatch(setPoll(poll))
                navigate(`/polls/${poll._id}`)
            }}
        >
            <span className="text-[28px] mt-[-16px] pr-2">--</span>

            <div className="mt-[-6px]">
                <p className="text-lg">{poll.question}</p>
                <p className="text-[14px]">( {totalVotes(poll.options)} votes )</p>
            </div>

            <div className={`absolute z-1 top-2 right-4 flex gap-2 ${onHover ? '' : 'hidden'}`}>
                <button className="px-1 text-xs bg-black cursor-pointer">EDIT</button>
                <button className="px-1 text-xs bg-black cursor-pointer">DELETE</button>
            </div>
        </li>
    )
}

export default MyPollsListItem