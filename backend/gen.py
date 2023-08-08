# %%
import time

import requests
from fastapi import FastAPI
from fastapi.responses import FileResponse, Response

app = FastAPI()
print("generator init")


@app.get("/gen-avatar")
def read_root(text: str):
    url = "https://play.ht/api/v1/convert"
    payload = {
        "content": [text],
        "voice": "en-US-JennyNeural",
        # "globalSpeed": "120"
    }
    headers = {
        "accept": "application/json",
        "content-type": "application/json",
        "AUTHORIZATION": "54938145a62848ad93271e1fdf25eca3",
        "X-USER-ID": "OttK1XBblQUQpMIHVBR3w5RKS9l2",
    }

    response = requests.post(url, json=payload, headers=headers)
    response = response.json()
    url = f"https://media.play.ht/full_{response['transcriptionId']}.mp3"

    while True:
        doc = requests.get(url)
        if doc.status_code == 200:
            break
        time.sleep(0.1)

    print("audio url ready")
    doc = requests.get(url)

    print(url)
    print("audio downloaded")

    with open("tmp.mp3", "wb") as f:
        f.write(doc.content)

    print("audio saved")

    # return Response(content=doc.content, media_type='audio/mpeg')

    result = gen.gen_mp4("tmp.mp3")

    return FileResponse(result, media_type="video/mp4")
