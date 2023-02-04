import { Button, Modal } from "reactstrap";
import { useGeekContext } from "../context/ShareModalContext";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { toast } from "react-hot-toast";

function TagOptionsModal() {

    const {
        modalTagOptionsOpen, setModalTagOptionsOpen,
        selectedTag, setSelectedTag,
        userTagsShortcut, setUserTagsShortcut,
        setSidebarMinimize,
    } = useGeekContext()

    const copyUrl = async () => {
        if (window.isSecureContext && navigator.clipboard)
            navigator.clipboard.writeText(`${window.location.origin}/tag/${selectedTag}/posts`);
        else
            unsecuredCopyToClipboard(`${window.location.origin}/tag/${selectedTag}/posts`)
        setModalTagOptionsOpen(false)
        toast.success("URL Copied!", { duration: 2000, id: 'url-copy' })
    }

    const ShareURLOnWhatsApp = () => {
        window.open(`whatsapp://send?text=${window.location.origin}/tag/${selectedTag}/posts`, '_blank');
        setModalTagOptionsOpen(false)
        setTimeout(() => {
            toast.success("Shared on WhatsApp!", { duration: 2000, icon: <WhatsAppIcon />, id: 'whatsapp-share' })
        }, 1000);
    }

    const removeSelectedTag = () => {
        let userTagsShortcutList = userTagsShortcut
        if (userTagsShortcutList.indexOf(selectedTag) !== -1) {
            userTagsShortcutList.splice(userTagsShortcutList.indexOf(selectedTag), 1)
            localStorage.setItem('user.tags', userTagsShortcutList.join(','))
            setUserTagsShortcut(userTagsShortcutList)
            setSidebarMinimize(true)
            setTimeout(() => {
                setSidebarMinimize(false)
            }, 1);
        }
        setModalTagOptionsOpen(false)
        setSelectedTag(null)
        toast.success("Sidebar shortcut removed!", { duration: 2000 })
    }

    return (
        <Modal
            isOpen={modalTagOptionsOpen}
            className="modal-success modal-dialog-centered"
            toggle={() => setModalTagOptionsOpen(false)}
        >
            <div className="modal-header bg-gray-700">
                <h6 className="modal-title ml-auto select-none" id="modal-title-notification">
                    Tag Shortcut: {selectedTag}
                </h6>
                <button
                    aria-label="Close"
                    className="close select-none"
                    onClick={() => setModalTagOptionsOpen(false)}
                    type="button"
                >
                    <span aria-hidden={true}>x</span>
                </button>
            </div>
            <div className="modal-body bg-gray-800">
                <div className=" pb-3 text-center">
                    <h4 className="heading -mt-3"><u>Share/copy {`'${selectedTag}'`} tagged article&apos;s URL</u></h4>
                    <p>
                        <Button onClick={() => ShareURLOnWhatsApp()} className="block mx-auto my-2 hover:bg-gray-600 p-2 rounded-md">
                            <WhatsAppIcon className="sidebar-icon-svg" style={{ cursor: 'pointer' }} />
                            Share on WhatsApp
                        </Button>
                        <Button onClick={() => copyUrl()} className="block mx-auto my-2 hover:bg-gray-600 p-2 rounded-md">
                            <ContentCopyIcon className="sidebar-icon-svg" style={{ cursor: 'pointer' }} />
                            Copy URL
                        </Button>
                    </p>
                </div>
            </div>
            <div className="modal-footer bg-gray-700 h-12 flex flex-row justify-around" style={{ flexWrap: 'nowrap' }}>
                <Button
                    className="text-white ml-auto bg-red-500 rounded-sm p-2"
                    color="link"
                    onClick={() => removeSelectedTag()}
                    type="button">
                    Remove
                </Button>
                <Button
                    className="text-white ml-auto my-0 "
                    color="link"
                    onClick={() => setModalTagOptionsOpen(false)}
                    type="button">
                    Cancel
                </Button>
            </div>
        </Modal>
    );
}

function unsecuredCopyToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
        document.execCommand('copy');
    } catch (err) {
        console.error('Unable to copy to clipboard', err);
    }
    document.body.removeChild(textArea);
}

export default TagOptionsModal;