import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import StyleOutlinedIcon from '@mui/icons-material/StyleOutlined';
import LaunchOutlinedIcon from '@mui/icons-material/LaunchOutlined';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import PolicyOutlinedIcon from '@mui/icons-material/PolicyOutlined';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import HomeIcon from '@mui/icons-material/Home';
import { useShowModalContext } from '../context/ShareModalContext';
import { useRouter } from 'next/router';

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
    return (
        <div onScrollCapture={() => { cancleAllTimeouts() }} className='hide-scrollbar sidebar-icon-section' id="sidebar-dynamic-section">
            <div className="sidebar-icon-container">
                <SideBarIcon text='Home' home={true} icon={<HomeIcon className='sidebar-icon-svg' />} />
                <SideBarIcon text='Posts' icon={<GridViewOutlinedIcon className='sidebar-icon-svg' />} />
                <SideBarIcon text='Search' icon={<SearchOutlinedIcon className='sidebar-icon-svg' />} />
                <SideBarIcon text='Authors' icon={<StyleOutlinedIcon className='sidebar-icon-svg' />} />
                <SideBarIcon text='' icon={<AccountBoxOutlinedIcon className='sidebar-icon-svg' />} />
                <SideBarIcon text='Share' modalShareOpener={true} icon={<LaunchOutlinedIcon className='sidebar-icon-svg' />} />
                <SideBarIcon text='Privacy Policy' icon={<PolicyOutlinedIcon className='sidebar-icon-svg' />} />
                <SideBarIcon text='About' icon={<InfoOutlinedIcon className='sidebar-icon-svg' />} />
                <hr className='sidebar-icon-linebreak' />
                <UserAddedSideIcons tagName={"Anime"} />
                {/* <UserAddedSideIcons tagName={"Technology"} /> */}
                {/* <UserAddedSideIcons tagName={"Science"} /> */}
                {/* <UserAddedSideIcons tagName={"DBZ"} /> */}
                {/* <UserAddedSideIcons tagName={"Blockchain"} /> */}
                <SideBarIcon icon={<AddCircleOutlinedIcon className='sidebar-icon-svg' />} />
            </div>
        </div>
    );
}

function SideBarIcon({ icon, text = 'tooltip', modalShareOpener = false, home = false }) {
    let {setModalShareOpen} = useShowModalContext()
    const router = useRouter()
    const url = (home)?'/':`/${text.toLowerCase().replace(' ', '')}`
    console.log(url)
    const newUrl = router.asPath !== url
    console.log(newUrl)
    return (
        <div onClick={() => {(modalShareOpener)?null:(newUrl)?router.push(url):null}}>
            <div className="sidebar-icon group" onClick={() => {(modalShareOpener)?setModalShareOpen(true):null}}
                onScrollCapture={() => { cancleAllTimeouts() }}
                onMouseEnter={() => { hoveredOnTag(true) }} onMouseLeave={() => { hoveredOnTag(false) }}
                onTouchStart={() => { mobileLongPressDetect(true) }} onTouchEnd={() => mobileLongPressDetect(false)}>
                {icon}
                <span className='sidebar-tooltip select-none group-hover:scale-100'>
                    {text}
                </span>
            </div>
        </div>
    )
}

function UserAddedSideIcons({ tagName }) {
    const tagname = `${tagName}`;
    return (
        <div>
            <div className='user-sidebar-icon sidebar-icon group' onClick={() => { alert('clicked') }}
                onScrollCapture={() => { cancleAllTimeouts() }}
                onMouseEnter={() => { hoveredOnTag(true) }} onMouseLeave={() => { hoveredOnTag(false) }}
                onTouchStart={() => { mobileLongPressDetect(true) }} onTouchEnd={() => mobileLongPressDetect(false)}>
                {tagname.substring(0, 2)}
                <span className='sidebar-tooltip select-none group-hover:scale-100'>
                    {tagName}
                </span>
            </div>
        </div>
    )
}

export default SideBar;