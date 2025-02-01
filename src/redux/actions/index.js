import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

export const getFlights = createAsyncThunk("flight/getFlights", async () => {

    const params = {
        bl_lat: "24.396308",
        bl_lng: "-87.634918",
        tr_lat: "31.000968",
        tr_lng: "-80.031362",
        speed: "10",
    };

    // api isteğini at
    const res = await api.get("/flights/list-in-boundary", { params });

    // api'dan gelen veride dizi içerisinde dizi olduğundan projede kullanımı daha kolay olsun diye dizinin içerisindeki dizileri nesnelere çevir
    const formatted = res.data.aircraft.map((i) => ({
        id: i[0],
        code: i[1],
        lat: i[2],
        lng: i[3],
        deg: i[4],
    }));

    // slice'a aktarılacak payload'ı belirle
    return formatted;
});

export const getDetails = createAsyncThunk("detail/getDetails", async (id) => {
    // parametreleri belirle
    const params = {
        flight: id,
    };

    // api'dan detaları al
    const res = await api.get("/flights/detail", { params });

    // aksiyonun payload'ını belirle
    return res.data;
});