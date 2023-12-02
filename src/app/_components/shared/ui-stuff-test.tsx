"use client";

import { useRef } from "react";
import {
    UiNotification,
    useNotificationStore,
} from "~/stores/useNotificationstore";
import Heading from "./heading";

export default function UiStuffTestAndSomeSuch() {
    const { addNotification, dismissNotification, dismissAllNotifications } =
        useNotificationStore();

    const notificationRef = useRef<React.ElementRef<"input">>(null);

    function addNewNotificationTest(type: UiNotification["type"]) {
        if (!notificationRef.current) return;

        addNotification({
            message:
                notificationRef.current.value || "OMG YOU FORGOT A MESSAGE...",
            type,
        });
        notificationRef.current.value = "";
        notificationRef.current.focus();
    }

    return (
        <div className="flex flex-col gap-4">
            <Heading level={2}>Notifications</Heading>
            <input
                ref={notificationRef}
                type="text"
                name="notification-test"
                className="rounded-lg border border-gray-300 p-2"
                placeholder="Notification test message"
            />
            <div className="flex flex-row gap-8">
                <button onClick={() => addNewNotificationTest("danger")}>
                    Add!
                </button>
                <button onClick={dismissNotification}>Dismiss oldest</button>
                <button onClick={dismissAllNotifications}>Dismiss all</button>
            </div>
        </div>
    );
}
