package com.namankhurpia.adminapp;

import android.app.Application;

import com.firebase.client.Firebase;

/**
 * Created by Naman Khurpia on 27-02-2018.
 */

public class Fireapp extends Application {

    @Override
    public void onCreate() {
        super.onCreate();
        Firebase.setAndroidContext(this);

    }
}
