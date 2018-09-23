const { TA_API_KEY } = require('../../secrets')
const ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3')
const toneAnalyzer = new ToneAnalyzerV3({
  version: '2017-09-21',
  iam_apikey: TA_API_KEY,
  url: 'https://gateway-wdc.watsonplatform.net/tone-analyzer/api'
})

const text = `Two people suggested that I send a Slack to the person but I felt like I got what I deserved for being late.

I got kind of frustrated this afternoon because my linter stopped working and I couldn't get a hook on my user model for the diary to work. It turns out that I misunderstood the hook syntax. The same thing happened in the Pillars checkpoint. I don't know if it's me or if the docs are unclear.`

const toneParams = {
  tone_input: { text },
  content_type: 'application/json'
}

toneAnalyzer.tone(toneParams, (err, toneAnalysis) => {
  if (err) {
    console.err(err)
  } else {
    console.log(JSON.stringify(toneAnalysis, null, 2))
  }
})


