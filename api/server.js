require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const qs = require('qs');

const app = express();
const PORT = process.env.PORT || 8888;

// Çevresel değişkenler
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const refresh_token = process.env.REFRESH_TOKEN;
let access_token = '';

// CORS ayarları
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true,
}));

// Erişim token'ını yenileme işlemi
const refreshAccessToken = async () => {
    const token = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
    try {
        const response = await axios.post('https://accounts.spotify.com/api/token', qs.stringify({
            grant_type: 'refresh_token',
            refresh_token: refresh_token,
        }), {
            headers: {
                'Authorization': `Basic ${token}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        access_token = response.data.access_token;
        console.log('Access token başarıyla alındı');
        return access_token;
    } catch (error) {
        console.error('Access token alma hatası:', error.response ? error.response.data : error.message);
        throw new Error('Access token alınamadı');
    }
};

app.get('/api/login', async (req, res) => {
    try {
        await refreshAccessToken();
        res.json({ message: 'Token alındı', access_token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/now-playing', async (req, res) => {
    try {
        if (!access_token) {
            await refreshAccessToken();
        }

        const response = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });

        if (response.data && response.data.item) {
            res.json({
                name: response.data.item.name,
                artist: response.data.item.artists[0].name,
                album: response.data.item.album.name,
                albumArt: response.data.item.album.images[0].url,
                progress: response.data.progress_ms,
                spotifyUrl: response.data.item.external_urls.spotify,
            });
        } else {
            res.json({ message: 'Şu anda çalan bir şarkı yok' });
        }
    } catch (error) {
        console.error('Spotify API isteğinde hata oluştu:', error.response ? error.response.data : error.message);

        if (error.response && error.response.status === 401) {
            try {
                await refreshAccessToken();
                const response = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    },
                });

                if (response.data && response.data.item) {
                    res.json({
                        name: response.data.item.name,
                        artist: response.data.item.artists[0].name,
                        album: response.data.item.album.name,
                        albumArt: response.data.item.album.images[0].url,
                        progress: response.data.progress_ms,
                        spotifyUrl: response.data.item.external_urls.spotify,
                    });
                } else {
                    res.json({ message: 'Şu anda çalan bir şarkı yok' });
                }
            } catch (error) {
                res.status(500).json({ error: 'Access token alınamadı' });
            }
        } else {
            let errorMessage = 'Bir hata oluştu';
            if (error.response) {
                switch (error.response.status) {
                    case 401:
                        errorMessage = 'Erişim izni hatası. Lütfen giriş yapın.';
                        break;
                    case 404:
                        errorMessage = 'Veri bulunamadı.';
                        break;
                    case 500:
                        errorMessage = 'Sunucu hatası. Lütfen daha sonra tekrar deneyin.';
                        break;
                    default:
                        errorMessage = 'Bilinmeyen bir hata oluştu.';
                }
            }
            res.status(500).json({ error: errorMessage });
        }
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
