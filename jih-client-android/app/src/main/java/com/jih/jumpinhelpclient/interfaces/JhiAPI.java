package com.jih.jumpinhelpclient.interfaces;

import com.jih.jumpinhelpclient.models.Countries;
import com.jih.jumpinhelpclient.models.GlobalDto;
import com.jih.jumpinhelpclient.models.Languages;
import com.jih.jumpinhelpclient.models.LoginDto;
import com.jih.jumpinhelpclient.models.OperatorAvailableDto;
import com.jih.jumpinhelpclient.models.OperatorBad;
import com.jih.jumpinhelpclient.models.Operators;
import com.jih.jumpinhelpclient.models.PayOptions;
import com.jih.jumpinhelpclient.models.UserValidator;
import com.jih.jumpinhelpclient.models.Users;
import com.jih.jumpinhelpclient.models.UsersOperators;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.Headers;
import retrofit2.http.POST;
import retrofit2.http.Path;

public interface JhiAPI {
    @Headers("Content-Type: application/json")
    @GET("operator/list-languages")
    public Call<List<Languages>> listLanguages();

    @Headers("Content-Type: application/json")
    @GET("operator/list-pay-options")
    public Call<List<PayOptions>> listPayOptions();

    @Headers("Content-Type: application/json")
    @GET("operator/list-countries")
    public Call<List<Countries>> listCountries();

    @Headers("Content-Type: application/json")
    @POST("user/create-user")
    public Call<Users> createUser(@Body Users user);

    @Headers("Content-Type: application/json")
    @POST("user/login-user")
    public Call<Users> findUserByUserPass(@Body LoginDto loginDto);

    @Headers("Content-Type: application/json")
    @GET("operator/operator-by-language/{id}")
    public Call<OperatorAvailableDto> findByLanguage(@Path("id") String id);

    @Headers("Content-Type: application/json")
    @POST("operator/create-user-operator")
    public Call<UsersOperators> registerUserOperator(@Body UsersOperators usersOperators);

    @Headers("Content-Type: application/json")
    @POST("user/user-validate")
    public Call<GlobalDto> findUserByIdAndEmail(@Body UserValidator userValidator);

    @Headers("Content-Type: application/json")
    @GET("user/email-validate/{email}")
    public Call<GlobalDto> validateEmail(@Path("email") String email);
}
