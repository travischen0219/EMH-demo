export async function text2voice(text: string) {
  const url = 'https://play.ht/api/v1/convert';
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      AUTHORIZATION: '54938145a62848ad93271e1fdf25eca3',
      'X-USER-ID': 'OttK1XBblQUQpMIHVBR3w5RKS9l2'
    },
    body: JSON.stringify({
      content: [text],
      voice: 'en-US-JennyNeural',
      globalSpeed: '120',
    })
  };

  fetch(url, options)
    .then(res => {
      return res.json()
        .then(json => `https://media.play.ht/full_${json.transcriptionId}.mp3`)
        .then(async url => {
          console.log(`trying ${url}...`);
          while ((await fetch(url)).status !== 200) {
            return url
          }
        })
    })
    .then(json => console.log(json))
    .catch(err => console.error('error:' + err));
  
}