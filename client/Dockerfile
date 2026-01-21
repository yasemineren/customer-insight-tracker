# 1. Node.js temelini al
FROM node:18-alpine

# 2. Çalışma klasörü oluştur
WORKDIR /app

# 3. Paketleri yükle
COPY package*.json ./
RUN npm install

# 4. Kodları kopyala
COPY . .

# 5. Vite portunu aç
EXPOSE 5174

# 6. Uygulamayı başlat (Dışarıdan erişim için --host ekledik)
CMD ["npm", "run", "dev", "--", "--host"]