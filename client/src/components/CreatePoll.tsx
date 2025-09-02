import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { createPoll } from "../redux/pollsThunk"

const CreatePoll = ({ setShowCreatePoll }) => {
    const dispatch = useDispatch()
    const [question, setQuestion] = useState('')
    const [options, setOptions] = useState([])
    const [newOption, setNewOption] = useState('')

    const onCreatePoll = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(createPoll({ question, options }))
        setShowCreatePoll(false)
    }

    return (
        <div className="absolute top-0 z-20 h-full w-full bg-black/50 backdrop-saturate-70 flex justify-center items-center">
            <form
                onSubmit={onCreatePoll}
                className="relative p-5 bg-[#A3C1AD] w-[600px] border-2 border-black"
            >
                <div className="absolute h-full w-[10px] right-[-10px] top-[10px] bg-black"></div>
                <div className="absolute h-[10px] w-full bottom-[-10px] left-[10px] bg-black"></div>

                <div className="flex justify-between border-b-2 border-black text-2xl font-semibold mb-3">
                    <span>CREATE A NEW POLL</span>
                    <button
                        className="px-2 cursor-pointer"
                        onClick={() => setShowCreatePoll(false)}
                    >X</button>
                </div>

                <label className="text-xl font-medium" htmlFor="question">Question:</label>
                <div className="flex w-full mb-3">
                    <span className="text-3xl">[</span>
                    <input
                        type="text"
                        className="w-full border border-black text-lg border-none outline-none px-1 pt-1"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                    />
                    <span className="text-3xl">]</span>
                </div>

                <span className="text-xl font-medium">Options:</span>
                <ul className="my-1 min-h-[36px]">
                    {options.map((opt, idx) => (
                        <li className="flex justify-between p-1 pl-2 border border-black mb-1" key={idx}>
                            <p className="flex">{++idx}. <span className="w-[10px] block"></span>{opt}</p>
                            <button
                                className="cursor-pointer px-2"
                                onClick={() => {
                                    const modifiedOptions = options.filter((_, i) => i !== idx)
                                    setOptions(modifiedOptions)
                                }}
                            >X</button>
                        </li>
                    ))}
                </ul>

                <div className="flex items-center">
                    <span className="text-3xl">[</span>
                    <input
                        type="text"
                        placeholder="Add Option"
                        className="border-none outline-none px-1 pt-1"
                        value={newOption}
                        onChange={(e) => setNewOption(e.target.value)}
                    />
                    <span className="text-3xl">]</span>
                    <button
                        type="button"
                        className="text-3xl bg-black text-[#a0aec0] size-[24px] flex justify-center items-center mt-1 cursor-pointer"
                        onClick={() => {
                            setOptions(prev => [...prev, newOption])
                            setNewOption('')
                        }}
                    >+</button>
                </div>

                <div className="flex justify-end">
                    <button
                        className="border border-transparent hover:border-black p-2 cursor-pointer mb-[-12px]"
                        type="submit"
                    >PUBLISH POLL</button>
                </div>
            </form>
        </div>
    )
}

export default CreatePoll