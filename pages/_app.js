import '@/styles/globals.css'
import '@/styles/modal.style.css'
import SideBar from '@/components/SideBar'
import { useRouter } from 'next/router'
import ShareModal from '@/components/ShareModal'
import { ShareModalWrapper } from '@/context/ShareModalContext'
import { Toaster } from 'react-hot-toast'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
try{
  TimeAgo.addDefaultLocale(en)
}catch(e){
  console.log(e)
}

export default function App({ Component, pageProps }) {
  const router = useRouter()
  // console.log(router.basePath)
  return (
  <ShareModalWrapper>
    <ShareModal/>
    <div className='flex flex-row'>
      <SideBar />
      <div className='main-container'>
        <Component {...pageProps} />
      </div>
    </div>
    <Toaster position='bottom-right' toastOptions={{duration: 2000}} reverseOrder={false} />
  </ShareModalWrapper>
  )
}
