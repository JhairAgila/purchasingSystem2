import axios from "axios";

const BASE_URL = "http://localhost:3000/api/";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NDFhYTA2MTFlNDg2NjIyMGM1NGZkYyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4MzQxOTE5MiwiZXhwIjoxNjgzNjc4MzkyfQ.vdkT9cvwjQ4b6jvDKD3VaXntLOLGf5dDLqLP7eEAVSI";
export const publicRequest = axios.create({
    baseURL: BASE_URL,
});

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: {token: `Bearer ${TOKEN}`},
});