play:
	curl --request POST \
     --url https://play.ht/api/v2/tts \
     --header 'AUTHORIZATION: Bearer 54938145a62848ad93271e1fdf25eca3' \
     --header 'X-USER-ID: OttK1XBblQUQpMIHVBR3w5RKS9l2' \
     --header 'accept: text/event-stream' \
     --header 'content-type: application/json' \
     --data '{"text": "Hello World!", "voice": "larry"}'
