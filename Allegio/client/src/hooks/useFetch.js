import axios from "axios";
import { useEffect, useState } from "react";
const useFetch =(url) =>{
  const [data, setdata]=useState([])
  const [loading,setloading]=useState([false])
  const [error,seterror]=useState([false])

    useEffect( ()=>{
      const fetchData = async () => {
        setloading(true);
        try {
          const res = await axios.get(url);
          setdata(res.data);
        } catch (err) {
          seterror(err);
        }
        setloading(false);
      };
      fetchData();
    }, []); const reFetch = async () => {
      setloading(true);
      try {
        const res = await axios.get(url);
        setdata(res.data);
      } catch (err) {
        seterror(err);
      }
      setloading(false);
    };
  
    return { data, loading, error, reFetch };
  };
  
  export default useFetch;
