<template>
  <FlexboxLayout width="auto" verticalAlignment="bottom" horizontalAlignment="center" class="mb-8">
    <FlexboxLayout :class="[contentClasses]"
                   class=" py-2 px-4 items-center justify-center rounded-full">
      <Label  textWrap="true" :class="[textClasses]" :text="text" class="p-2"></Label>
    </FlexboxLayout>
  </FlexboxLayout>
</template>

<script lang="ts" setup>
const {contentClasses, textClasses, text} = defineProps({
  contentClasses: {
    type: String,
    default: ''
  },
  textClasses: {
    type: String,
    default: ''
  },
  text: {
    type: String,
    default: ''
  }
})
</script>