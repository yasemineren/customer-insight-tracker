// server.js - Dinamik API Key ve Veri İşleme
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
app.use(cors());
app.use(express.json());

// NOT: Artık burada sabit bir API Key YOK. Kullanıcıdan gelecek.

// 1. Endpoint: Rastgele Sinyal Üret (Demo için hala dursun)
app.get('/signal', (req, res) => {
    const data = [];
    const points = 30;
    for (let i = 0; i < points; i++) {
        const signal = Math.sin(i * 0.5) * 15;
        const noise = (Math.random() - 0.5) * 10;
        data.push({ time: i, value: parseFloat((signal + noise).toFixed(2)) });
    }
    res.json(data);
});

// 2. Endpoint: Dinamik Analiz (Key + Data Frontend'den gelir)
app.post('/analyze-signal', async (req, res) => {
    try {
        const { data, apiKey } = req.body; // API Key'i buradan alıyoruz

        if (!apiKey) {
            return res.status(400).json({ error: "Lütfen API Anahtarınızı girin!" });
        }

        // Kullanıcının anahtarıyla AI'ı başlat
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

        const dataStr = JSON.stringify(data.slice(0, 50).map(d => d.value)); // İlk 50 veriyi al (Token tasarrufu)
        
        const prompt = `
        Sen bir fizikçisin. Şu veri setini analiz et: ${dataStr}
        1. Anomali var mı?
        2. Sinyal tipi nedir?
        Cevabı SADECE şu JSON formatında ver:
        {
            "status": "Normal" veya "Anomali",
            "physics_explanation": "kısa açıklama",
            "confidence": "%90"
        }
        `;

        const result = await model.generateContent(prompt);
        const text = result.response.text().replace(/```json|```/g, "").trim();
        res.json(JSON.parse(text));

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "API Anahtarı geçersiz veya kota dolu." });
    }
});

app.listen(3001, () => console.log('🚀 Sunucu Dinamik Modda Hazır (Port 3001)'));