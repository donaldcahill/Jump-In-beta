package com.jih.jumpinhelpclient;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.transition.Slide;
import android.view.animation.Animation;
import android.view.animation.AnimationUtils;
import android.widget.ImageView;

public class SplashActivity extends AppCompatActivity {
    Animation fromBottom, fromTop;
    ImageView imgViewSlogan, imgLogo;
    private static int SPLASH_SCREEN = 2500;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_splash);
        imgViewSlogan = findViewById(R.id.imgslogan);
        imgLogo = findViewById(R.id.imglogo);
        fromBottom = AnimationUtils.loadAnimation(this,R.anim.frombottom);
        fromTop =AnimationUtils.loadAnimation(this,R.anim.fromtop);
        imgViewSlogan.setAnimation(fromBottom);
        imgLogo.setAnimation(fromTop);
        new Handler().postDelayed(new Runnable() {
            @Override
            public void run() {
                Intent intent = new Intent(SplashActivity.this, SliderActivity.class);
                startActivity(intent);
                finish();
            }
        },SPLASH_SCREEN);
    }
}