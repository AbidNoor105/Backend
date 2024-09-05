//AIzaSyCC1Q4JEjnoL5pM6HkzU6RWy8580qNdL6I suspended
//AIzaSyA9oj8T1eD1FGTteHNAPy8sujMkJSpnZXA
//AIzaSyB32aqAk8R0gbuSrmc4IXapIH3Jf_9gDWI
//AIzaSyBE5AM_nZat5Ox2uQSaqlbee6WuE7euzLs

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const textToSpeech = require('@google-cloud/text-to-speech');
const Speaker = require('speaker');
const {TranslationServiceClient} = require('@google-cloud/translate');

const app = express();
const port = 3000;

const apiKey = "AIzaSyBE5AM_nZat5Ox2uQSaqlbee6WuE7euzLs" // Use environment variables in production
const genAI = new GoogleGenerativeAI(apiKey);

// Creates a client; provide API key and project ID
const client = new textToSpeech.TextToSpeechClient({
  keyFilename: 'key.json' // Path to your API key file
});

const projectId = 'airabic';
const location = 'global';


// Instantiates a translation client
const translationClient = new TranslationServiceClient({
    keyFilename: 'key.json' // Path to your API key file
});

// Load the JSON data
const characters = require('./info.json');

//Adding English Speaker
characters["William"] = {
        "name": "William",
        "language": "en-US",
        "voice": "en-US-Journey-D",
        "gender": "MALE",
        "description": "Hey, I am william!",
        "personality": "You are english speaking"  
    }


// Using an in-memory storage for simplicity
let chatSession = null;
let chatHistory = [];



// Middleware
app.use(cors());
app.use(bodyParser.json());

app.post('/synthesize', async (req, res) => {
  const { text, character } = req.body;

  const request = {
    input: {text: text},
    voice: {languageCode: characters[character].language, name: characters[character].voice, ssmlGender: characters[character].gender},
    audioConfig: {audioEncoding: 'LINEAR16', sampleRateHertz: 24000},  // Use LINEAR16 for raw audio suitable for playback
  };

  try {
    const [response] = await client.synthesizeSpeech(request);
    res.set('Content-Type', 'audio/mp3');
    res.send(response.audioContent);  // Send the MP3 audio content back to the client
  } catch (error) {
    console.error('Failed to synthesize speech', error);
    res.status(500).send('Failed to synthesize speech');
  }
});

app.post('/get-response', async (req, res) => {
    const userInput = req.body.text;
    const character = req.body.character

    console.log("Input is: --> ", userInput);
    console.log("Talking to: " + character)


    chatHistory.push({ role: "user", parts: [{ text: userInput }] });

    try {
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-pro"
        });

        const generationConfig = {
            temperature: 0.9,
            topP: 0.95,
            maxOutputTokens: 512,
            responseMimeType: "text/plain"
        };

        if (!chatSession) {
            chatSession = await model.startChat({
                generationConfig,
                history: chatHistory
            });
        }

        const result = await chatSession.sendMessage("I am using you to practice my conversational arabic skills. No matter what is after the colon, please respond to me briefly in arabic. " + characters[character].personality + " Do not respond in English. Do not use Emojis. Act as human as possible. Make sure your answers are interesting and manages to keep a conversation going: " + userInput);
        const reply = result.response.text();

        chatHistory.push({ role: "model", parts: [{ text: reply }] }); // Save the AI's response to history

        console.log("Output is: --> ", reply);
        res.json({ message: reply });
    } catch (error) {
        console.error('Failed to process input with Gemini:', error.message);
        res.status(500).send({ error: 'Error processing input with Gemini', details: error.message });
    }
});

app.post('/translate', async (req, res) => {
    const { text, targetLanguageCode, sourceLanguageCode} = req.body;

    console.log(typeof text)

    console.log("Translating : " + text + " from " + sourceLanguageCode + " to " + targetLanguageCode)

    const request = {
        parent: `projects/${projectId}/locations/${location}`,
        contents: [text],
        mimeType: 'text/plain', // Mime types: text/plain, text/html
        sourceLanguageCode: sourceLanguageCode,
        targetLanguageCode: targetLanguageCode,
    };

    try {
        const [response] = await translationClient.translateText(request);
        const translations = response.translations.map(t => t.translatedText);
        res.json({ message: translations.join(' ') });
    } catch (error) {
        console.error('Failed to translate text', error);
        res.status(500).send({ error: 'Failed to translate text', details: error.message });
    }
});

app.post('/ask-gemini', async (req, res) => {
    const { question, context } = req.body;
    console.log(req.body)

    chatHistory.push({ role: "user", parts: [{ text: question }] });

    try {
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-pro"
        });

        const generationConfig = {
            temperature: 0.9,
            topP: 0.95,
            maxOutputTokens: 512,
            responseMimeType: "text/plain"
        };

        if (!chatSession) {
            chatSession = await model.startChat({
                generationConfig,
                history: chatHistory
            });
        }

        const result = await chatSession.sendMessage("An english speaker is asking this question, if they want an explantion, answer in english, but if they want an example sentence, or synonyms, or antonyms, give those in arabic. " + question + " " + context)
        const reply = result.response.text();

        chatHistory.push({ role: "model", parts: [{ text: reply }] }); // Save the AI's response to history

        console.log("Explanation: ", reply);
        res.json({ message: reply });
    } catch (error) {
        console.error('Failed to process input with Gemini:', error.message);
        res.status(500).send({ error: 'Error processing input with Gemini', details: error.message });
    }
});

app.post('/how-do-I-say', async (req, res) => {
    const { question } = req.body;
    console.log(req.body)


    chatHistory.push({ role: "user", parts: [{ text: question }] });


    try {
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-pro"
        });

        const generationConfig = {
            temperature: 0.9,
            topP: 0.95,
            maxOutputTokens: 512,
            responseMimeType: "text/plain"
        };

        if (!chatSession) {
            chatSession = await model.startChat({
                generationConfig,
                history: chatHistory
            });
        }

        const result = await chatSession.sendMessage("How do I say " + question + " in Arabic? Make your answer concise.")
        const reply = result.response.text();

        chatHistory.push({ role: "model", parts: [{ text: reply }] }); // Save the AI's response to history

        console.log("Like this: ", reply);
        res.json({ message: reply });
    } catch (error) {
        console.error('Failed to process input with Gemini:', error.message);
        res.status(500).send({ error: 'Error processing input with Gemini', details: error.message });
    }
});

app.post('/generate-words', async (req, res) => {
    const { topic, prev, num, subtopic } = req.body;
    console.log("Generating " + num + " New Flashcards for: " + topic + " " + subtopic)
    console.log("Previous words are: "+ prev)

    chatHistory.push({ role: "user", parts: [{ text: topic }] });


    try {
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-pro"
        });

        const generationConfig = {
            temperature: 0.9,
            topP: 0.95,
            maxOutputTokens: 512,
            responseMimeType: "text/plain"
        };

        if (!chatSession) {
            chatSession = await model.startChat({
                generationConfig,
                history: chatHistory
            });
        }


        const result = await chatSession.sendMessage("A: صَبَاحُ الْخَيْرِ' E: Good Morning Use this exact format to make me " + num + " flashcards about " + topic + " " + subtopic + " that have both Arabic with harakaat and English. Use this same format, you need to include the A: and E: characters without any parentheses or brackets surrounding them for my code to parse properly. Dont use any boldfaces. Dont use any previous words you have already used: " + prev)

        const reply = result.response.text();

        chatHistory.push({ role: "model", parts: [{ text: reply }] }); // Save the AI's response to history

        console.log("New Flashcards: ", reply);
        res.json({ message: reply });
    } catch (error) {
        console.error('Failed to process input with Gemini:', error.message);
        res.status(500).send({ error: 'Error processing input with Gemini', details: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
