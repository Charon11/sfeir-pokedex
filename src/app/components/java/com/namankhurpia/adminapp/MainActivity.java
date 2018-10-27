package com.namankhurpia.adminapp;

import android.app.Activity;
import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.view.View.OnClickListener;
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

import org.w3c.dom.ProcessingInstruction;

public class MainActivity extends AppCompatActivity implements OnClickListener{

    private Button attendance;
    private Button food;
    private Button goodies;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        attendance=(Button)findViewById(R.id.attendancebtn);
        food=(Button)findViewById(R.id.foodbtn);
        goodies=(Button)findViewById(R.id.goodiesbtn);


        food.setOnClickListener(this);
        attendance.setOnClickListener(this);
        goodies.setOnClickListener(this);

    }



    @Override
    public void onClick(View v) {

      switch (v.getId()) {

            case R.id.attendancebtn:
            {
                Intent at = new Intent(MainActivity.this, attendance.class);
                startActivity(at);

            }
            break;

          case R.id.foodbtn:
          {
              Intent fd=new Intent(MainActivity.this,add_food.class);
              startActivity(fd);

          }
          break;

          case R.id.goodiesbtn:
          {
              Intent go=new Intent(MainActivity.this,add_goodies.class);
              startActivity(go);

          }
          break;


        }

    }
}
