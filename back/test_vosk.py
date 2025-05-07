from vosk import Model, KaldiRecognizer
import wave

model_path = "model"
audio_file = "test.wav"

model = Model(model_path)
recognizer = KaldiRecognizer(model, 16000)

with wave.open(audio_file, "rb") as wf:
    while True:
        data = wf.readframes(4000)
        if len(data) == 0:
            break
        if recognizer.AcceptWaveform(data):
            print(recognizer.Result())
    print(recognizer.FinalResult())