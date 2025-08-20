from fastapi import FastAPI
import uvicorn

app = FastAPI()

@app.get("/health")
def health():
    return {"status": "ok", "service": "ai"}

def main():
    uvicorn.run("ai.main:app", host="0.0.0.0", port=8000, reload=True)
