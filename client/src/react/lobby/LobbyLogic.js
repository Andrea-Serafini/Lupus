import { NotificationManager } from "react-notifications"


export function close() {
    NotificationManager.success("You can now play", "Party closed", 3000)
}
export function leave() {
    NotificationManager.success("Choose a new one", "Party left", 3000)

}



