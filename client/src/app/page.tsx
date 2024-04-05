'use client'

import axios from "axios";
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {


  useEffect(() => {
axios.post('http://localhost:8000/api/blog/post', {
  title: 
}).then(res => {
  console.log(res);
})
  }, [])


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

    </main>
  );
}
