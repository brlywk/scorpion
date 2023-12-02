import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Notification = {
    message: string;
    type: "info" | "success" | "warn" | "danger";
};

export interface NotificationState {
    notifications: Notification[];
    addNotification: (newNotification: Notification) => void;
    dismissNotification: () => void;
    dismissAllNotifications: () => void;
}

export const useNotificationStore = create<NotificationState>()(
    persist(
        (set, get) => ({
            notifications: [],
            addNotification: (add) =>
                set(() => ({
                    notifications: [...get().notifications, add],
                })),
            dismissNotification: () =>
                set(() => ({
                    notifications: get().notifications.slice(1),
                })),
            dismissAllNotifications: () => set(() => ({ notifications: [] })),
        }),
        { name: "notification-storage", skipHydration: true },
    ),
);

// // usage example on pages
// const { notifications, addNotification } = useNotificationStore();
// const [hydrated, setHydrated] = useState(false);
//
// useEffect(() => {
//     const loadStore = async () => {
//         void (await useNotificationStore.persist.rehydrate());
//         setHydrated(true);
//     };
//     void loadStore();
// }, []);
//
// if (!hydrated) return null;
