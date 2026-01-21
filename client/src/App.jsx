// App.jsx - Pro Sürüm
import { useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function App() {
  const [data, setData] = useState([]);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState(""); // Kullanıcı anahtarı burada tutulacak

  // Backend URL'ini otomatik bul
  const getBaseUrl = () => {
    // Codespaces ortamı için dinamik URL, lokal için localhost
    if (window.location.hostname.includes("github.dev") || window.location.hostname.includes("app.github.dev")) {
        return 'https://' + window.location.hostname.replace('-5173', '-3001').replace('-5174', '-3001');
    }
    return 'http://localhost:3001';
  };

  // 1. DEMO Sinyal Çek
  const fetchDemoSignal = async () => {
    try {
      const res = await axios.get(`${getBaseUrl()}/signal`);
      setData(res.data);
      setAnalysis(null);
    } catch (err) {
      alert("Sunucu hatası!");
    }
  };

  // 2. DOSYA Yükle (JSON İşleme)
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const jsonData = JSON.parse(event.target.result);
        // Eğer dosya formatı uygunsa (time ve value varsa) kabul et
        if (Array.isArray(jsonData)) {
            setData(jsonData);
            setAnalysis(null);
        } else {
            alert("JSON formatı hatalı! [{time: 0, value: 10}...] şeklinde olmalı.");
        }
      } catch (err) {
        alert("Dosya okunamadı. Geçerli bir JSON yükleyin.");
      }
    };
    reader.readAsText(file);
  };

  // 3. ANALİZ ET (Anahtarı göndererek)
  const analyzeSignal = async () => {
    if (!apiKey) {
      alert("Lütfen önce API Anahtarınızı girin!");
      return;
    }
    if (data.length === 0) return;

    setLoading(true);
    try {
      const res = await axios.post(`${getBaseUrl()}/analyze-signal`, { 
        data: data,
        apiKey: apiKey // Anahtarı backend'e postala
      });
      setAnalysis(res.data);
    } catch (err) {
      alert("Analiz başarısız! API Anahtarı hatalı olabilir.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "40px", fontFamily: "monospace", backgroundColor: "#121212", color: "#00ff41", minHeight: "100vh" }}>
      <h1>⚛️ Kuantum Sinyal Analizörü <span style={{fontSize:"12px", border:"1px solid lime", padding:"2px"}}>PRO</span></h1>
      
      {/* ÜST PANEL: API Key ve Dosya Yükleme */}
      <div style={{ marginBottom: "30px", padding: "20px", border: "1px dashed #444", borderRadius: "10px" }}>
        
        <div style={{ marginBottom: "15px" }}>
            <label>🔑 Gemini API Key: </label>
            <input 
                type="password" 
                placeholder="AIzaSy..." 
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                style={{ background: "#333", border: "none", color: "white", padding: "8px", width: "250px", marginLeft: "10px" }}
            />
        </div>

        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <button onClick={fetchDemoSignal} style={btnStyle}>🎲 Rastgele Sinyal</button>
            <span>veya</span>
            <input type="file" accept=".json" onChange={handleFileUpload} style={{ color: "#aaa" }} />
        </div>
      </div>

      {/* GRAFİK */}
      {data.length > 0 && (
        <div style={{ width: '100%', height: 300, background: "#1e1e1e", padding: "20px", borderRadius: "10px", marginBottom:"20px" }}>
          <ResponsiveContainer>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="time" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #0f0' }} />
              <Line type="monotone" dataKey="value" stroke="#00ff41" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* ANALİZ BUTONU */}
      <button onClick={analyzeSignal} disabled={loading || data.length === 0} style={{...btnStyle, width: "100%", padding: "15px"}}>
          {loading ? "⏳ AI Analiz Ediyor..." : "🤖 Sinyali Yorumla (Kendi API'nle)"}
      </button>

      {/* SONUÇ RAPORU */}
      {analysis && (
        <div style={{ marginTop: "30px", border: "1px solid #00ff41", padding: "20px", borderRadius: "10px", backgroundColor: "#002200" }}>
          <h3>📋 Analiz Raporu:</h3>
          <p><strong>Durum:</strong> {analysis.status}</p>
          <p><strong>Açıklama:</strong> {analysis.physics_explanation}</p>
          <p><strong>Güven:</strong> {analysis.confidence}</p>
        </div>
      )}
    </div>
  );
}

const btnStyle = {
  padding: "10px 20px", cursor: "pointer", backgroundColor: "#004d00", color: "#00ff41", border: "1px solid #00ff41", borderRadius: "5px", fontWeight: "bold"
};

export default App;