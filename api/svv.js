// api/svv.js

export default async function handler(req, res) {
    const { plate } = req.query;
  
    if (!plate) {
      return res.status(400).json({ error: "Missing license plate" });
    }
  
    const apiUrl = `https://akfell-datautlevering.atlas.vegvesen.no/enkeltoppslag/kjoretoydata?kjennemerke=${plate}`;
    
    try {
      const response = await fetch(apiUrl, {
        headers: {
          "SVV-Authorization": `Apikey ${process.env.SVV_API_KEY}`
        }
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        return res.status(response.status).json({ error: errorText });
      }
  
      const data = await response.json();
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ error: error.toString() });
    }
  }
  