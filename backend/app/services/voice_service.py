import speech_recognition as sr


def speech_to_text(audio_path: str):
    recognizer = sr.Recognizer()

    with sr.AudioFile(audio_path) as source:
        audio = recognizer.record(source)

    text = recognizer.recognize_google(audio)

    return text