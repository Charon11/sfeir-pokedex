package com.namankhurpia.adminapp;

import android.app.Activity;
import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import com.firebase.client.Firebase;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;
import com.google.zxing.integration.android.IntentIntegrator;
import com.google.zxing.integration.android.IntentResult;

public class add_goodies extends AppCompatActivity {

    private Button goodiesbtn;

    private Firebase mrootref;
    private String regno;

    public String name="goodiesStatus";

    private Boolean val = false;
    private Boolean boole;
    private TextView txt;
    private String st;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_add_goodies);

        mrootref = new Firebase("https://app-a-thon-ios.firebaseio.com/");


        goodiesbtn = (Button) findViewById(R.id.goodiesnew);
        final Activity activity = this;

        goodiesbtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                IntentIntegrator integrator = new IntentIntegrator(activity);
                integrator.setDesiredBarcodeFormats(IntentIntegrator.QR_CODE_TYPES);
                integrator.setPrompt("Scan");
                integrator.setCameraId(0);
                integrator.setBeepEnabled(true);
                integrator.setBarcodeImageEnabled(false);
                integrator.initiateScan();

            }
        });

    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {

        IntentResult result = IntentIntegrator.parseActivityResult(requestCode, resultCode, data);
        if (result != null) {
            if (result.getContents() == null) {
                Toast.makeText(this, "You cancelled the scanning", Toast.LENGTH_LONG).show();
            } else {


                String foo="_goodies";
                regno = result.getContents().toString().trim();
                //Log.d("reg", regno);
                regno=regno.replace("_goodies","").trim();
                Log.d("registrationsss",regno);

                checkforregno();

            }
        } else {
            super.onActivityResult(requestCode, resultCode, data);
            Toast.makeText(getApplicationContext(),"ERROR CODE 200",Toast.LENGTH_LONG).show();
        }
    }

    private void checkforregno() {

        DatabaseReference db = FirebaseDatabase.getInstance().getReference();
        DatabaseReference rf = db.child(regno).child("goodiesStatus");

        rf.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                Boolean b = dataSnapshot.getValue(Boolean.class);
                st = String.valueOf(b);
                checkval();

            }

            @Override
            public void onCancelled(DatabaseError databaseError) {

            }
        });
    }


        /*rf.addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                for (DataSnapshot ds : dataSnapshot.getChildren())
                {

                    String refreshments=ds.getValue().toString();
                    //Log.i("Debug",refreshments);
                    if(refreshments.equals("refreshmentStatus"))
                    {
                        val=ds.getValue(Boolean.class);
                        txt.setText(val.toString());
                        //Log.i("Debugnew",val);


                        //check if val is string
                    }
                    else
                    {
                        //Toast.makeText(getApplicationContext(),"ERROR CODE 300",Toast.LENGTH_SHORT).show();

                    }
                }



                }

            @Override
            public void onCancelled(DatabaseError databaseError) {

            }
        });
    }

*/




//        rootRef.addListenerForSingleValueEvent(new com.google.firebase.database.ValueEventListener() {
//            @Override
//            public void onDataChange(com.google.firebase.database.DataSnapshot dataSnapshot) {
//
//
//                if (dataSnapshot.hasChild(regno)) {
//
//                    for (DataSnapshot ds : dataSnapshot.getChildren()) {
//
//                        String refreshments=ds.getKey().toString();
//                        if(refreshments.equalsIgnoreCase("refreshmentStatus"))
//                        {
//                            val=ds.getValue().toString();
//                            checkval();
//                        }
//                        else
//                        {
//                            Toast.makeText(getApplicationContext(),"ERRORCODE 300",Toast.LENGTH_SHORT).show();
//                        }
//
//                    }
//                }
//                else
//                {
//                    Toast.makeText(getApplicationContext(),"PARTICIPANT NOT REGISTERED",Toast.LENGTH_SHORT).show();
//                }
//            }
//
//            @Override
//            public void onCancelled(DatabaseError databaseError) {
//                Toast.makeText(getApplicationContext(),"ERROR CODE 200",Toast.LENGTH_SHORT).show();
//
//
//            }
//        });
//
//    }




    private void checkval() {

        boole=Boolean.TRUE;


        if(st.equals("true"))
        {
            Toast.makeText(getApplicationContext(),"ALREADY GOT GOODIES",Toast.LENGTH_SHORT).show();
        }
        else
        {
            //Boolean bootrue=Boolean.valueOf("true");
            //Boolean booleanfinal=Boolean.parseBoolean("true");
            //marking food present


            String registrationnumber = regno.toString().trim();


            Firebase childref = mrootref.child(registrationnumber);
            childref.child(name).setValue(Boolean.TRUE);

            Toast.makeText(this, regno + " RECEIVED GOODIES", Toast.LENGTH_SHORT).show();



        }
    }


}



