package com.example.demo.DTO;

import com.example.demo.model.user;

public class PostDTO {
    private Integer id;
    private String title;
    private String body;
    private String img;
    private Integer commentsCount;
    private Integer user;


    public PostDTO(Integer id, String title, String body, String img, Integer commentsCount, Integer user) {
        this.id = id;
        this.title = title;
        this.body = body;
        this.img = img;
        this.commentsCount = commentsCount;
        this.user = user;
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

    public Integer getUserId() {
        return user;
    }

    public void setUserId(Integer userId) {
        this.user = userId;
    }
}
