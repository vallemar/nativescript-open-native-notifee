import { createApp } from 'nativescript-vue';
import Home from './components/Home.vue';
import notifee, {EventType} from "@notifee/react-native";
import {useRootLayout} from "~/use/useRootLayout";
const {showSnackbar} = useRootLayout()


notifee.onForegroundEvent(({ type, detail }) => {
    console.log('onForegroundEvent: ' + type);
    switch (type) {
        case EventType.DISMISSED:
            console.log('User dismissed notification');
            break;
        case EventType.PRESS:
            console.log('User pressed notification');
            showSnackbar({
                contentClasses: "bg-[#65adf1]",
                textClasses: "text-white text-center",
                text: "I can also listen to events from an RN plugin 👂"
            })
            break;
    }
})

notifee.onBackgroundEvent(async ({ type, detail }) => {
    const { notification, pressAction } = detail;
    console.log('onBackgroundEvent');
    if (notification?.id && pressAction && type === EventType.ACTION_PRESS && pressAction.id === 'mark-as-read') {
        // Update external API
        console.log('User pressed notification onBackgroundEvent');


        // Remove the notification
        await notifee.cancelNotification(notification.id);
    }
});

createApp(Home).start();



