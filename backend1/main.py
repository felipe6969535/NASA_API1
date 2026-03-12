import os
import requests
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = FastAPI(title="API de Imagem de Nascimento da NASA")

# Enable CORS for frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify the actual frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/apod")
async def get_apod(date: str = Query(..., pattern=r"^\d{4}-\d{2}-\d{2}$")):
    """
    Fetches the NASA Astronomy Picture of the Day for a given date.
    Date format: YYYY-MM-DD
    """
    # Reload env in case it changed
    load_dotenv()
    api_key = os.getenv("NASA_API_KEY")
    
    if not api_key:
        raise HTTPException(status_code=500, detail="NASA_API_KEY não configurada no backend .env")

    url = f"https://api.nasa.gov/planetary/apod?api_key={api_key}&date={date}"
    
    # Use verify=False to bypass SSL check (common in some local/Windows environments)
    # We also suppress the insecure request warning to keep logs clean
    import urllib3
    urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

    try:
        response = requests.get(url, verify=False)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.HTTPError as e:
        if response.status_code == 404:
            raise HTTPException(status_code=404, detail="A NASA não possui uma imagem para esta data.")
        raise HTTPException(status_code=response.status_code, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Ocorreu um erro: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
