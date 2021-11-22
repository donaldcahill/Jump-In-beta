package com.jih.jumpinhelpclient.models;

public class PayOptions {
    private String idPayOption;
    private Float amount;
    private String description;
    private int state;

    public String getIdPayOption() {
        return idPayOption;
    }

    public void setIdPayOption(String idPayOption) {
        this.idPayOption = idPayOption;
    }

    public Float getAmount() {
        return amount;
    }

    public void setAmount(Float amount) {
        this.amount = amount;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getState() {
        return state;
    }

    public void setState(int state) {
        this.state = state;
    }
}
