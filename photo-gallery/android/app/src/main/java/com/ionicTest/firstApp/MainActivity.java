package com.ionicTest.firstApp;

import android.os.Bundle;

import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Plugin;

import java.util.ArrayList;
import java.util.Arrays;
import app.xplatform.capacitor.plugins.AdMob;
import com.codetrixstudio.capacitor.GoogleAuth.GoogleAuth;
import com.google.android.gms.ads.AdRequest;
import com.google.android.gms.ads.AdView;
import com.google.android.gms.ads.MobileAds;
import com.google.android.gms.ads.RequestConfiguration;
import com.google.android.gms.ads.initialization.InitializationStatus;
import com.google.android.gms.ads.initialization.OnInitializationCompleteListener;

public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

        MobileAds.initialize(this, new OnInitializationCompleteListener() {
            @Override
            public void onInitializationComplete(InitializationStatus initializationStatus) {}
        });
        // to get test ads on this device."
        MobileAds.setRequestConfiguration(
            new RequestConfiguration.Builder().setTestDeviceIds(Arrays.asList("CAE775B8AEC970DE07356CE91A61ACDE"))
                                              .build());

    // Initializes the Bridge
    this.init(savedInstanceState, new ArrayList<Class<? extends Plugin>>() {{
      // Additional plugins you've installed go here
      // Ex: add(TotallyAwesomePlugin.class);
      add(AdMob.class);  // Add AdMob as a Capacitor Plugin
      add(GoogleAuth.class);
      add(com.getcapacitor.community.admob.AdMob.class);

    }});
  }
}
