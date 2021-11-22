package com.jih.jumpinhelpclient;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

import com.google.android.material.appbar.MaterialToolbar;
import com.google.android.material.textfield.TextInputEditText;
import com.jih.jumpinhelpclient.interfaces.JhiAPI;
import com.jih.jumpinhelpclient.models.LoginDto;
import com.jih.jumpinhelpclient.models.Users;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class SignInActivity extends AppCompatActivity {
    MaterialToolbar toolbar;
    TextInputEditText txtSignInEmail, txtSignInPass;
    Button btnSignInLogin;
    public String idUser = "";
    public String login = "";
    public String idLanguage = "";
    LoginDto loginDto = new LoginDto();
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_sign_in);
        toolbar = findViewById(R.id.topAppBar);
        toolbar.setTitle("Sign In");
        txtSignInEmail = findViewById(R.id.txtSignInEmail);
        txtSignInPass = findViewById(R.id.txtSignInPass);
        btnSignInLogin = findViewById(R.id.btnsignUpLogin);

        SharedPreferences prefe=getSharedPreferences("jih_data", Context.MODE_PRIVATE);
        idUser = prefe.getString("user_id","");
        login = prefe.getString("login", "");
        idLanguage = prefe.getString("id_language", "");
        if(idUser.length()>0){
            Intent intent = new Intent(SignInActivity.this, MainActivity.class);
            intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
            intent.putExtra("EXIT", true);
            startActivity(intent);
        }

        btnSignInLogin.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String email = txtSignInEmail.getText().toString().trim();
                String pass = txtSignInPass.getText().toString().trim();
                String emailPattern = "[a-zA-Z0-9._-]+@[a-z]+\\.+[a-z]+";
                if(email.length()== 0){
                    txtSignInEmail.setError("Email is required.");
                    return;
                }
                if(pass.length() == 0) {
                    txtSignInPass.setError("Password is required.");
                    return;
                }
                if (!email.matches(emailPattern)){
                    txtSignInEmail.setError("Invalid email address.");

                    return;
                }
                loginDto.setUser(email);
                loginDto.setPass(pass);
                loginUser(loginDto);
            }
        });


    }

    private void loginUser(LoginDto loginDto) {
        Retrofit retrofit = new Retrofit.Builder().baseUrl(Enviroments.URL)
                .addConverterFactory(GsonConverterFactory.create()).build();
        JhiAPI jhiApi = retrofit.create(JhiAPI.class);
        Call<Users> call = jhiApi.findUserByUserPass(loginDto);
        call.enqueue(new Callback<Users>() {
            @Override
            public void onResponse(Call<Users> call, Response<Users> response) {
                try {
                    if(response.isSuccessful()){
                        if(response.body().getIdUser()!=null){

                            SharedPreferences preferencias=getSharedPreferences("jih_data",Context.MODE_PRIVATE);
                            SharedPreferences.Editor editor=preferencias.edit();
                            editor.putString("user_id", response.body().getIdUser());
                            editor.putString("login", response.body().getEmail());
                            editor.putString("id_language", response.body().getIdLanguage());
                            editor.commit();

                            Toast toast = Toast.makeText(SignInActivity.this, "User " + response.body().getEmail() + " has been logued successfully.", Toast.LENGTH_LONG);
                            toast.show();
                            //startService(new Intent(getApplicationContext(), SimpleService.class));
                            //onBackPressed();
                            Intent intent = new Intent(SignInActivity.this,MainActivity.class);
                            startActivity(intent);

                        }

                    }else{
                        Toast toast = Toast.makeText(SignInActivity.this, "Incorrect email or password.", Toast.LENGTH_LONG);
                        toast.show();
                    }
                }catch (Exception ex) {
                    System.out.println(ex.getMessage());
                    Toast toast = Toast.makeText(SignInActivity.this, "Error accessing user data.", Toast.LENGTH_LONG);
                    toast.show();
                }
            }

            @Override
            public void onFailure(Call<Users> call, Throwable t) {
                Toast toast = Toast.makeText(SignInActivity.this, "Error accessing user data.", Toast.LENGTH_LONG);
                toast.show();
            }
        });
    }
}