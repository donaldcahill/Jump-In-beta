package com.jih.jumpinhelpclient;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.widget.ArrayAdapter;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.google.gson.Gson;
import com.jih.jumpinhelpclient.interfaces.JhiAPI;
import com.jih.jumpinhelpclient.models.GlobalDto;
import com.jih.jumpinhelpclient.models.Languages;
import com.jih.jumpinhelpclient.models.UserValidator;
import com.jih.jumpinhelpclient.models.Users;

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class Utils {

    private Context intent;
    Utils(Context packageContext){
        intent = packageContext;
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
                            SharedPreferences preferencias=intent.getSharedPreferences("jih_data", Context.MODE_PRIVATE);
                            SharedPreferences.Editor editor=preferencias.edit();
                            editor.putString("user_id", "");
                            editor.putString("login", "");
                            editor.putString("id_language", "");
                            editor.commit();
                            System.out.println("---------------------------pasa aca--------------------------------");
                        }
                    }
                }catch (Exception ex){
                    String mensaje = ex.getMessage();
                    System.out.println("---------------------------ERROR-------------------------------");
                    System.out.println(mensaje);
                    Toast.makeText(intent, mensaje, Toast.LENGTH_LONG).show();
                }

            }

            @Override
            public void onFailure(Call<GlobalDto> call, Throwable t) {
                String mensaje = t.getMessage();
                Toast.makeText(intent, mensaje, Toast.LENGTH_LONG).show();
            }
        });
    }
    public void validateEmail(String email) {
        Retrofit retrofit = new Retrofit.Builder().baseUrl(Enviroments.URL)
                .addConverterFactory(GsonConverterFactory.create()).build();
        JhiAPI jhiApi = retrofit.create(JhiAPI.class);
        Call<GlobalDto> call = jhiApi.validateEmail(email);
        call.enqueue(new Callback<GlobalDto>() {
            @Override
            public void onResponse(Call<GlobalDto> call, Response<GlobalDto> response) {
                try{
                    if(response.isSuccessful()){
                        GlobalDto respuesta = response.body();
                        if(!respuesta.isState()){
                            Toast.makeText(intent, respuesta.getMessage(), Toast.LENGTH_LONG).show();
                        }
                    }
                }catch (Exception ex){
                    String mensaje = ex.getMessage();
                    Toast.makeText(intent, mensaje, Toast.LENGTH_LONG).show();
                }
            }

            @Override
            public void onFailure(Call<GlobalDto> call, Throwable t) {
                String mensaje = t.getMessage();
                Toast.makeText(intent, mensaje, Toast.LENGTH_LONG).show();
            }
        });
    }
}
