import { useState,useEffect } from "react"
import prisma from "../db";

const SearchBar = () => {
    const [inputText, setInputText] = useState("");

    let inputHandler = (e) => {
        //convert input text to lower case
        // var lowerCase = e.target.value.toLowerCase();
        setInputText(e.target.value);
      };

    return (
        <input type="text" name="" id="" onChange={inputHandler} />
    )
}

export default SearchBar