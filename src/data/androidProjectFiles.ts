export interface AndroidFile {
  name: string;
  path: string;
  language: string;
  description: string;
  content: string;
}

export const ANDROID_PROJECT_FILES: AndroidFile[] = [
  {
    name: 'MainActivity.java',
    path: 'app/src/main/java/com/nawaf/pastquiz/MainActivity.java',
    language: 'java',
    description: 'الكود البرمجي الرئيسي بلغة Java مع المؤقت (30 ثانية)، الأسئلة، الأصوات، وتغيير الألوان',
    content: `package com.nawaf.pastquiz;

import android.content.res.ColorStateList;
import android.graphics.Color;
import android.media.MediaPlayer;
import android.os.Bundle;
import android.os.CountDownTimer;
import android.os.Handler;
import android.widget.Button;
import android.widget.ProgressBar;
import android.widget.TextView;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.content.ContextCompat;
import java.util.ArrayList;
import java.util.List;

public class MainActivity extends AppCompatActivity {

    private TextView tvVerb, tvTimer, tvQuestionNum, tvFeedback, tvScoreBottom;
    private ProgressBar timerProgress;
    private Button[] optButtons = new Button[3];
    
    private List<Question> questionList;
    private int currentQuestionIndex = 0;
    private int score = 0;
    private CountDownTimer countDownTimer;
    private boolean isAnswered = false;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // ربط عناصر واجهة المستخدم
        tvVerb = findViewById(R.id.tv_verb);
        tvTimer = findViewById(R.id.tv_timer);
        tvQuestionNum = findViewById(R.id.tv_question_num);
        tvFeedback = findViewById(R.id.tv_feedback);
        tvScoreBottom = findViewById(R.id.tv_score_bottom);
        timerProgress = findViewById(R.id.timer_progress);
        
        optButtons[0] = findViewById(R.id.btn_opt1);
        optButtons[1] = findViewById(R.id.btn_opt2);
        optButtons[2] = findViewById(R.id.btn_opt3);

        initQuestions();
        showStartDialog();
    }

    private void initQuestions() {
        questionList = new ArrayList<>();
        questionList.add(new Question("go", new String[]{"goes", "went", "going"}, 1));
        questionList.add(new Question("do", new String[]{"does", "doing", "did"}, 2));
        questionList.add(new Question("see", new String[]{"saw", "seen", "seed"}, 0));
        questionList.add(new Question("write", new String[]{"writing", "written", "wrote"}, 2));
        questionList.add(new Question("is", new String[]{"ised", "was", "ising"}, 1));
        questionList.add(new Question("drink", new String[]{"drank", "drunk", "drinking"}, 0));
        questionList.add(new Question("eat", new String[]{"eating", "ate", "ote"}, 1));
        questionList.add(new Question("sleep", new String[]{"slept", "sleeping", "seelped"}, 0));
        questionList.add(new Question("find", new String[]{"found", "finded", "finding"}, 0));
        questionList.add(new Question("have", new String[]{"had", "has", "having"}, 0));
    }

    private void showStartDialog() {
        new AlertDialog.Builder(this)
                .setTitle("تصريف الأفعال في الماضي البسيط")
                .setMessage("استعد! لديك 30 ثانية لكل سؤال.\\n\\nتصميم الأستاذ نواف المتيوتي\\nنواف صالح")
                .setCancelable(false)
                .setPositiveButton("ابدأ الاختبار", (dialog, id) -> startQuiz())
                .show();
    }

    private void startQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        displayQuestion();
    }

    private void displayQuestion() {
        isAnswered = false;
        tvFeedback.setText("");
        Question q = questionList.get(currentQuestionIndex);
        
        tvVerb.setText(q.verb);
        tvQuestionNum.setText("السؤال: " + (currentQuestionIndex + 1) + " / " + questionList.size());
        tvScoreBottom.setText("النتيجة: " + score);

        for (int i = 0; i < 3; i++) {
            optButtons[i].setText(q.options[i]);
            optButtons[i].setBackgroundTintList(ColorStateList.valueOf(ContextCompat.getColor(this, R.color.white)));
            optButtons[i].setTextColor(ContextCompat.getColor(this, R.color.dark_blue));
            int index = i;
            optButtons[i].setOnClickListener(v -> checkAnswer(index));
        }

        startTimer();
    }

    private void startTimer() {
        if (countDownTimer != null) countDownTimer.cancel();
        
        countDownTimer = new CountDownTimer(30000, 1000) {
            public void onTick(long millisUntilFinished) {
                int seconds = (int) (millisUntilFinished / 1000);
                tvTimer.setText(String.valueOf(seconds));
                timerProgress.setProgress(seconds);
                if (seconds <= 5) {
                    tvTimer.setTextColor(ContextCompat.getColor(MainActivity.this, R.color.wrong_red));
                } else {
                    tvTimer.setTextColor(ContextCompat.getColor(MainActivity.this, R.color.primary_blue));
                }
            }

            public void onFinish() {
                if (!isAnswered) {
                    tvTimer.setText("0");
                    timerProgress.setProgress(0);
                    handleTimeout();
                }
            }
        }.start();
    }

    private void checkAnswer(int selectedIndex) {
        if (isAnswered) return;
        isAnswered = true;
        countDownTimer.cancel();

        Question q = questionList.get(currentQuestionIndex);
        if (selectedIndex == q.correctIndex) {
            score++;
            optButtons[selectedIndex].setBackgroundTintList(ColorStateList.valueOf(ContextCompat.getColor(this, R.color.correct_green)));
            optButtons[selectedIndex].setTextColor(Color.WHITE);
            tvFeedback.setText("أحسنت! إجابة صحيحة 👏");
            tvFeedback.setTextColor(ContextCompat.getColor(this, R.color.correct_green));
            playSound("applause");
        } else {
            optButtons[selectedIndex].setBackgroundTintList(ColorStateList.valueOf(ContextCompat.getColor(this, R.color.wrong_red)));
            optButtons[selectedIndex].setTextColor(Color.WHITE);
            // إظهار الإجابة الصحيحة باللون الأخضر
            optButtons[q.correctIndex].setBackgroundTintList(ColorStateList.valueOf(ContextCompat.getColor(this, R.color.correct_green)));
            optButtons[q.correctIndex].setTextColor(Color.WHITE);
            
            tvFeedback.setText("للأسف، إجابة غير صحيحة");
            tvFeedback.setTextColor(ContextCompat.getColor(this, R.color.wrong_red));
            playSound("wrong");
        }

        nextQuestionDelayed();
    }

    private void handleTimeout() {
        isAnswered = true;
        Question q = questionList.get(currentQuestionIndex);
        tvFeedback.setText("انتهى الوقت!");
        tvFeedback.setTextColor(ContextCompat.getColor(this, R.color.wrong_red));
        optButtons[q.correctIndex].setBackgroundTintList(ColorStateList.valueOf(ContextCompat.getColor(this, R.color.correct_green)));
        optButtons[q.correctIndex].setTextColor(Color.WHITE);
        playSound("wrong");
        nextQuestionDelayed();
    }

    private void nextQuestionDelayed() {
        new Handler().postDelayed(() -> {
            currentQuestionIndex++;
            if (currentQuestionIndex < questionList.size()) {
                displayQuestion();
            } else {
                showResult();
            }
        }, 2000);
    }

    private void showResult() {
        String msg = "نتيجتك هي: " + score + " من " + questionList.size();
        String title = score >= 7 ? "ممتاز! 🎉" : "حاول مرة أخرى 💪";
        
        new AlertDialog.Builder(this)
                .setTitle(title)
                .setMessage(msg + "\\n\\nتصميم الأستاذ نواف المتيوتي\\nنواف صالح")
                .setCancelable(false)
                .setPositiveButton("إعادة الاختبار", (dialog, id) -> startQuiz())
                .setNegativeButton("خروج", (dialog, id) -> finish())
                .show();
    }

    private void playSound(String soundName) {
        int resId = getResources().getIdentifier(soundName, "raw", getPackageName());
        if (resId != 0) {
            MediaPlayer mp = MediaPlayer.create(this, resId);
            if (mp != null) {
                mp.setOnCompletionListener(MediaPlayer::release);
                mp.start();
            }
        }
    }

    static class Question {
        String verb;
        String[] options;
        int correctIndex;

        Question(String v, String[] o, int c) {
            verb = v;
            options = o;
            correctIndex = c;
        }
    }
}`
  },
  {
    name: 'activity_main.xml',
    path: 'app/src/main/res/layout/activity_main.xml',
    language: 'xml',
    description: 'واجهة المستخدم XML المنسقة مع CardView والمؤقت والأزرار ودعم RTL',
    content: `<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="@color/bg_light"
    android:layoutDirection="rtl">

    <!-- Header -->
    <LinearLayout
        android:id="@+id/header"
        android:layout_width="match_parent"
        android:layout_height="140dp"
        android:background="@color/primary_blue"
        android:orientation="vertical"
        android:padding="20dp">

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="نواف صالح"
            android:textColor="@color/white"
            android:textSize="18sp"
            android:textStyle="bold" />

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="تصريف الأفعال - الماضي البسيط"
            android:textColor="@color/white"
            android:textSize="22sp"
            android:textStyle="bold" />

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="تصميم الأستاذ نواف المتيوتي"
            android:textColor="#DCE8FA"
            android:textSize="14sp" />
    </LinearLayout>

    <!-- Timer and Score Area -->
    <LinearLayout
        android:id="@+id/stats_area"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_below="@id/header"
        android:layout_marginTop="-20dp"
        android:paddingHorizontal="20dp"
        android:orientation="vertical">

        <com.google.android.material.card.MaterialCardView
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            app:cardCornerRadius="15dp"
            app:cardElevation="4dp">

            <LinearLayout
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:orientation="vertical"
                android:padding="15dp">

                <RelativeLayout
                    android:layout_width="match_parent"
                    android:layout_height="wrap_content">
                    <TextView
                        android:id="@+id/tv_question_num"
                        android:layout_width="wrap_content"
                        android:layout_height="wrap_content"
                        android:text="السؤال: 1 / 10"
                        android:textColor="@color/primary_blue"
                        android:textStyle="bold" />
                    <TextView
                        android:id="@+id/tv_timer"
                        android:layout_centerHorizontal="true"
                        android:layout_width="wrap_content"
                        android:layout_height="wrap_content"
                        android:text="30"
                        android:textSize="24sp"
                        android:textColor="@color/primary_blue"
                        android:textStyle="bold" />
                </RelativeLayout>

                <ProgressBar
                    android:id="@+id/timer_progress"
                    style="?android:attr/progressBarStyleHorizontal"
                    android:layout_width="match_parent"
                    android:layout_height="10dp"
                    android:layout_marginTop="10dp"
                    android:max="30"
                    android:progress="30" />
            </LinearLayout>
        </com.google.android.material.card.MaterialCardView>
    </LinearLayout>

    <!-- Question Card -->
    <com.google.android.material.card.MaterialCardView
        android:id="@+id/question_card"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_below="@id/stats_area"
        android:layout_margin="20dp"
        app:cardCornerRadius="20dp"
        app:cardElevation="2dp">

        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:gravity="center"
            android:orientation="vertical"
            android:padding="30dp">

            <TextView
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:text="ما هو تصريف الفعل في Past Simple؟"
                android:textColor="@color/text_gray"
                android:textSize="16sp" />

            <TextView
                android:id="@+id/tv_verb"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:layout_marginTop="10dp"
                android:text="GO"
                android:textColor="@color/primary_blue"
                android:textSize="45sp"
                android:textStyle="bold" />
        </LinearLayout>
    </com.google.android.material.card.MaterialCardView>

    <!-- Options -->
    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_below="@id/question_card"
        android:orientation="vertical"
        android:paddingHorizontal="25dp">

        <Button
            android:id="@+id/btn_opt1"
            android:layout_width="match_parent"
            android:layout_height="60dp"
            android:layout_marginBottom="10dp"
            android:backgroundTint="@color/white"
            android:text="Option A"
            android:textAllCaps="false"
            android:textColor="@color/dark_blue"
            android:textSize="18sp"
            app:strokeColor="@color/primary_blue"
            app:strokeWidth="1dp" />

        <Button
            android:id="@+id/btn_opt2"
            android:layout_width="match_parent"
            android:layout_height="60dp"
            android:layout_marginBottom="10dp"
            android:backgroundTint="@color/white"
            android:text="Option B"
            android:textAllCaps="false"
            android:textColor="@color/dark_blue"
            android:textSize="18sp"
            app:strokeColor="@color/primary_blue"
            app:strokeWidth="1dp" />

        <Button
            android:id="@+id/btn_opt3"
            android:layout_width="match_parent"
            android:layout_height="60dp"
            android:layout_marginBottom="10dp"
            android:backgroundTint="@color/white"
            android:text="Option C"
            android:textAllCaps="false"
            android:textColor="@color/dark_blue"
            android:textSize="18sp"
            app:strokeColor="@color/primary_blue"
            app:strokeWidth="1dp" />

        <TextView
            android:id="@+id/tv_feedback"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_marginTop="10dp"
            android:gravity="center"
            android:text=""
            android:textSize="18sp"
            android:textStyle="bold" />
    </LinearLayout>

    <TextView
        android:id="@+id/tv_score_bottom"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_alignParentBottom="true"
        android:layout_centerHorizontal="true"
        android:layout_marginBottom="20dp"
        android:text="النتيجة: 0"
        android:textColor="@color/primary_blue" />

</RelativeLayout>`
  },
  {
    name: 'AndroidManifest.xml',
    path: 'app/src/main/AndroidManifest.xml',
    language: 'xml',
    description: 'ملف بيان التطبيق المخصص لأندرويد 10 فما فوق (API 29+)',
    content: `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android">

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="تصريف الأفعال - الماضي البسيط"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.MaterialComponents.Light.NoActionBar">
        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:screenOrientation="portrait">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>

</manifest>`
  },
  {
    name: 'colors.xml',
    path: 'app/src/main/res/values/colors.xml',
    language: 'xml',
    description: 'ألوان التطبيق الرسمية المحددة في التصميم',
    content: `<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="primary_blue">#173B70</color>
    <color name="dark_blue">#081A35</color>
    <color name="correct_green">#238B45</color>
    <color name="wrong_red">#C62828</color>
    <color name="bg_light">#F7F9FC</color>
    <color name="white">#FFFFFF</color>
    <color name="text_gray">#4A4A4A</color>
</resources>`
  },
  {
    name: 'app/build.gradle',
    path: 'app/build.gradle',
    language: 'groovy',
    description: 'إعدادات بناء موديول التطبيق مع دعم Java 11 وتوافق Android 10+ (API 29 إلى 35)',
    content: `plugins {
    id 'com.android.application'
}

android {
    namespace 'com.nawaf.pastquiz'
    compileSdk 35

    defaultConfig {
        applicationId "com.nawaf.pastquiz"
        minSdk 29
        targetSdk 35
        versionCode 1
        versionName "1.0"
        testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"
    }

    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
    compileOptions {
        sourceCompatibility JavaVersion.VERSION_11
        targetCompatibility JavaVersion.VERSION_11
    }
}

dependencies {
    implementation 'androidx.appcompat:appcompat:1.7.0'
    implementation 'com.google.android.material:material:1.12.0'
    implementation 'androidx.constraintlayout:constraintlayout:2.2.0'
}`
  },
  {
    name: 'build.gradle (Project)',
    path: 'build.gradle',
    language: 'groovy',
    description: 'ملف إعدادات المشروع الرئيسي',
    content: `plugins {
    id 'com.android.application' version '8.7.3' apply false
    id 'com.android.library' version '8.7.3' apply false
}`
  }
];
