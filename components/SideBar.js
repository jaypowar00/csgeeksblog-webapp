import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import StyleOutlinedIcon from '@mui/icons-material/StyleOutlined';
import LaunchOutlinedIcon from '@mui/icons-material/LaunchOutlined';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import PolicyOutlinedIcon from '@mui/icons-material/PolicyOutlined';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import HomeIcon from '@mui/icons-material/Home';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import { useGeekContext } from '../context/ShareModalContext';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRef } from 'react';

let timeout = null;
let long_timeout = null;
async function hoveredOnTag(status) {
    if (timeout != null) { clearTimeout(timeout); timeout = null; }
    let element = document.getElementById('sidebar-dynamic-section')
    if (status) {
        element.classList.add('sidebar-extra-width')
        timeout = setTimeout(() => {
            element.classList.remove('sidebar-extra-width')
        }, 2000);
    }
    else {
        element.classList.remove('sidebar-extra-width')
        if (timeout != null) { clearTimeout(timeout); timeout = null; }
    }
}

async function mobileLongPressDetect(status) {
    if (timeout != null) { clearTimeout(timeout); timeout = null; }
    if (long_timeout != null) { clearTimeout(long_timeout); long_timeout = null; }
    let element = document.getElementById('sidebar-dynamic-section')
    if (status) {
        long_timeout = setTimeout(() => {
            element.classList.add('sidebar-extra-width')
            timeout = setTimeout(() => {
                element.classList.remove('sidebar-extra-width')
            }, 2000);
        }, 100);
    }
    else {
        element.classList.remove('sidebar-extra-width')
        if (timeout != null) { clearTimeout(timeout); timeout = null; }
        if (long_timeout != null) { clearTimeout(long_timeout); long_timeout = null; }
    }
}

async function cancleAllTimeouts() {
    let element = document.getElementById('sidebar-dynamic-section')
    if (timeout) {
        clearTimeout(timeout)
        element.classList.remove('sidebar-extra-width')
    }

    if (long_timeout) {
        clearTimeout(long_timeout)
        element.classList.remove('sidebar-extra-width')
    }
}
function SideBar() {
    let { sidebarMinimize, setSidebarMinimize, userTagsShortcut } = useGeekContext()

    return (
        <div onScrollCapture={() => { cancleAllTimeouts() }} className={`hide-scrollbar sidebar-icon-section ${sidebarMinimize ? `sidebar-minimized` : ``}`} id="sidebar-dynamic-section">
            <div className={`sidebar-icon-section-bg transition-all duration-200 ${sidebarMinimize ? `sidebar-minimized` : ``}`}></div>
            <div className="sidebar-icon-container">
                <div className='sidebar-minimizer rounded-full'>
                    <ExpandMoreOutlinedIcon className='sidebar-icon-svg' onClick={() => { localStorage.setItem('minimized', !sidebarMinimize); setSidebarMinimize(!sidebarMinimize) }} />
                </div>
                <SideBarIcon text='Home' url="/" home={true} icon={<HomeIcon className='sidebar-icon-svg' />} />
                <SideBarIcon text='Posts' url="/posts" icon={<GridViewOutlinedIcon className='sidebar-icon-svg' />} />
                <SideBarIcon text='Search' url="/posts/search" icon={<SearchOutlinedIcon className='sidebar-icon-svg' />} />
                <SideBarIcon text='Authors' url="/posts/authors" icon={<StyleOutlinedIcon className='sidebar-icon-svg' />} />
                <SideBarIcon text='' icon={<AccountBoxOutlinedIcon className='sidebar-icon-svg' />} />
                <SideBarIcon text='Share' modalShareOpener={true} icon={<LaunchOutlinedIcon className='sidebar-icon-svg' />} />
                <SideBarIcon text='Privacy Policy' url="/privacypolicy" icon={<PolicyOutlinedIcon className='sidebar-icon-svg' />} />
                <SideBarIcon text='About' url="/about" icon={<InfoOutlinedIcon className='sidebar-icon-svg' />} />
                <hr className='sidebar-icon-linebreak' />
                {userTagsShortcut.map(userTag => (<UserAddedSideIcons key={userTag} tagName={userTag} />))}
            </div>
        </div>
    );
}

function SideBarIcon({ icon, text = 'tooltip', modalShareOpener = false, home = false, url = "#" }) {
    let { setModalShareOpen } = useGeekContext()
    const router = useRouter()
    const highlight = (url) === ((router.asPath.length <= 1) ? '/'
        : (router.asPath.replace('#', '').endsWith('/') ?
            router.asPath.replace('#', '').substring(0, router.asPath.replace('#', '').length - 1)
            : router.asPath.replace('#', '')))
    return (
        <Link href={url !== "#" ? url : router.asPath}>
            <div className={`sidebar-icon group ${highlight ? `bg-green-600 text-white` : ``}`} onClick={() => { (modalShareOpener) ? setModalShareOpen(true) : null }}
                onScrollCapture={() => { cancleAllTimeouts() }}
                onMouseEnter={() => { hoveredOnTag(true) }} onMouseLeave={() => { hoveredOnTag(false) }}
                onTouchStart={() => { mobileLongPressDetect(true) }} onTouchEnd={() => mobileLongPressDetect(false)}>
                {icon}
                <span className='sidebar-tooltip select-none group-hover:scale-100'>
                    {text}
                </span>
            </div>
        </Link>
    )
}

function UserAddedSideIcons({ tagName }) {
    const { setSelectedTag, setModalTagOptionsOpen } = useGeekContext()
    const router = useRouter()
    const isSingleClick = useRef()
    const tagname = `${tagName}`;
    const highlight = router.asPath === `/tag/${tagName}/posts`
    const handleOnClick = (e) => {
        e.preventDefault()
        clearTimeout(isSingleClick.current)
        if (e.detail === 1)
            isSingleClick.current = setTimeout(() => { router.push(`/tag/${tagName}/posts`) }, 200)
        else if (e.detail === 2)
            handleTagOptions()

        console.log('click')
    }
    const handleTagOptions = () => {
        setSelectedTag(tagName)
        setModalTagOptionsOpen(true)
    }
    return (
        <Link className="hover:!no-underline" href={`/tag/${tagName}/posts`}
            onClick={handleOnClick}
            onContextMenu={e => { e.preventDefault(); handleTagOptions() }}>

            <div className={`user-sidebar-icon sidebar-icon group ${highlight ? `bg-green-600 text-white` : ``}`}
                onScrollCapture={() => { cancleAllTimeouts() }}
                onMouseEnter={() => { hoveredOnTag(true) }} onMouseLeave={() => { hoveredOnTag(false) }}
                onTouchStart={() => { mobileLongPressDetect(true) }} onTouchEnd={() => mobileLongPressDetect(false)}>
                {tagname.substring(0, 2)}
                <span className='sidebar-tooltip select-none group-hover:scale-100'>
                    {tagName}
                </span>
            </div>
        </Link>
    )
}

export default SideBar;