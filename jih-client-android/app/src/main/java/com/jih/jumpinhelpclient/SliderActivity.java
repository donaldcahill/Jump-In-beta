package com.jih.jumpinhelpclient;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.Color;
import android.os.Bundle;
import android.text.Html;
import android.widget.TextView;
import android.widget.Toast;

import com.google.android.material.appbar.MaterialToolbar;
import com.google.gson.Gson;
import com.hololo.tutorial.library.Step;
import com.hololo.tutorial.library.TutorialActivity;
import com.jih.jumpinhelpclient.interfaces.JhiAPI;
import com.jih.jumpinhelpclient.models.GlobalDto;
import com.jih.jumpinhelpclient.models.UserValidator;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class SliderActivity extends TutorialActivity {

    public String idUser = "";
    public String login = "";
    public String idLanguage = "";
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        //setContentView(R.layout.activity_slider);
        SharedPreferences prefe=getSharedPreferences("jih_data", Context.MODE_PRIVATE);
        idUser = prefe.getString("user_id","");
        login = prefe.getString("login", "");
        idLanguage = prefe.getString("id_language", "");
        if(idUser.length() >0){
            UserValidator usrValidator = new UserValidator();
            usrValidator.setIdUser(idUser);
            usrValidator.setUser(login);
            findUserByIdAndEmail(usrValidator);

        }

        addFragment(new Step.Builder().setTitle("Jump In Help")
                .setContent(Html.fromHtml("Thanks for joining the <b>Jump In Help</b> community" ).toString())
                .setBackgroundColor(Color.parseColor("#ffffff")) // int background color
                .setDrawable(R.drawable.ic_customer) // int top drawable
                .build());
        addFragment(new Step.Builder().setTitle("Jump In Help")
                .setContent("After registering and choosing your plan you will have installed our floating help button that will appear during your phone calls")
                .setBackgroundColor(Color.parseColor("#ffffff")) // int background color
                .setDrawable(R.drawable.ic_consulta) // int top drawable
                .build());

        addFragment(new Step.Builder().setTitle("Jump In Help")
                .setContent("All you need to do is press the button and follow the steps to have your personal cyber-security expert join your call")
                .setBackgroundColor(Color.parseColor("#ffffff")) // int background color
                .setDrawable(R.drawable.ic_conversation) // int top drawable
                .build());

        setPrevText(""); // Previous button text
        setNextText(""); // Next button text
        setFinishText("Finish"); // Finish button text
        setCancelText(""); // Cancel button text
    }

    @Override
    public void currentFragmentPosition(int position) {

    }

    @Override
    public void onPointerCaptureChanged(boolean hasCapture) {

    }

    @Override
    public void finishTutorial() {
        // Your implementation
        Intent intent = new Intent(SliderActivity.this, MainActivity.class);
        startActivity(intent);
        finish();
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


                        }else{
                            Intent intent = new Intent(SliderActivity.this, MainActivity.class);
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