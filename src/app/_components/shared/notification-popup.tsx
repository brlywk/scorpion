"use client";

import useStore from "~/stores/useStore";
import {
    Notification,
    NotificationState,
    useNotificationStore,
} from "~/stores/useNotificationstore";
import { useEffect, useState } from "react";

const DISPLAY_TIME = 1500;
const TICK_RATE = 100;

export default function NotificiationPopup() {
    const {
        notifications,
        addNotification,
        dismissNotification,
        dismissAllNotifications,
    } = useNotificationStore();
    const [hydrated, setHydrated] = useState(false);
    const [activeNotification, setActiveNotification] =
        useState<Notification | null>(null);

    useEffect(() => {
        const loadStore = async () => {
            void (await useNotificationStore.persist.rehydrate());
            setHydrated(true);
        };
        void loadStore();
    }, []);

    useEffect(() => {
        if (notifications.length > 0) {
            setActiveNotification(notifications.at(0)!);
        } else {
            setActiveNotification(null);
        }
    }, [notifications]);

    if (!hydrated) return null;

    return (
        <div className="fixed bottom-16 left-1/2 -translate-x-1/2 bg-amber-100">
            {activeNotification && (
                <div className="z-10 rounded-lg border border-gray-300 bg-white shadow-lg">
                    {activeNotification.message}: {activeNotification.type}
                </div>
            )}
        </div>
    );
}
