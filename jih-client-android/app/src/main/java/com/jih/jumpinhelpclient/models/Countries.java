package com.jih.jumpinhelpclient.models;

public class Countries {
    private String idCountry;
    private String nameCountry;
    private String callingCode;
    private String alphaCode_2;
    private String alphaCode_3;

    public String getIdCountry() {
        return idCountry;
    }

    public void setIdCountry(String idCountry) {
        this.idCountry = idCountry;
    }

    public String getNameCountry() {
        return nameCountry;
    }

    public void setNameCountry(String nameCountry) {
        this.nameCountry = nameCountry;
    }

    public String getAlphaCode_2() {
        return alphaCode_2;
    }

    public void setAlphaCode_2(String alphaCode_2) {
        this.alphaCode_2 = alphaCode_2;
    }

    public String getAlphaCode_3() {
        return alphaCode_3;
    }

    public void setAlphaCode_3(String alphaCode_3) {
        this.alphaCode_3 = alphaCode_3;
    }

    public String getCallingCode() {
        return callingCode;
    }

    public void setCallingCode(String callingCode) {
        this.callingCode = callingCode;
    }
}
