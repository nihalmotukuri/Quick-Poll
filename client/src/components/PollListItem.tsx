// import { useRef } from "react"
import { HiOutlineChevronRight } from "react-icons/hi"

const PollListItem = ({ poll }: { poll: string }) => {
    // const listItemRef = useRef<HTMLDivElement>(null)

    return (
        <li
            className="relative h-[50px] flex items-center px-4 cursor-pointer border border-transparent hover:border-white"
                        onClick={() => {
                            dispatch(setPoll(poll))
                            navigate(`/polls/${poll._id}`)
                        }}
        >
            <span className="text-2xl pr-2">--</span>
            <p className="text-lg">{poll.question}</p>
            <div className="ml-auto">
                <HiOutlineChevronRight />
            </div>
        </li>
    )
}

export default PollListItem