package com.jih.jumpinhelpclient;

import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import android.Manifest;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.text.Html;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import com.bsk.floatingbubblelib.FloatingBubblePermissions;
import com.google.android.material.appbar.MaterialToolbar;
import com.google.android.material.button.MaterialButton;
import com.google.gson.Gson;
import com.jih.jumpinhelpclient.interfaces.JhiAPI;
import com.jih.jumpinhelpclient.models.GlobalDto;
import com.jih.jumpinhelpclient.models.UserValidator;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class MainActivity extends AppCompatActivity {

    MaterialToolbar toolbar;
    MaterialButton btnSignIn, btnSignUp, btnStart, btnCloseSesion;
    TextView txtCardTitle, txtCardSubtitle, txtCardDescription;
    public String idUser = "";
    public String login = "";
    public String idLanguage = "";
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        FloatingBubblePermissions.startPermissionRequest(this);

        SharedPreferences prefe=getSharedPreferences("jih_data", Context.MODE_PRIVATE);
        idUser = prefe.getString("user_id","");
        login = prefe.getString("login", "");
        idLanguage = prefe.getString("id_language", "");
        toolbar = (MaterialToolbar) findViewById(R.id.topAppBar);

        if(idUser.length() >0){

            UserValidator usrValidator = new UserValidator();
            usrValidator.setIdUser(idUser);
            usrValidator.setUser(login);
            findUserByIdAndEmail(usrValidator);

            System.out.println("**************************************************************");
            System.out.println(idUser);
        }

        toolbar.setTitle("Jump In Help");
        toolbar.setSubtitle("Jump In Help");

        int permissionCheck = ContextCompat.checkSelfPermission(
                MainActivity.this, Manifest.permission.CALL_PHONE);
        if (permissionCheck != PackageManager.PERMISSION_GRANTED) {
            Log.i("Mensaje", "No se tiene permiso para realizar llamadas telefónicas.");
            ActivityCompat.requestPermissions(MainActivity.this, new String[]{Manifest.permission.CALL_PHONE}, 225);

        }
        txtCardTitle = findViewById(R.id.txtCardTitle);
        txtCardSubtitle = findViewById(R.id.txtCardSubtitle);
        txtCardDescription = findViewById(R.id.txtCardDescription);
        txtCardTitle.setText("Start");
        txtCardSubtitle.setText("");
        txtCardDescription.setText("Sign up and we will help you to be more secure.");

        btnSignIn = (MaterialButton) findViewById(R.id.btnSignIn);
        btnSignUp = (MaterialButton) findViewById(R.id.btnSignUp);
        btnStart = (MaterialButton) findViewById(R.id.btnStart);
        btnCloseSesion = (MaterialButton) findViewById(R.id.btnCloseSesion);

        btnStart.setVisibility(View.INVISIBLE);
        btnCloseSesion.setVisibility(View.INVISIBLE);
        btnSignIn.setVisibility(View.VISIBLE);
        btnSignUp.setVisibility(View.VISIBLE);

        permissionCheck = ContextCompat.checkSelfPermission(
                MainActivity.this, Manifest.permission.CALL_PHONE);
        if (permissionCheck != PackageManager.PERMISSION_GRANTED) {
            Log.i("Mensaje", "No se tiene permiso para realizar llamadas telefónicas.");
            ActivityCompat.requestPermissions(MainActivity.this, new String[]{Manifest.permission.CALL_PHONE}, 225);

        }
        validarUsuarios();
        btnSignIn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent i = new Intent(MainActivity.this, SignInActivity.class);
                startActivity(i);
            }
        });
        btnSignUp.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent i = new Intent(MainActivity.this, SignUpActivity.class);
                startActivity(i);
            }
        });
        btnStart.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startService(new Intent(getApplicationContext(), BubbleService.class));
                onBackPressed();
            }
        });
        btnCloseSesion.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                SharedPreferences preferencias=getSharedPreferences("jih_data", Context.MODE_PRIVATE);
                SharedPreferences.Editor editor=preferencias.edit();
                editor.putString("user_id", "");
                editor.putString("login", "");
                editor.putString("id_language", "");
                editor.commit();

                Intent intent = new Intent(MainActivity.this, SliderActivity.class);
                startActivity(intent);
                finish();
            }
        });
    }

    public void validarUsuarios(){
        if(idUser.length() > 0){
            System.out.println("Ocultar login");
            txtCardTitle.setText("Start");
            txtCardSubtitle.setText("");
            txtCardDescription.setText(Html.fromHtml("To start your cyber security service press this <b>START</b> button." ));
            btnStart.setVisibility(View.VISIBLE);
            btnCloseSesion.setVisibility(View.VISIBLE);
            btnSignIn.setVisibility(View.INVISIBLE);
            btnSignUp.setVisibility(View.INVISIBLE);
            //startService(new Intent(getApplicationContext(), BubbleService.class));
            //onBackPressed();
        }else{
            System.out.println("Ocultar start");
            txtCardTitle.setText("Sign In or Sign Up");
            txtCardSubtitle.setText("");
            txtCardDescription.setText(Html.fromHtml("Sign up and we will <b>help</b> you to be more secure." ));
            btnStart.setVisibility(View.INVISIBLE);
            btnCloseSesion.setVisibility(View.INVISIBLE);
            btnSignIn.setVisibility(View.VISIBLE);
            btnSignUp.setVisibility(View.VISIBLE);

        }
    }
    @Override
    public void onBackPressed() {
        //super.onBackPressed();
        Intent intent = new Intent(Intent.ACTION_MAIN);
        intent.addCategory(Intent.CATEGORY_HOME);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        startActivity(intent);
    }

    public void findUserByIdAndEmail(UserValidator userValidator) {
        System.out.println("------------------------INGRESA-----------------------------------");
        Retrofit retrofit = new Retrofit.Builder().baseUrl(Enviroments.URL)
                .addConverterFactory(GsonConverterFactory.create()).build();
        JhiAPI jhiApi = retrofit.create(JhiAPI.class);
        Call<GlobalDto> call = jhiApi.findUserByIdAndEmail(userValidator);
        call.enqueue(new Callback<GlobalDto>() {
            @Override
            public void onResponse(Call<GlobalDto> call, Response<GlobalDto> response) {
                try{
                    System.out.println("----------------------------11111-------------------------------");
                    System.out.println(response.isSuccessful());
                    if(response.isSuccessful()){
                        GlobalDto respuesta = response.body();
                        System.out.println("-----------------------------------------------------------");
                        System.out.println(new Gson().toJson(respuesta));
                        if(!respuesta.isState()){
                            System.out.println(respuesta.isState());
                            SharedPreferences preferencias=getSharedPreferences("jih_data", Context.MODE_PRIVATE);
                            SharedPreferences.Editor editor=preferencias.edit();
                            editor.putString("user_id", "");
                            editor.putString("login", "");
                            editor.putString("id_language", "");
                            editor.commit();

                            Intent intent = new Intent(MainActivity.this, SliderActivity.class);
                            startActivity(intent);
                            finish();

                        }
                    }
                }catch (Exception ex){
                    String mensaje = ex.getMessage();
                    System.out.println("---------------------------ERROR-------------------------------");
                    System.out.println(mensaje);
                    Toast.makeText(getApplicationContext(), mensaje, Toast.LENGTH_LONG).show();
                }

            }

            @Override
            public void onFailure(Call<GlobalDto> call, Throwable t) {
                String mensaje = t.getMessage();
                Toast.makeText(getApplicationContext(), mensaje, Toast.LENGTH_LONG).show();
            }
        });
    }

}