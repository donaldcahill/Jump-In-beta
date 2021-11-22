package com.jih.jumpinhelpclient.models;

public class UsersOperators {
    private String idUserOperator;
    private String idUser;
    private String idOperator;
    private String comments;
    private int qualification;
    private String registrationDate;
    private boolean state;

    public String getIdUserOperator() {
        return idUserOperator;
    }

    public void setIdUserOperator(String idUserOperator) {
        this.idUserOperator = idUserOperator;
    }

    public String getIdUser() {
        return idUser;
    }

    public void setIdUser(String idUser) {
        this.idUser = idUser;
    }

    public String getIdOperator() {
        return idOperator;
    }

    public void setIdOperator(String idOperator) {
        this.idOperator = idOperator;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    public int getQualification() {
        return qualification;
    }

    public void setQualification(int qualification) {
        this.qualification = qualification;
    }

    public String getRegistrationDate() {
        return registrationDate;
    }

    public void setRegistrationDate(String registrationDate) {
        this.registrationDate = registrationDate;
    }

    public boolean getState() {
        return state;
    }

    public void setState(boolean state) {
        this.state = state;
    }
}
