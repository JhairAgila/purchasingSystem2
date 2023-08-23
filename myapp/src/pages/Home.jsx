import React from "react";
import { NavBar } from "../components/NavBar";
import { Announcement } from "../components/Announcement";
import { Slider } from "../components/Slider";
import { Categories } from "../components/Categories";
import { Products } from "../components/Products";
import { NewsLetter } from "../components/NewsLetter";
import {Footer} from "../components/Footer"

export default function Home() {
  return (
    <div>
      <Announcement />
      <NavBar />
      <Slider />
      <Categories/>
      <Products/>
      <NewsLetter/> 
      <Footer/>
    </div>
  );
}

