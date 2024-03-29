package com.gn.minepool;

import android.app.Application;
import android.content.Intent;

import com.facebook.react.ReactApplication;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.zmxv.RNSound.RNSoundPackage;
import com.rnim.rn.audio.ReactNativeAudioPackage;
import com.syanpicker.RNSyanImagePickerPackage;

import io.realm.react.RealmReactPackage;

import com.horcrux.svg.SvgPackage;
import com.lwansbrough.RCTCamera.RCTCameraPackage;
import com.bitgo.randombytes.RandomBytesPackage;
import com.AlexanderZaytsev.RNI18n.RNI18nPackage;

import cn.reactnative.modules.update.UpdatePackage;
import cn.reactnative.modules.update.UpdateContext;

import org.devio.rn.splashscreen.SplashScreenReactPackage;

import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import cn.jiguang.imui.messagelist.ReactIMUIPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

        @Override
        protected String getJSBundleFile() {
            return UpdateContext.getBundleUrl(MainApplication.this);
        }

        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage(),
            new RNFetchBlobPackage(),
            new RNSoundPackage(),
            new ReactNativeAudioPackage(),
                    new RNSyanImagePickerPackage(),
                    new RealmReactPackage(),
                    new SvgPackage(),
                    new RCTCameraPackage(),
                    new RandomBytesPackage(),
                    new RNI18nPackage(),
                    new UpdatePackage(),
                    new SplashScreenReactPackage(),
                    new VectorIconsPackage(),
                    new ReactIMUIPackage()
            );
        }

        @Override
        protected String getJSMainModuleName() {
            return "index";
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        SoLoader.init(this, /* native exopackage */ false);
    }
}
