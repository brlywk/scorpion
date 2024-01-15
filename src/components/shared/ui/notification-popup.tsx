"use client";

import clsx from "clsx";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
    useNotificationStore,
    type UiNotification,
} from "~/stores/useNotificationstore";
import Button from "./button";

// ---- NOTIFICATION SETTINGS -----
const DISPLAY_TIME = 2000;
const TICK_RATE = 100;
const ICONS = {
    info: "/images/icons/info.svg",
    success: "/images/icons/success.svg",
    warn: "/images/icons/warn.svg",
    danger: "/images/icons/error.svg",
};

export default function NotificiationPopup() {
    const { notifications, dismissNotification, dismissAllNotifications } =
        useNotificationStore();
    const [hydrated, setHydrated] = useState(false);
    const [activeNotification, setActiveNotification] =
        useState<UiNotification | null>(null);
    const [remaining, setRemaining] = useState(DISPLAY_TIME);

    // wait for store initialisation until component is fully hydrated
    useEffect(() => {
        const loadStore = async () => {
            void (await useNotificationStore.persist.rehydrate());
            setHydrated(true);
        };
        void loadStore();
    }, []);

    // Show new notification(s)
    useEffect(() => {
        if (notifications.length > 0) {
            setActiveNotification(notifications.at(0)!);
        } else {
            setActiveNotification(null);
        }
    }, [notifications]);

    // Update progress bar width every "TICK_RATE"
    useEffect(() => {
        if (!activeNotification) return;

        const interval = setInterval(() => {
            if (remaining - TICK_RATE > 0) {
                setRemaining((prev) => prev - TICK_RATE);
            } else {
                dismissNotification();
                setRemaining(DISPLAY_TIME);
            }
        }, TICK_RATE);

        return () => clearInterval(interval);
    }, [activeNotification, remaining]);

    // Helper to calculate progress bar witdth
    function calculateElementWidth() {
        const w = Math.floor((remaining / DISPLAY_TIME) * 100);

        return `${w}%`;
    }

    if (!hydrated) return null;

    return (
        <div className="fixed bottom-16 left-1/2 w-1/4 -translate-x-1/2">
            {activeNotification && (
                <div
                    className={clsx(
                        "relative z-10 overflow-hidden rounded-lg border border-gray-300 bg-white shadow-lg shadow-gray-500",
                        {
                            "border-gray-300":
                                activeNotification.type === "info",
                            "border-green-400":
                                activeNotification.type === "success",
                            "border-amber-400":
                                activeNotification.type === "warn",
                            "border-red-400":
                                activeNotification.type === "danger",
                        },
                    )}
                >
                    {/* Progress Bar */}
                    <div
                        className={clsx(
                            "absolute left-0 top-0 z-30 h-[3px] ease-linear",
                            {
                                "bg-gray-300":
                                    activeNotification.type === "info",
                                "bg-green-400":
                                    activeNotification.type === "success",
                                "bg-amber-300":
                                    activeNotification.type === "warn",
                                "bg-red-400":
                                    activeNotification.type === "danger",
                            },
                            remaining < DISPLAY_TIME && "transition-all",
                        )}
                        style={{ width: calculateElementWidth() }}
                    ></div>

                    {/* Content */}
                    <div className="flex flex-row items-center gap-2">
                        {/* Type Icon */}
                        {
                            <Image
                                src={ICONS[activeNotification.type]}
                                alt={`Notification icon: ${activeNotification.type}`}
                                width={32}
                                height={32}
                                className="ml-4 h-6 w-6"
                            />
                        }

                        {/* Notification Message & Remaining Display */}
                        <div className="flex flex-grow flex-col gap-1 p-2">
                            <div>{activeNotification.message}</div>
                            <div className="text-xs">
                                Remaining notifications: {notifications.length}
                            </div>
                        </div>

                        {/* Dimiss All Button */}
                        <div className="p-2">
                            <Button action={() => dismissAllNotifications()}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="12"
                                    height="12"
                                    viewBox="0 0 12 12"
                                    className="h-6 w-6"
                                >
                                    <path
                                        fill="currentColor"
                                        d="m1.897 2.054l.073-.084a.75.75 0 0 1 .976-.073l.084.073L6 4.939l2.97-2.97a.75.75 0 1 1 1.06 1.061L7.061 6l2.97 2.97a.75.75 0 0 1 .072.976l-.073.084a.75.75 0 0 1-.976.073l-.084-.073L6 7.061l-2.97 2.97A.75.75 0 1 1 1.97 8.97L4.939 6l-2.97-2.97a.75.75 0 0 1-.072-.976l.073-.084l-.073.084Z"
                                    />
                                </svg>
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
