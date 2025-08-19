require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const overlayRoutes = require('./routes/overlays');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/overlays', overlayRoutes);

// Serve HLS stream segments
const HLS_OUTPUT_DIR = process.env.HLS_OUTPUT_DIR || 'streams';
app.use('/streams', express.static(path.join(__dirname, HLS_OUTPUT_DIR)));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Start FFmpeg to pull RTSP and output HLS
function startStream() {
  if (!fs.existsSync(HLS_OUTPUT_DIR)) fs.mkdirSync(HLS_OUTPUT_DIR);
  const ffmpegArgs = [
    '-i', process.env.RTSP_STREAM_URL, // Input RTSP URL
    '-c:v', 'libx264', '-preset', 'veryfast',
    '-f', 'hls',
    '-hls_time', '2',
    '-hls_list_size', '3',
    '-hls_flags', 'delete_segments',
    `${HLS_OUTPUT_DIR}/index.m3u8`
  ];
  console.log('Starting FFmpeg:', ffmpegArgs.join(' '));
  spawn('ffmpeg', ffmpegArgs, { stdio: 'inherit' });
}
startStream();

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Backend running on port ${port}`));
