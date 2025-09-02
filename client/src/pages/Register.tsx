import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { registerUser } from '../redux/userThunk'
import { Ring } from 'ldrs/react'
import 'ldrs/react/Ring.css'

const Register = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const submitBtnRef = useRef<HTMLButtonElement>(null)
    const createPwdRef = useRef<HTMLInputElement>(null)
    const confirmPwdRef = useRef<HTMLInputElement>(null)

    const { signingin } = useSelector((store) => store.user)

    const [showCreatePwd, setShowCreatePwd] = useState<boolean>(false)
    const [showConfirmPwd, setShowConfirmPwd] = useState<boolean>(false)
    const [newUserData, setNewUserData] = useState({
        name: '',
        email: '',
        password: ''
    })

    const setUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setNewUserData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const onRegisterUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (newUserData.name && newUserData.email && newUserData.password && (createPwdRef.current!.value === confirmPwdRef.current!.value)) {
            const res = await dispatch(registerUser(newUserData))
            if (res.payload.ok) {
                setNewUserData({    
                    name: '',
                    email: '',
                    password: ''
                })
                
                navigate('/', { replace: true })
            }
        }
    }

    return (
        <>
            <main className="relative h-screen w-screen bg-[#d9d9be] flex justify-center items-center">
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

                <div className="relative w-[360px] bg-black h-[500px] right-[-10px] bottom-[-10px]">
                    <form
                        className="absolute w-[360px] h-[500px] right-[10px] bottom-[10px] border border-black bg-[#b54a15] flex flex-col items-center justify-between py-4 px-6"
                        onSubmit={onRegisterUser}
                    >
                        <h1 className="font-bold text-black text-3xl">REGISTER</h1>

                        <div className="w-full">
                            <label className="font-semibold" htmlFor="name">Name</label>
                            <input
                                className="w-full bg-black text-neutral-400 p-2 outline-0 mt-1"
                                placeholder="Name"
                                type="text"
                                onChange={setUserInput}
                                name='name'
                            />
                        </div>

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
                            <label className="font-semibold" htmlFor="password">Create Password</label>

                            <div
                                className="w-full bg-black text-neutral-400 mt-1 flex justify-between items-center"
                            >
                                <input
                                    className='outline-0 p-2 grow'
                                    placeholder="Create Password"
                                    type={!showCreatePwd ? "password" : "text"}
                                    ref={createPwdRef}
                                />
                                <button
                                    type='button'
                                    className='h-full p-2 cursor-pointer'
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        setShowCreatePwd(prev => !prev)
                                    }}
                                >{!showCreatePwd ? "show" : "hide"}</button>
                            </div>
                        </div>

                        <div className="w-full">
                            <label className="font-semibold" htmlFor="password">Confirm Password</label>

                            <div
                                className="w-full bg-black text-neutral-400 mt-1 flex justify-between items-center"
                            >
                                <input
                                    className='outline-0 p-2 grow'
                                    placeholder="Confirm Password"
                                    type={!showConfirmPwd ? "password" : "text"}
                                    ref={confirmPwdRef}
                                    onChange={setUserInput}
                                    name='password'
                                />
                                <button
                                    type='button'
                                    className='h-full p-2 cursor-pointer'
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        setShowConfirmPwd(prev => !prev)
                                    }}
                                >{!showConfirmPwd ? "show" : "hide"}</button>
                            </div>
                        </div>

                        <div className="relative w-[168px] h-[42px] bg-black">
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
                                CREATE ACCOUNT
                            </button>
                        </div>

                        <p>Already have an account?
                            <Link to='/login' className='pl-1 text-white/70 hover:text-white'>
                                Log in
                            </Link>
                        </p>
                    </form>
                </div>
            </main>
        </>
    )
}

export default Register