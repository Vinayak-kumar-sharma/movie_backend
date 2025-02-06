import { getallmovies } from "../services/movies.service.js";

export async function getalltrend(req,res){
  try {
    const data =  await getallmovies("http://www.omdbapi.com")
    const readmovies = data.Search[Math.floor(Math.random() * data.Search?.length)];
    res.json({content: readmovies})
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch trending movies" });
  }
}