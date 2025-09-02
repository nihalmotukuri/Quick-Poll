import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { logoutUser } from "../redux/userThunk.ts"

const Header = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { userData } = useSelector((store) => store.user)

    console.log(userData)

    return (
        <>
            <div className="fixed z-10 h-[80px] max-w-[1200px] w-full inset-0 mx-auto bg-black border-2 border-black top-6">
                <header
                    className="absolute h-[80px] w-full bg-[#d9d9be] border-2 border-black bottom-2 right-2 flex justify-between items-center px-5"
                >
                    <span className="font-bold text-xl">QUICK POLL</span>

                    {userData
                        ? (
                            <div className="flex gap-[24px]">
                                <p className="text-[21px] pt-1">Welcome, {userData.name || "Voter"}!</p>

                                <div className="relative w-[156px] h-[42px] bg-black">
                                    <button
                                        className="absolute w-full right-[4px] bottom-[4px] bg-[#ff3b6b] border border-black p-2 text-black font-bold cursor-pointer btn-hover"
                                        onClick={() => {
                                            dispatch(logoutUser())
                                            navigate('/login')
                                        }}
                                    >
                                        LOGOUT
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex gap-5">
                                <div className="relative w-[156px] h-[42px] bg-black">
                                    <button
                                        className="absolute w-full right-[4px] bottom-[4px] bg-[#b54a15] border border-black p-2 text-black font-bold cursor-pointer btn-hover"
                                        onClick={() => navigate('/register')}
                                    >
                                        REGISTER
                                    </button>
                                </div>

                                <div className="relative w-[156px] h-[42px] bg-black">
                                    <button
                                        className="absolute w-full right-[4px] bottom-[4px] bg-[#238B74] border border-black p-2 text-black font-bold cursor-pointer btn-hover"
                                        onClick={() => navigate('/login')}
                                    >
                                        LOGIN
                                    </button>
                                </div>
                            </div>
                        )
                    }
                </header>
            </div>
        </>
    )
}

export default Header