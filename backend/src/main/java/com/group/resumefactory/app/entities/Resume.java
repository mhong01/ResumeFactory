package com.group.resumefactory.app.entities;

import org.springframework.data.annotation.Id;

public class Resume {
    @Id
    public String id;

    public String userId;
    public String content;

    public Resume() {}

    public Resume(String userId, String content) {
        this.userId = userId;
        this.content = content;
    }

    public String getUserId() {
        return userId;
    }

    public String getContent() {
        return content;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public void setContent(String content) {
        this.content = content;
    }
}