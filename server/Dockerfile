# 1. Node.js'in resmi sürümünü temel al
FROM node:18-alpine

# 2. Konteynerin içinde /app diye bir klasör oluştur ve oraya geç
WORKDIR /app

# 3. Paket listesini kopyala ve yükle
COPY package*.json ./
RUN npm install

# 4. Kalan tüm kodları içeri kopyala
COPY . .

# 5. Sunucu portunu dış dünyaya aç
EXPOSE 3001

# 6. Sunucuyu başlat
CMD ["node", "server.js"]