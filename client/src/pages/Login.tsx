import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../redux/userThunk'
import { Link } from 'react-router-dom'
import { Ring } from 'ldrs/react'
import 'ldrs/react/Ring.css'

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const submitBtnRef = useRef<HTMLButtonElement>(null)

    const [showPwd, setShowPwd] = useState<boolean>(false)
    const [userData, setUserData] = useState({
        email: '',
        password: ''
    })

    const { signingin } = useSelector((store) => store.user)

    const setUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setUserData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const onLoginUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (userData.email && userData.password) {
            const res = await dispatch(loginUser(userData))
            if (res.payload.ok) {
                setUserData({
                    email: '',
                    password: ''
                })

                navigate('/', { replace: true })
            }
        }
    }

    return (
        <>
            <main className="h-screen w-screen bg-[#d9d9be] flex justify-center items-center">
                {
                    signingin
                        ? (
                            <div className='absolute z-1 h-full w-full bg-white/10 flex justify-center items-center backdrop-blur-sm'>
                                <Ring
                                    size="50"
                                    stroke="6"
                                    bgOpacity="0"
                                    speed="2"
                                    color="#eaaa4aff"
                                />
                            </div>
                        ) : null
                }

                <div className="relative w-[360px] bg-black h-[340px] right-[-10px] bottom-[-10px]">
                    <form
                        className="absolute w-[360px] h-[340px] right-[10px] bottom-[10px] border border-black bg-[#238B74] flex flex-col items-center justify-between py-4 px-6"
                        onSubmit={onLoginUser}
                    >
                        <h1 className="font-bold text-black text-3xl">LOGIN</h1>

                        <div className="w-full">
                            <label className="font-semibold" htmlFor="email">Email</label>
                            <input
                                className="w-full bg-black text-neutral-400 p-2 outline-0 mt-1"
                                placeholder="user@example.com"
                                type="email"
                                onChange={setUserInput}
                                name='email'
                            />
                        </div>

                        <div className="w-full">
                            <label className="font-semibold" htmlFor="password">Password</label>

                            <div
                                className="w-full bg-black text-neutral-400 mt-1 flex justify-between items-center"
                            >
                                <input
                                    className='outline-0 p-2 grow'
                                    placeholder="Confirm Password"
                                    type={!showPwd ? "password" : "text"}
                                    onChange={setUserInput}
                                    name='password'
                                />
                                <button
                                    type='button'
                                    className='h-full p-2 cursor-pointer'
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        setShowPwd(prev => !prev)
                                    }}
                                >{!showPwd ? "show" : "hide"}</button>
                            </div>
                        </div>

                        <div className="relative w-[156px] h-[42px] bg-black">
                            <button
                                type='submit'
                                className="absolute w-full right-[4px] bottom-[4px] bg-[#d9d9be] border border-black p-2 text-black font-bold cursor-pointer"
                                ref={submitBtnRef}
                                onMouseEnter={() => {
                                    submitBtnRef.current!.style.bottom = '1px'
                                    submitBtnRef.current!.style.right = '1px'
                                }}
                                onMouseLeave={() => {
                                    submitBtnRef.current!.style.bottom = '4px'
                                    submitBtnRef.current!.style.right = '4px'
                                }}
                            >
                                LOGIN
                            </button>
                        </div>

                        <p>Don't have an account?
                            <Link to='/register' className='pl-1 text-white/70 hover:text-white'>
                                Register here
                            </Link>
                        </p>
                    </form>
                </div>
            </main>
        </>
    )
}

export default Login