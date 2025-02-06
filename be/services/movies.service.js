import axios from "axios";

export const getallmovies = async(url)=>{
  const options = {
    headers: {
      accept:"application/json",
      Authorization: "d1695eb7"
    }
  }
  const response = await axios.get(url,options)
  if(response.status !== 200){
    throw new Error("Failed to fetch data form movie database" + response.statusText)
  }
  return response.data;
}