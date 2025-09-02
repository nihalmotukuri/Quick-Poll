import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getLatestPolls, getPolls } from "../redux/pollsThunk.ts"
import Header from "../components/Header"
import { Ring } from 'ldrs/react'
import 'ldrs/react/Ring.css'
import { useEffect } from "react"
import MyPolls from "../components/MyPolls.tsx"
import LatestPolls from "../components/LatestPolls.tsx"
import CreatePoll from "../components/CreatePoll.tsx"

const Home = () => {
  const dispatch = useDispatch()
  const [showCreatePoll, setShowCreatePoll] = useState<boolean>(false)

  const { userData, userLoading } = useSelector((store) => store.user)
  // const { latestPollsList, latestPollsLoading, pollsList, pollsLoading } = useSelector((store) => store.polls)

  useEffect(() => {
    // const timer = setTimeout(() => {
      dispatch(getLatestPolls())
      dispatch(getPolls())
    // }, 500)

    // return () => clearTimeout(timer)
  }, [dispatch])

  const totalVotes = (options) => (
    options.reduce((votes, currOpt) => votes + currOpt.votes, 0)
  )

  return (
    <>
      {userLoading
        ? (
          <div className='h-screen w-screen bg-neutral-900 flex justify-center items-center backdrop-blur-sm]'>
            <Ring
              size="50"
              stroke="6"
              bgOpacity="0"
              speed="2"
              color="#eaaa4aff"
            />
          </div>
        ) : (
          <>
            <Header />

            <main className="relative min-h-screen bg-[#d9d9be] pt-[140px] pb-[42px]">
              { showCreatePoll && <CreatePoll setShowCreatePoll={setShowCreatePoll} /> }

              <LatestPolls />

              {userData
                ? <MyPolls setShowCreatePoll={setShowCreatePoll} />
                : null
              }
            </main>
          </>
        )
      }
    </>
  )
}

export default Home