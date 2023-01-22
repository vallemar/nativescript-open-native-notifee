<script lang="ts" setup>
import notifee, {TimestampTrigger, TriggerType} from '@notifee/react-native';
import {useRootLayout} from "~/use/useRootLayout";

const {showSnackbar} = useRootLayout()
let lastNotificationId = "";

function getChannelId(){
  return notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });
}

async function showNotification() {
  await notifee.requestPermission()
  const channelId = await getChannelId();

  // Display a notification
  lastNotificationId = await notifee.displayNotification({
    title: 'Notification Title',
    body: 'Main body content of the notification',
    android: {
      channelId,
      pressAction: {
        id: 'default',
      },
    },
  });
  showSnackbar({
    contentClasses: "bg-[#65adf1]",
    textClasses: "text-white text-center",
    text: "Show Notification with Notifee on NativeScript with vue3 🤯"
  })
}

async function updateNotification() {
  const channelId = await getChannelId();
  await notifee.requestPermission();

  await notifee.displayNotification({
    id: lastNotificationId,
    title: 'Updated Notification Title',
    body: 'Updated main body content of the notification',
    android: {
      channelId,
    },
  });

  showSnackbar({
    contentClasses: "bg-[#65adf1]",
    textClasses: "text-white text-center",
    text: "That? Can I also update the content of a notification? 😍"
  })
}

async function cancel() {
  await notifee.cancelNotification(lastNotificationId);
  showSnackbar({
    contentClasses: "bg-[#65adf1]",
    textClasses: "text-white text-center",
    text: "I had launched that notification by mistake, I better cancel it 😝"
  })
}

async function onCreateTriggerNotification() {
  const date = new Date(Date.now());
  date.setSeconds(date.getSeconds() + 5);

  const trigger: TimestampTrigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: date.getTime(),
  };

  await notifee.requestPermission();
  await notifee.createTriggerNotification(
      {
        title: 'Meeting with Jane',
        body: 'Today at 11:20am',
        android: {
          channelId: 'your-channel-id',
        },
      },
      trigger,
  );

  showSnackbar({
    contentClasses: "bg-[#65adf1]",
    textClasses: "text-white text-center",
    text: "Registered a notification to show in 5 seconds with the TriggerNotification module 🕒"
  })
}

</script>

<template>
  <Frame>
    <Page class="bg-[#161617]" actionBarHidden="true" androidStatusBarBackground="#161617" >
      <RootLayout >
        <StackLayout class="" >
          <Label
              iosOverflowSafeArea="true"
              class="text-4xl text-center bg-[#17202d] text-white py-16"
              textWrap="true"
              style="line-height: 1"
              text="Notifee on NativeScript 🔔"
          />
          <FlexboxLayout class="mt-8 justify-center ">
            <Label
                class="text-2xl px-3 py-2 rounded-full bg-[#17202d] text-[#2f71da]"
                text="Show notification"
                @tap="showNotification"
            />
          </FlexboxLayout>

          <FlexboxLayout class="mt-8 justify-center ">
            <Label
                class="text-2xl px-3 py-2 rounded-full bg-[#17202d] text-[#2f71da]"
                text="Update content"
                @tap="updateNotification"
            />
          </FlexboxLayout>


          <FlexboxLayout class="mt-8 justify-center ">
            <Label
                class="text-2xl px-3 py-2 rounded-full bg-[#17202d] text-[#2f71da]"
                text="Cancel notification"
                @tap="cancel"
            />
          </FlexboxLayout>

          <FlexboxLayout class="mt-8 justify-center ">
            <Label
                class="text-xl px-3 py-2 rounded-full bg-[#17202d] text-[#2f71da] text-center"
                textWrap="true"
                style="line-height: 1"
                text="Schedule notification in 5 seconds"
                @tap="onCreateTriggerNotification"
            />
          </FlexboxLayout>
        </StackLayout>
      </RootLayout>
    </Page>
  </Frame>
</template>

