# 🎵 Spotify Now Playing 🎵

## 📜 Proje Açıklaması (Project Description)
Bu proje, kullanıcıların şu anda Spotify'da dinledikleri şarkıyı canlı olarak bir web sitesinde görüntülemelerini sağlar. Proje, Express.js sunucusu ile Spotify API'ını kullanarak şarkı bilgilerini alır ve frontend tarafında gösterir.

This project allows users to view the currently playing song on Spotify live on a website. The project uses an Express.js server to fetch song details via the Spotify API and displays them on the frontend.

## ✨ Özellikler (Features)
- Spotify'da çalan şarkının bilgilerini anlık olarak gösterir.
- Şarkının adı, sanatçısı ve albüm kapağı görüntülenir.
- İlerleme çubuğu ile şarkının ne kadar süre çaldığını gösterir.
- Şarkı bilgileri her 5 saniyede bir güncellenir.

- Shows real-time information of the currently playing song on Spotify.
- Displays the song's name, artist, and album cover.
- Progress bar indicates how long the song has been playing.
- Song information updates every 5 seconds.

## 🛠️ Kurulum (Setup)
1. Bu projeyi yerel makinenize klonlayın:
   Clone this project to your local machine:
    ```sh
    git clone https://github.com/devshadow1/portfolio-spotify-now-playing.git
    cd spotify-now-playing
    ```

2. Gerekli bağımlılıkları yükleyin:
   Install necessary dependencies:
    ```sh
    npm install
    ```

3. Çevresel değişkenleri ayarlayın:
   Set up environment variables:
    `.env` dosyası oluşturun ve aşağıdaki değişkenleri ekleyin:
    Create a `.env` file and add the following variables:
    ```env
    CLIENT_ID=your_spotify_client_id
    CLIENT_SECRET=your_spotify_client_secret
    REFRESH_TOKEN=your_spotify_refresh_token
    ```

4. Sunucuyu başlatın:
   Start the server:
    ```sh
    npm start
    ```

## 🚀 Kullanım (Usage)
- Tarayıcınızda `http://localhost:8888` adresine gidin.
- Go to `http://localhost:8888` in your browser.

- Anlık olarak çalan şarkı bilgilerini görün ve Spotify bağlantılarıyla şarkıya erişin.
- See real-time song information and access the song on Spotify through provided links.

## 🌟 Katkıda Bulunma (Contributing)
Katkıda bulunmak isterseniz, lütfen bir `pull request` gönderin veya bir `issue` açın.
If you'd like to contribute, please submit a `pull request` or open an `issue`.

## 🌐 Canlı Demo (Live Demo)
https://www.c3n4p.site/

## 📄 Lisans (License)
Bu proje MIT Lisansı ile lisanslanmıştır.
This project is licensed under the MIT License.
