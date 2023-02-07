import '@/styles/globals.css'
import '@/styles/modal.style.css'
import SideBar from '@/components/SideBar'
import { useRouter } from 'next/router'
import ShareModal from '@/components/ShareModal'
import { ShareContextWrapper, useGeekContext } from '@/context/ShareModalContext'
import { Toaster } from 'react-hot-toast'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import Head from 'next/head'
import TagOptionsModal from '@/components/TagOptionsModal'
import FullSearchBar from '@/components/SearchBar'
try {
  TimeAgo.addDefaultLocale(en)
} catch (e) {
  console.log(e)
}
export default function App({ Component, pageProps }) {
  return (
    <ShareContextWrapper>
      <Head>
        <meta name="google-site-verification" content="LsSs0Uu_szcBdSa0kLK21udIohiOBy14mBEdJ0w4T3c" />
      </Head>
      <ShareModal />
      <TagOptionsModal />
      <div className='flex flex-row'>
        <SideBar />
        <Component {...pageProps} />
      </div>
      <Toaster position='bottom-right' toastOptions={{ duration: 2000 }} reverseOrder={false} />
      <FullSearchBar />
    </ShareContextWrapper>
  )
}
