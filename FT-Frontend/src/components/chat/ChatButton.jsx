import {Button} from "react-bootstrap"
import { BsChatDotsFill } from "react-icons/bs";
import { useChatStore } from "../../store/useChatStore";

export const ChatButton = () => {
    const openChat= useChatStore((state) => state.openChat)
  return (
    <Button variant="primary" className="rounded-circle shadow" style={{
        position:"fixed",
        bottom: "20px",
        right: "20px",
        width: "60px",
        height: "60px",
        zIndex: 999,
    }} onClick={openChat} >
        <BsChatDotsFill size={22} />
    </Button>
  )
}
