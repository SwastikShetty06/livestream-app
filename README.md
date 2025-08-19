
# Livestream Overlay Studio

An interactive web app to add, edit, and position overlays (text and logos) on a live video stream. Built with React, Node.js, and MUI.

---

## Features

- Live HLS video playback
- Add text or logo overlays
- Drag overlays to reposition
- Edit and delete overlays
- Modern, responsive UI

---

## Setup Instructions

### Prerequisites
- Node.js & npm
- (Optional) FFmpeg for RTSP to HLS conversion

### 1. Clone the repository
```sh
git clone https://github.com/SwastikShetty06/livestream-app.git
cd livestream-app
```

### 2. Install dependencies
```sh
cd server
npm install
cd ../client
npm install
```

### 3. Start the backend server
```sh
cd ../server
node index.js
```

### 4. Start the frontend client
```sh
cd ../client
npm start
```

---

## RTSP Stream Setup

The app expects an HLS stream (e.g., `.m3u8`).

To use an RTSP stream, set up FFmpeg to convert RTSP to HLS and update the stream source in `server/index.js` or `.env`.

Example FFmpeg command:
```sh
ffmpeg -i rtsp://your_rtsp_url -c:v copy -f hls ./server/streams/index.m3u8
```

---

## API Documentation

Base URL: `http://localhost:4000`

### Overlays

#### Get All Overlays
- **GET** `/overlays`
- **Response:** Array of overlay objects

#### Create Overlay
- **POST** `/overlays`
- **Body:**
	```json
	{
		"type": "text" | "logo",
		"content": "Text or image URL",
		"x": Number,
		"y": Number,
		"width": Number,
		"height": Number,
		"color": "#hex",      // Only for text
		"fontSize": Number     // Only for text
	}
	```
- **Response:** Created overlay object

#### Update Overlay
- **PUT** `/overlays/:id`
- **Body:** Same as POST
- **Response:** Updated overlay object

#### Delete Overlay
- **DELETE** `/overlays/:id`
- **Response:** `{ success: true }`

---

## Usage

1. Open the app in your browser (`http://localhost:3000` by default).
2. The video player will show your HLS stream.
3. Use the form to add overlays (text or logo).
4. Drag overlays to reposition them over the video.
5. Click overlays or use the list to edit or delete.

---

## Folder Structure

- `client/` — React frontend
- `server/` — Node.js backend & API
- `server/models/` — Mongoose models
- `server/routes/` — Express routes
- `server/streams/` — HLS stream files

---

## License

MIT
