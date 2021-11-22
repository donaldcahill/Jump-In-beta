package com.jih.jumpinhelpclient;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.Spinner;
import android.widget.Toast;

import com.google.android.material.appbar.MaterialToolbar;
import com.google.android.material.textfield.TextInputEditText;
import com.google.gson.Gson;
import com.jih.jumpinhelpclient.interfaces.JhiAPI;
import com.jih.jumpinhelpclient.models.Countries;
import com.jih.jumpinhelpclient.models.GlobalDto;
import com.jih.jumpinhelpclient.models.Languages;
import com.jih.jumpinhelpclient.models.PayOptions;
import com.jih.jumpinhelpclient.models.Users;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class SignUpActivity extends AppCompatActivity {
    public List<String> lstLanguages = new ArrayList<>();
    public List<String> lstCountries = new ArrayList<>();
    public List<Languages> lstObjLanguages = new ArrayList<>();
    public List<Countries> lstObjCountries = new ArrayList<>();
    MaterialToolbar toolbar;

    public boolean guardar = false;

    public String languageSelected = "";
    public String countrySelected = "";
    Spinner sp, cbxCountry;
    Button btnRegistro;
    TextInputEditText txtFirstName, txtPhone, txtEmail, txtPass;
    RadioGroup rbPayment;

    Users users = new Users();
    public String idUser = "";
    public String idPayOption = "";

    public String login = "";
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_sign_up);
        toolbar = (MaterialToolbar) findViewById(R.id.topAppBar);

        toolbar.setTitle("Sign Up");
        toolbar.setSubtitle("Jump In Help");

        sp = (Spinner) findViewById(R.id.cbxLanguage);
        cbxCountry = (Spinner) findViewById(R.id.cbxCountry);
        btnRegistro = (Button) findViewById(R.id.btnRegisterSignUp);
        txtFirstName = (TextInputEditText) findViewById(R.id.txtFirstNameSignUp);
        txtPhone = (TextInputEditText) findViewById(R.id.txtPhoneNumberSignUp);
        txtEmail = (TextInputEditText) findViewById(R.id.txtEmailSignUp);
        txtPass = (TextInputEditText) findViewById(R.id.txtPassSignUp);
        rbPayment = (RadioGroup) findViewById(R.id.radioGroup);
        SharedPreferences prefe=getSharedPreferences("jih_data", Context.MODE_PRIVATE);
        idUser = prefe.getString("user_id","");
        login = prefe.getString("login", "");

        txtEmail.setOnFocusChangeListener(new View.OnFocusChangeListener() {
            @Override
            public void onFocusChange(View v, boolean hasFocus) {
                validateEmail(txtEmail.getText().toString());
            }
        });

        if(idUser.length()>0){
            Intent intent = new Intent(getApplicationContext(), MainActivity.class);
            intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
            intent.putExtra("EXIT", true);
            startActivity(intent);
        }

        findLanguages();
        findPayments();
        listCountries();
        ArrayAdapter<String> adapter=new ArrayAdapter<String>(getApplicationContext(),android.R.layout.simple_list_item_1,lstLanguages);
        sp.setAdapter(adapter);
        sp.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                //Toast.makeText(getApplicationContext(), lstLanguages.get(position), Toast.LENGTH_LONG).show();
                String select = lstLanguages.get(position);
                for (int i = 0; i < lstObjLanguages.size(); i++) {
                    if(lstObjLanguages.get(i).getDescription().equals(select)){
                        languageSelected = lstObjLanguages.get(i).getIdLanguage();
                        System.out.println(languageSelected);
                        return;
                    }
                }

            }

            @Override
            public void onNothingSelected(AdapterView<?> parent) {

            }
        });
        cbxCountry.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                String select = lstCountries.get(position).split("\\+")[0].trim();
                for (int i = 0; i < lstObjCountries.size(); i++) {
                    if(lstObjCountries.get(i).getNameCountry().equals(select)){
                        countrySelected = lstObjCountries.get(i).getIdCountry();
                        System.out.println(countrySelected);
                        return;
                    }
                }
            }

            @Override
            public void onNothingSelected(AdapterView<?> parent) {

            }
        });
        rbPayment.setOnCheckedChangeListener(new RadioGroup.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(RadioGroup group, int checkedId) {
                idPayOption = checkedId + "";
            }
        });
        btnRegistro.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(!guardar) {
                    Toast.makeText(getApplicationContext(), "That email is already registered.", Toast.LENGTH_SHORT).show();
                    txtEmail.setError("That email is already registered.");
                    return;
                }
                String email = txtEmail.getText().toString().trim();
                String pass = txtPass.getText().toString().trim();
                String name = txtFirstName.getText().toString().trim();
                String phone = txtPhone.getText().toString().trim();
                String emailPattern = "[a-zA-Z0-9._-]+@[a-z]+\\.+[a-z]+";
                if(phone.length() ==0){
                    txtPhone.setError("Phone is required.");
                    return;
                }
                if(name.length() ==0){
                    txtFirstName.setError("Name is required.");
                    return;
                }
                if(email.length() ==0){
                    txtEmail.setError("Email is required.");
                    return;
                }
                if(pass.length() == 0) {
                    txtPass.setError("Password is required.");
                    return;
                }
                if (!email.matches(emailPattern)){
                    txtEmail.setError("Invalid email address.");
                    return;
                }


                users.setName(name);
                users.setPhone(phone);
                users.setEmail(email);
                users.setPass(pass);
                users.setIdPayOption(idPayOption);
                users.setIdLanguage(languageSelected);
                users.setIdCountry(countrySelected);
                users.setState(1);
                createUser(users);
            }
        });
    }
    private void createUser(Users users) {
        Retrofit retrofit = new Retrofit.Builder().baseUrl(Enviroments.URL)
                .addConverterFactory(GsonConverterFactory.create()).build();
        JhiAPI jhiApi = retrofit.create(JhiAPI.class);
        Call<Users> call = jhiApi.createUser(users);
        call.enqueue(new Callback<Users>() {
            @Override
            public void onResponse(Call<Users> call, Response<Users> response) {
                try {
                    if(response.isSuccessful()){
                        if(response.body().getIdUser()!=null){
                            Toast.makeText(getApplicationContext(), "User " + response.body().getEmail() + " has been created successfully.", Toast.LENGTH_LONG).show();

                            SharedPreferences preferencias=getSharedPreferences("jih_data", Context.MODE_PRIVATE);
                            SharedPreferences.Editor editor=preferencias.edit();
                            editor.putString("user_id", response.body().getIdUser());
                            editor.putString("login", response.body().getEmail());
                            editor.putString("id_language", response.body().getIdLanguage());
                            editor.commit();
                            //startService(new Intent(getApplicationContext(), SimpleService.class));
                            //finish();
                            //onBackPressed();
                            //System.exit(0);
                            //onBackPressed();
                            Intent intent = new Intent(getApplicationContext(),MainActivity.class);
                            startActivity(intent);
                        }

                    }else{
                        Toast.makeText(getApplicationContext(), "There was an error recording the data.", Toast.LENGTH_LONG).show();
                    }
                }catch (Exception ex) {
                    System.out.println(ex.getMessage());
                    Toast.makeText(getApplicationContext(), "There was an error recording the data.", Toast.LENGTH_LONG).show();
                }
            }

            @Override
            public void onFailure(Call<Users> call, Throwable t) {
                System.out.println(t.getMessage());
                Toast.makeText(getApplicationContext(), "There was an error recording the data.", Toast.LENGTH_LONG).show();
            }
        });
    }
    private void findLanguages() {
        Retrofit retrofit = new Retrofit.Builder().baseUrl(Enviroments.URL)
                .addConverterFactory(GsonConverterFactory.create()).build();
        JhiAPI jhiApi = retrofit.create(JhiAPI.class);
        Call<List<Languages>> call = jhiApi.listLanguages();
        call.enqueue(new Callback<List<Languages>>() {
            @Override
            public void onResponse(Call<List<Languages>> call, Response<List<Languages>> response) {
                try {
                    System.out.println("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%2");
                    if(response.isSuccessful()){
                        System.out.println(new Gson().toJson(response.body()));
                        List<Languages> lst = response.body();
                        lstObjLanguages = lst;

                        for (Languages item: lst) {
                            lstLanguages.add(item.getDescription());
                            if( item.getDescription().equals("ENGLISH")) {
                                languageSelected = item.getIdLanguage();
                            }
                        }
                        ArrayAdapter<String> adapter = new ArrayAdapter<String>(getApplicationContext(),android.R.layout.simple_list_item_1,lstLanguages);
                        sp.setAdapter(adapter);
                        /*for (int i = 0; i < lstObjLanguages.size(); i++) {
                            if( lstObjLanguages.get(i).getDescription().equals("ENGLISH")) {
                                languageSelected = lstObjLanguages.get(i).getIdLanguage();
                                System.out.println("----------------------languageSelected " + languageSelected);
                                return;
                            }
                        }*/
                    }
                }catch (Exception ex) {
                    String mensaje = ex.getMessage();
                    Toast.makeText(getApplicationContext(), mensaje, Toast.LENGTH_LONG).show();
                }
            }

            @Override
            public void onFailure(Call<List<Languages>> call, Throwable t) {
                System.out.println("*****************************************************************************");
                System.out.println(t.getMessage());
                Toast.makeText(getApplicationContext(), t.getMessage(), Toast.LENGTH_LONG).show();
            }
        });
    }
    private void listCountries() {
        Retrofit retrofit = new Retrofit.Builder().baseUrl(Enviroments.URL)
                .addConverterFactory(GsonConverterFactory.create()).build();
        JhiAPI jhiApi = retrofit.create(JhiAPI.class);
        Call<List<Countries>> call = jhiApi.listCountries();
        call.enqueue(new Callback<List<Countries>>() {
            @Override
            public void onResponse(Call<List<Countries>> call, Response<List<Countries>> response) {
                try {
                    System.out.println("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%2");
                    if(response.isSuccessful()){
                        System.out.println(new Gson().toJson(response.body()));
                        List<Countries> lst = response.body();
                        lstObjCountries = lst;

                        for (Countries item: lst) {
                            lstCountries.add(item.getNameCountry() + " +" + item.getCallingCode());
                            if( item.getNameCountry().equals("Afghanistan")) {
                                countrySelected = item.getIdCountry();
                            }
                        }
                        ArrayAdapter<String> adapter = new ArrayAdapter<String>(getApplicationContext(),android.R.layout.simple_list_item_1,lstCountries);
                        cbxCountry.setAdapter(adapter);
                        /*for (int i = 0; i < lstObjLanguages.size(); i++) {
                            if( lstObjLanguages.get(i).getDescription().equals("ENGLISH")) {
                                languageSelected = lstObjLanguages.get(i).getIdLanguage();
                                System.out.println("----------------------languageSelected " + languageSelected);
                                return;
                            }
                        }*/
                    }
                }catch (Exception ex) {
                    String mensaje = ex.getMessage();
                    Toast.makeText(getApplicationContext(), mensaje, Toast.LENGTH_LONG).show();
                }
            }

            @Override
            public void onFailure(Call<List<Countries>> call, Throwable t) {
                System.out.println("*****************************************************************************");
                System.out.println(t.getMessage());
                Toast.makeText(getApplicationContext(), t.getMessage(), Toast.LENGTH_LONG).show();
            }
        });
    }
    private void findPayments() {
        Retrofit retrofit = new Retrofit.Builder().baseUrl(Enviroments.URL)
                .addConverterFactory(GsonConverterFactory.create()).build();
        JhiAPI jhiApi = retrofit.create(JhiAPI.class);
        Call<List<PayOptions>> call = jhiApi.listPayOptions();
        call.enqueue(new Callback<List<PayOptions>>() {
            @Override
            public void onResponse(Call<List<PayOptions>> call, Response<List<PayOptions>> response) {
                try{
                    if(response.isSuccessful()){
                        List<PayOptions> lst = response.body();
                        boolean primeraPasda = true;
                        for (PayOptions item: lst) {

                            RadioButton radioButton = new RadioButton(getApplicationContext());
                            radioButton.setText(item.getDescription());
                            radioButton.setId(Integer.parseInt(item.getIdPayOption()));//set radiobutton id and store it somewhere
                            if(primeraPasda){
                                radioButton.setChecked(true);
                                primeraPasda = false;
                            }
                            RadioGroup.LayoutParams params = new RadioGroup.LayoutParams(RadioGroup.LayoutParams.WRAP_CONTENT, RadioGroup.LayoutParams.WRAP_CONTENT);
                            rbPayment.addView(radioButton, params);
                        }

                    }else{

                        Toast.makeText(getApplicationContext(), "Error.", Toast.LENGTH_LONG).show();
                    }
                }catch (Exception ex) {
                    String mensaje = ex.getMessage();
                    Toast.makeText(getApplicationContext(), mensaje, Toast.LENGTH_LONG).show();
                }
            }

            @Override
            public void onFailure(Call<List<PayOptions>> call, Throwable t) {

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
                            guardar = false;
                            txtEmail.setError("That email is already registered.");
                            Toast.makeText(getApplicationContext(), "That email is already registered.", Toast.LENGTH_SHORT).show();
                        }else{
                            guardar = true;

                        }
                    }
                }catch (Exception ex){
                    String mensaje = ex.getMessage();
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