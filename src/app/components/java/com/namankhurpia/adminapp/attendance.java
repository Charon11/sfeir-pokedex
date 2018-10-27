package com.namankhurpia.adminapp;

import android.app.Activity;
import android.content.Intent;
import android.provider.ContactsContract;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

import com.firebase.client.DataSnapshot;
import com.firebase.client.Firebase;
import com.firebase.client.ValueEventListener;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.zxing.integration.android.IntentIntegrator;
import com.google.zxing.integration.android.IntentResult;

public class attendance extends AppCompatActivity {

    private Button attendance2;
    private String regno;



    private Firebase mrootref;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_attendance);
        mrootref = new Firebase("https://app-a-thon-ios.firebaseio.com/");

        attendance2 = (Button) findViewById(R.id.attendance);

        final Activity activity = this;
        attendance2.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                IntentIntegrator integrator = new IntentIntegrator(activity);
                integrator.setDesiredBarcodeFormats(IntentIntegrator.ALL_CODE_TYPES);
                integrator.setPrompt("Scan");
                integrator.setCameraId(0);
                integrator.setBeepEnabled(true);
                integrator.setBarcodeImageEnabled(false);
                integrator.initiateScan();

            }
        });

    }



    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data)
    {


        IntentResult result = IntentIntegrator.parseActivityResult(requestCode, resultCode, data);
        if (result != null)
        {
            if (result.getContents() == null)
            {
                Toast.makeText(this, "You cancelled the scanning", Toast.LENGTH_LONG).show();
            } else
                {

                regno = result.getContents();
                checkforregno();

                }
        }
        else {
            super.onActivityResult(requestCode, resultCode, data);
        }
    }

    private void checkforregno() {

        DatabaseReference rootRef = FirebaseDatabase.getInstance().getReference();
        rootRef.addListenerForSingleValueEvent(new com.google.firebase.database.ValueEventListener() {
            @Override
            public void onDataChange(com.google.firebase.database.DataSnapshot dataSnapshot) {


                if (dataSnapshot.hasChild(regno))
                {
                    markpresent();
                }
                else
                {
                    Toast.makeText(getApplicationContext(),"PARTICIPANT NOT REGISTERED",Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onCancelled(DatabaseError databaseError) {
                Toast.makeText(getApplicationContext(),"ERROR CODE 200",Toast.LENGTH_SHORT).show();


            }
        });
    }


    private void markpresent() {

        Toast.makeText(this, regno + " MARKED PRESENT", Toast.LENGTH_LONG).show();

        String registrationnumber = regno.toString();

        String name="attendanceStatus";

        Firebase childref = mrootref.child(registrationnumber);
        childref.child(name).setValue(Boolean.TRUE);

    }


}
