# AI.rabic Backend Server

**Assalamualaikum** :wave:, welcome to the backend server for our AI.rabic project.

## :star2: About the Project

AI.rabic is designed to help users improve their Arabic language skills by engaging in real-time conversations with an AI. This repository contains the backend server, which powers the conversation engine, translation, and other functionalities behind the scenes.

## :gear: Setup Instructions

Follow these steps to get the server up and running on your local machine:

1. make sure node.js is installed at https://nodejs.org/en/download/package-manager
2. replace the key.json with this:
```
{
  "type": "service_account",
  "project_id": "airabic",
  "private_key_id": "f91ef8e1e6742eba03c8976b7217138cf80b8aec",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDib7csa3IZCvbP\n8FOc+DS+47n0VQbNorDq21VlBS9wOrMMX6HuMRi7H9kIFHrR50U1qwjzncicTxyG\nkQyZXWAc/Uf90nCqjNTKVoidkQAN8O2SpiboKynWvHSiaW4jLR3Z7d0jMe4HeiaO\nwcM48gFHdZRmWxJLAFAZ8gnar8gNCH5/myciPNpRrXkvA1GjZ+fHZbK52yhbgETG\nUFcXOxB9DvIjCVJMnZQu7T+9D/1Xge6U/25wOcWTCrkhiQESRckt2tQM+2PncEVw\nyvENPSuxCSpOFGAOFvlwQfAt+U8Mzd6kHttVZUtdN052M3JLi0ornekfkasHzD5o\njmXCFngpAgMBAAECggEALmca6Ecvh1rEF/pFxDvoITtNOvkmrwLZUxO2FQDiRxM8\naHt7lXKpwQUmhn2d6sCEYhpl9/icaQ3cSGZWqOImBWLROz6CGK1KGRnxHqsdkf3O\nzbfvbrITvZ36n+LPr3U6MhQI9oKvpwgc+THTdiq/4NtDWVNt9QFAKQT9CHvv2N2D\nMYO2lKxwb3c4R16hQJGAz5MEjJMPeUuzFiGSAaE/tPOa8pFgPWRqydC2J6dXVHih\n99+SWg+j++vjfReowSz0DV7af3M/GVcbnFKqmrq8n31MQta7Ei2DkDtIfoKdG2aX\nTPwsZJYVugt5K1J2KicAJYQEWAvhCxoPDD+mNP/cNQKBgQD9dYc78MUUlzLYuh84\nTftFJMRiwU3X166F1Iq8Y8U/+DHpL0T2ZYQ4UNNU3PxEAFZp0HqV+2vHQJ9RKXUV\n83Q/BqbfAZIuGCSKxIqeXqL/ZA8y0Qxd7qcq7DuUOQFOQ0GW1wol+nUHO6G8eZYb\nMIn9rFPH8PhhdQKmT+B4rh6nZQKBgQDktNY4QsVAFLaDYGzvGqJM4sjhsGvhO29X\n6TcPZ9pWkweXcVjieyCUZ3eyEyNSQoDaZXVvUMiPYN2koemYbOoALOnlfoJFMgjx\njo2SJPP5bk/ICEZ6qNvPHInUy87rLRVEOIpQqu9iIt350YExBzADQhDbfzcE56bg\nKDhib74rdQKBgFYC7EGLE1ZJeRfTEYUp8XslXv+kWaZFqxP/bJVBxk5PC6D2SZDU\nImp6Az1pQLJS6wA9n1wGVizn4SjJyNIKLAi3WSmUfublioEM8X2M4AOLER1Nk8TM\nmC4YvJ8wOSE18awejXMV62Do+5naKPZRIoLTWBshyyhHbP7DXImXjQ+BAoGAN4LZ\nGBDE1bfxUNP/vM1nJWhKP9VVafbGIL1feuLHMQpA5nZBj784+ixe9h8FDLtNkTTd\nGyatd3eYdJREIZYV+fLs1qItNmRdnVvvatCDU0B+JtwzVyRTLeMMZVUOpTBtIADl\nOY0zy0sRO8ipJeBLvA62DsDC9vLPI0s/3EypCN0CgYEAuMW4nK8ECmswqRTkDFjx\nXtViIhc6a27YoX21Pp7dv8pmUShmDCAmkPzbEBiWEJ2YuNw6egnwcQT0YilHZKrh\nB8/6OC/Se1UOn4JucGDxEtKeZBXaDaQR9jEMyrZnkgMFeSnKhM1NxUJOKEEgG3tb\nEU6iJJUkUg5/XqTqibkWmFc=\n-----END PRIVATE KEY-----\n",
  "client_email": "airabic@airabic.iam.gserviceaccount.com",
  "client_id": "114187048760201763785",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/airabic%40airabic.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}
```
3. open the main folder in your command prompt
4. run ```node server.js ```
5. The server should be running locally now, to test if the server is running open the front-end code locally and confirm whether API calls can be made.

Jazakumullah
