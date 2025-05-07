from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from vosk import Model, KaldiRecognizer
from pydub import AudioSegment
import wave
import json
import os
import tempfile

app = FastAPI()

# Enable CORS to allow React frontend to communicate with backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load Vosk model
MODEL_PATH = "model"
if not os.path.exists(MODEL_PATH):
    raise Exception("Vosk model not found. Please place it in the 'model' folder.")
model = Model(MODEL_PATH)

@app.post("/transcribe")
async def transcribe_audio(file: UploadFile = File(...)):
    # Save uploaded file temporarily
    with tempfile.NamedTemporaryFile(delete=False, suffix=".webm") as temp_input:
        temp_input.write(await file.read())
        temp_input_path = temp_input.name

    # Convert to WAV (mono, 16kHz, 16-bit PCM)
    try:
        audio = AudioSegment.from_file(temp_input_path)
        audio = audio.set_channels(1).set_frame_rate(16000).set_sample_width(2)
        temp_wav_path = temp_input_path.replace(".webm", ".wav")
        audio.export(temp_wav_path, format="wav")

        # Process WAV file
        with wave.open(temp_wav_path, "rb") as wf:
            if wf.getnchannels() != 1 or wf.getframerate() != 16000 or wf.getsampwidth() != 2:
                raise HTTPException(status_code=400, detail="Invalid audio format")

            recognizer = KaldiRecognizer(model, wf.getframerate())
            recognizer.SetWords(True)

            result_text = ""
            while True:
                data = wf.readframes(4000)
                if len(data) == 0:
                    break
                if recognizer.AcceptWaveform(data):
                    result = json.loads(recognizer.Result())
                    result_text += result.get("text", "") + " "
            final_result = json.loads(recognizer.FinalResult())
            result_text += final_result.get("text", "")

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        # Clean up temporary files
        if os.path.exists(temp_input_path):
            os.remove(temp_input_path)
        if os.path.exists(temp_wav_path):
            os.remove(temp_wav_path)

    if not result_text.strip():
        raise HTTPException(status_code=400, detail="No speech detected")

    return {"transcript": result_text.strip()}