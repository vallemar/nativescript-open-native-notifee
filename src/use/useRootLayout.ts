import {CoreTypes, getRootLayout, View} from "@nativescript/core";
import {createApp} from "nativescript-vue";
import Snackbar from "~/components/Snackbar.vue";


const DEFAULT_ANIMATION_CURVE = CoreTypes.AnimationCurve.cubicBezier(0.17, 0.89, 0.24, 1.11);
const createNativeView = (component: any, props?: any): View => {
    return createApp(component, props).mount().$el.nativeView
}

export const useRootLayout = () => {

     const showSnackbar = (props?: any) => {
         const nsView = createNativeView(Snackbar, props)
         getRootLayout()
             .open(nsView, {
                 shadeCover: {
                     color: '#282C34',
                     opacity: 0.7,
                     tapToClose: true,
                 },
                 animation: {
                     enterFrom: {
                         translateY: 250,
                         duration: 1000,
                         curve: DEFAULT_ANIMATION_CURVE,
                     },
                     exitTo: {
                         translateY: 250,
                         duration: 1000,
                         curve: DEFAULT_ANIMATION_CURVE,
                     },
                 },
             }).then((e) => {
             console.log(e)
             setTimeout(() => {
                 getRootLayout().close(nsView)
             }, 4000)
         }).catch((ex: any) => console.error(ex))
     }

    return {
        showSnackbar
    }
}