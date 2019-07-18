package com.gn.minepool;

import android.content.Context;
import android.media.MediaPlayer;
import android.os.Bundle;
import android.os.VibrationEffect;
import android.os.Vibrator;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;

import static android.os.Build.VERSION;
import static android.os.Build.VERSION_CODES;
import static android.os.VibrationEffect.DEFAULT_AMPLITUDE;

/**
 * 用于测试接口的Android原生页面，正式上线要修改清单文件入口
 */
public class LauncherActivity extends AppCompatActivity implements View.OnClickListener {

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_launcher);

        Button b1 = findViewById(R.id.btn1);
        Button b2 = findViewById(R.id.btn2);

        b1.setOnClickListener(this);
        b2.setOnClickListener(this);
    }

    @Override
    public void onClick(View v) {

        if (v.getId() == R.id.btn1) {
            MediaPlayer player = MediaPlayer.create(this, R.raw.msg);
            player.setVolume(1.0f, 1.0f);
            player.start();
        }

        if (v.getId() == R.id.btn2) {
            Vibrator vibrator = (Vibrator) getSystemService(Context.VIBRATOR_SERVICE);
            if (vibrator != null) {
                if (VERSION.SDK_INT >= VERSION_CODES.O) {
                    vibrator.vibrate(VibrationEffect.createOneShot(100, DEFAULT_AMPLITUDE));
                } else {
                    vibrator.vibrate(100);
                }
            }
        }
    }
}
