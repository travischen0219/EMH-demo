import json
import os
import time
from dataclasses import dataclass

import requests
from loguru import logger


@dataclass
class AudioItem:
    """Audio item from Play.ht API

    Args:
            text (str): Text to be converted to audio
            voice (str): Voice to be used for the audio
            audio_url (str): URL to download the audio
            transcription_id (str): ID of the transcription
            audio (bytes): Audio file in bytes
    """

    text: str
    voice: str
    audio_url: str
    transcription_id: str
    audio: bytes


class AudioUrlListLengthError(Exception):
    """Raised when the audio url list length is more than 1"""

    ...


class AudioGenerationFailed(Exception):
    """Raised when the audio generation fails"""

    ...


def get_audio(text: str) -> AudioItem:
    """get_audio generates audio from Play.ht API

        References:
                https://docs.play.ht/reference/api-convert-tts-standard-premium-voices
                https://docs.play.ht/reference/api-get-standard-premium-voices-article-conversion-status

    Args:
            text (str): Text to be converted to audio

    Raises:
                        AudioUrlListLengthError: Raised when the audio url list length is more than 1
                        AudioGenerationFailed: Raised when the audio generation fails

    Returns:
            AudioItem: Audio item from Play.ht API
    """
    url = os.getenv("PLAYHT_API_URL")
    payload = {
        "content": [text],
        "voice": "Oliver",
        "globalSpeed": "120",
    }
    headers = {
        "accept": "application/json",
        "content-type": "application/json",
        "AUTHORIZATION": os.getenv("PLAYHT_SECRET_KEY"),
        "X-USER-ID": os.getenv("PLAYHT_USER_ID"),
    }

    # Send the request
    logger.info(f"Generating audio by {url}")
    response = requests.post(url, json=payload, headers=headers).json()
    url = os.getenv("PLAYHT_DOWNLOAD_WAV_URL").format(
        transcriptionId=response["transcriptionId"],
    )

    # Wait for the audio to be ready
    for _ in range(50):
        doc = requests.get(url, headers=headers)

        if doc.status_code != 200:
            time.sleep(0.1)
            continue

        content = json.loads(doc.content)

        if content["transcriped"]:
            logger.info(f"Downloaded audio from {url}")

            if len(content["audioUrl"]) > 1:
                raise AudioUrlListLengthError("Audio url list length is more than 1")

            return AudioItem(
                text=text,
                voice="Oliver",
                audio_url=content["audioUrl"][0],
                transcription_id=content["transcriptionId"],
                audio=requests.get(content["audioUrl"][0]).content,
            )

    raise AudioGenerationFailed("Audio generation failed")
