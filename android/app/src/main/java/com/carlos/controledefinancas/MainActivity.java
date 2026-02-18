package com.carlos.controledefinancas;

import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.view.Gravity;
import android.widget.FrameLayout;

import androidx.core.splashscreen.SplashScreen;

import com.getcapacitor.BridgeActivity;
import com.google.android.gms.ads.AdRequest;
import com.google.android.gms.ads.AdSize;
import com.google.android.gms.ads.AdView;
import com.google.android.gms.ads.MobileAds;
import com.google.android.gms.ads.interstitial.InterstitialAd;
import com.google.android.gms.ads.interstitial.InterstitialAdLoadCallback;
import com.google.android.gms.ads.LoadAdError;

public class MainActivity extends BridgeActivity {

    private AdView adView;
    private InterstitialAd mInterstitialAd;
    private Handler adHandler;

    private boolean isFirstLaunch = true;

    private static final long AD_INTERVAL = 8 * 60 * 1000; // 8 minutos

    @Override
    protected void onCreate(Bundle savedInstanceState) {

        SplashScreen.installSplashScreen(this);
        super.onCreate(savedInstanceState);

        adHandler = new Handler(Looper.getMainLooper());

        MobileAds.initialize(this, initializationStatus -> {});

        createBanner();
        loadInterstitial(); // começa carregar durante o Splash

        startAdLoop();
    }

    private void createBanner() {

        adView = new AdView(this);
        adView.setAdSize(AdSize.BANNER);
        adView.setAdUnitId("ca-app-pub-3940256099942544/6300978111");

        AdRequest adRequest = new AdRequest.Builder().build();
        adView.loadAd(adRequest);

        FrameLayout.LayoutParams params = new FrameLayout.LayoutParams(
                FrameLayout.LayoutParams.WRAP_CONTENT,
                FrameLayout.LayoutParams.WRAP_CONTENT
        );

        params.gravity = Gravity.BOTTOM | Gravity.CENTER_HORIZONTAL;

        FrameLayout rootLayout = findViewById(android.R.id.content);
        rootLayout.addView(adView, params);
    }

    private void loadInterstitial() {

        AdRequest adRequest = new AdRequest.Builder().build();

        InterstitialAd.load(this,
                "ca-app-pub-3940256099942544/1033173712",
                adRequest,
                new InterstitialAdLoadCallback() {

                    @Override
                    public void onAdLoaded(InterstitialAd interstitialAd) {
                        mInterstitialAd = interstitialAd;

                        // Só mostra automaticamente na primeira abertura
                        if (isFirstLaunch) {
                            showInterstitial();
                            isFirstLaunch = false;
                        }
                    }

                    @Override
                    public void onAdFailedToLoad(LoadAdError loadAdError) {
                        mInterstitialAd = null;
                    }
                });
    }

    private void showInterstitial() {
        if (mInterstitialAd != null) {
            mInterstitialAd.show(this);
            mInterstitialAd = null;
            loadInterstitial(); // prepara próximo anúncio
        }
    }

    private void startAdLoop() {

        Runnable adRunnable = new Runnable() {
            @Override
            public void run() {
                showInterstitial();
                adHandler.postDelayed(this, AD_INTERVAL);
            }
        };

        adHandler.postDelayed(adRunnable, AD_INTERVAL);
    }

    @Override
    protected void onDestroy() {
        if (adView != null) {
            adView.destroy();
        }
        if (adHandler != null) {
            adHandler.removeCallbacksAndMessages(null);
        }
        super.onDestroy();
    }
}