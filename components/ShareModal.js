import { Button, Modal } from "reactstrap";
import { useShowModalContext } from "../context/ShareModalContext";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";

function ShareModal() {

    const { asPath } = useRouter();

    const { modalShareOpen, setModalShareOpen } = useShowModalContext()
    // const [modalShareOpen, setModalShareOpen] = useState(false)

    const copyUrl = async () => {
        if (window.isSecureContext && navigator.clipboard)
            navigator.clipboard.writeText(`${window.location.origin}${asPath}`);
        else
            unsecuredCopyToClipboard(`${window.location.origin}${asPath}`)
        setModalShareOpen(false)
        toast.success("URL Copied!", { duration: 2000, id: 'url-copy' })
    }
    
    const ShareURLOnWhatsApp = () => {
        window.open(`whatsapp://send?text=${window.location.origin}${asPath}`, '_blank');
        setModalShareOpen(false)
        setTimeout(() => {
            toast.success("Shared on WhatsApp!", { duration: 2000, icon:<WhatsAppIcon/>, id: 'whatsapp-share' })
        }, 1000);
    }

    return (
        <Modal
            isOpen={modalShareOpen}
            className="modal-success modal-dialog-centered"
            toggle={() => setModalShareOpen(false)}
        >
            <div className="modal-header bg-green-700">
                <h6 className="modal-title ml-auto select-none" id="modal-title-notification">
                    Share!
                </h6>
                <button
                    aria-label="Close"
                    className="close select-none"
                    onClick={() => setModalShareOpen(false)}
                    type="button"
                >
                    <span aria-hidden={true}>x</span>
                </button>
            </div>
            <div className="modal-body">
                <div className=" pb-3 text-center">
                    <h4 className="heading -mt-3"><u>Share / Copy current page URL</u></h4>
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
            <div className="modal-footer bg-green-700 h-2" style={{ flexWrap: 'nowrap' }}>
                <Button
                    className=" text-white ml-auto my-0 "
                    color="link"
                    onClick={() => setModalShareOpen(false)}
                    type="button"
                >
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

export default ShareModal;