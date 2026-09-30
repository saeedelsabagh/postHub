package com.example.demo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.GenerationType;
@Entity
public class Post {
    @ManyToOne
    private user user;


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String title;
    private String body;
    private String img;
    private Integer commentsCount;


    public user getUser() {
        return user;
    }

    public void setUser(user user) {
        this.user = user;
    }

    public Post(String title, String body, String img, Integer commentsCount, Integer id) {
        this.title = title;
        this.body = body;
        this.img = img;
        this.commentsCount = commentsCount;
        this.id = id;

    }

    public Post() {
    }


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }

    public Integer getCommentsCount() {
        return commentsCount;
    }

    public void setCommentsCount(Integer commentsCount) {
        this.commentsCount = commentsCount;
    }

}
