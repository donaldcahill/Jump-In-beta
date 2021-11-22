package com.jih.jumpinhelpclient;

import android.annotation.SuppressLint;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.Color;
import android.net.Uri;
import android.view.Gravity;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import androidx.core.content.ContextCompat;

import com.bsk.floatingbubblelib.FloatingBubbleConfig;
import com.bsk.floatingbubblelib.FloatingBubbleService;
import com.google.gson.Gson;
import com.jih.jumpinhelpclient.interfaces.JhiAPI;
import com.jih.jumpinhelpclient.models.OperatorAvailableDto;
import com.jih.jumpinhelpclient.models.Operators;
import com.jih.jumpinhelpclient.models.Operators;
import com.jih.jumpinhelpclient.models.UsersOperators;

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class BubbleService extends FloatingBubbleService {
    Button btnLlamada;
    TextView txtTitle, txtDescription;
    public String idUser = "";
    public String login = "";
    public String idLanguage = "";
    public String idOperador = "";
    public UsersOperators usersOperators = new UsersOperators();
    @Override
    protected FloatingBubbleConfig getConfig() {
        Context context = getApplicationContext();
        return new FloatingBubbleConfig.Builder()
                .bubbleIcon(ContextCompat.getDrawable(context, R.drawable.web_icon))
                .removeBubbleIcon(ContextCompat.getDrawable(context, com.bsk.floatingbubblelib.R.drawable.close_default_icon))
                .bubbleIconDp(70)
                .expandableView(loadView())
                .removeBubbleIconDp(70)
                .paddingDp(4)
                .borderRadiusDp(0)
                .physicsEnabled(true)
                .expandableColor(Color.WHITE)
                .triangleColor(0xFFFFFFFF)
                .gravity(Gravity.LEFT)
                .build();
    }
    @SuppressLint("ResourceAsColor")
    private View loadView(){
        View rootView = getInflater().inflate(R.layout.activity_call, null);
        txtTitle = rootView.findViewById(R.id.txtPopuptitle);
        txtDescription = rootView.findViewById(R.id.txtPopupDescription);

        txtTitle.setText("Jump In Help");
        txtDescription.setText("Press the button for an expert to help you.");
        btnLlamada = (Button) rootView.findViewById(R.id.btnLlamadaJump);
        btnLlamada.setText("Call an Expert");
        btnLlamada.setTextColor(Color.parseColor("#FFFFFF"));
        btnLlamada.setTextSize(19);
        btnLlamada.setBackgroundColor(Color.parseColor("#219921"));


        SharedPreferences prefe=getSharedPreferences("jih_data", Context.MODE_PRIVATE);
        idUser = prefe.getString("user_id","");
        login = prefe.getString("login", "");
        idLanguage = prefe.getString("id_language", "");

        btnLlamada.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                getOperator();
            }
        });
        return rootView;
    }
    private void getOperator() {
        Retrofit retrofit = new Retrofit.Builder().baseUrl(Enviroments.URL)
                .addConverterFactory(GsonConverterFactory.create()).build();
        JhiAPI jhiApi = retrofit.create(JhiAPI.class);
        System.out.println("*************************************************");
        System.out.println(idLanguage);
        Call<OperatorAvailableDto> call = jhiApi.findByLanguage(idLanguage);
        call.enqueue(new Callback<OperatorAvailableDto>() {
            @Override
            public void onResponse(Call<OperatorAvailableDto> call, Response<OperatorAvailableDto> response) {
                System.out.println(new Gson().toJson(response.body()));

                if(response.body() != null){
                    OperatorAvailableDto res = response.body();
                    if(res.isState()){
                        Operators op = res.getOperator();

                        idOperador = op.getIdOperator();
                        usersOperators.setIdOperator(idOperador);
                        usersOperators.setIdUser(idUser);
                        usersOperators.setState(true);
                        guardarLlamada();

                        String numero = "tel:" + op.getPhoneNumber();
                        System.out.println(numero);
                        Intent i = new Intent(Intent.ACTION_CALL, Uri.parse(numero));
                        i.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                        setState(false);
                        startActivity(i);
                    }else{
                        Toast toast1 =
                                Toast.makeText(getApplicationContext(),
                                        "No operators available.", Toast.LENGTH_SHORT);

                        toast1.show();
                    }

                }else{
                    Toast toast1 =
                            Toast.makeText(getApplicationContext(),
                                    "No operators available.", Toast.LENGTH_SHORT);

                    toast1.show();
                }

            }

            @Override
            public void onFailure(Call<OperatorAvailableDto> call, Throwable t) {
                System.out.println(t.getCause());
                System.out.println(t.getMessage());
                Toast toast1 =
                        Toast.makeText(getApplicationContext(),
                                "Error communicating with operator.", Toast.LENGTH_SHORT);

                toast1.show();
            }
        });
        
    }
    private void guardarLlamada() {
        Retrofit retrofit = new Retrofit.Builder().baseUrl(Enviroments.URL)
                .addConverterFactory(GsonConverterFactory.create()).build();
        JhiAPI jhiApi = retrofit.create(JhiAPI.class);

        Call<UsersOperators> call = jhiApi.registerUserOperator(usersOperators);
        call.enqueue(new Callback<UsersOperators>() {
            @Override
            public void onResponse(Call<UsersOperators> call, Response<UsersOperators> response) {
                Toast toast1 =
                        Toast.makeText(getApplicationContext(),
                                "Data saved.", Toast.LENGTH_SHORT);

                toast1.show();
            }

            @Override
            public void onFailure(Call<UsersOperators> call, Throwable t) {
                System.out.println(t.getCause());
                System.out.println(t.getMessage());
                Toast toast1 =
                        Toast.makeText(getApplicationContext(),
                                "Error save data.", Toast.LENGTH_SHORT);

                toast1.show();
            }
        });

    }
}