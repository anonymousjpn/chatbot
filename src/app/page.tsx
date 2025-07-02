"use client";
import { GoogleGenAI } from "@google/genai";
import React from "react";
import { useState } from 'react';
export default function Home() {
  const [searchStart, setSearchStart] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchResult, setSearchResult] = useState<React.ReactNode>("");
  const handleSearchValue = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(event.target.value);
  };
  const handleSearch = async () => {
    setSearchStart(true);
    try {
      const response = await fetch("/API", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ content: searchValue })
      });
      const data = await response.json();
      if (response.ok) {
        setSearchResult(<p>{data.result}</p>);
      } else {
        setSearchResult(data.error || "エラーが発生しました。");
      }
    } catch (error) {
      setSearchResult("ネットワークエラーが発生しました。");
    } finally {
      setSearchStart(false);
    }
  };
  return (
    <main>
      <h1>Gemini API</h1>
      <div className="input">
        <textarea id="textbox" placeholder="質問を入力" value={searchValue} onChange={handleSearchValue} />
        <button type="button" onClick={() => handleSearch()}>回答を生成</button>
      </div>
      <div className="wrapper">
      {searchStart&&<p id="searching">検索中．．．</p>}
      {!searchStart && searchResult && <div>{searchResult}</div>}
      </div>
    </main>
  );
}
