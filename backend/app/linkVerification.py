from pathlib import Path
import yt_dlp
import whisper
from yt_dlp.utils import DownloadError
import ssl

# Insecure SSL workaround. Only use if you cannot fix certificates.
ssl._create_default_https_context = ssl._create_unverified_context

# Load the Whisper model once at import time to avoid reloading for each call.
# Choose a smaller model like "base" if performance is an issue.
model = whisper.load_model("small")

"""
Simple TikTok audio to transcript pipeline.

Steps:
1. Download audio from a TikTok URL using yt_dlp.
2. Save the audio file in data/audio/.
3. Transcribe the audio with a Whisper model.
4. Save the transcript as a text file in data/transcripts/.
5. Return metadata and file paths.

Note: This script disables SSL verification to bypass certificate issues.
Remove the ssl override in production and fix certificates instead.
"""
def tikTokConversion(link: str) -> dict:

    # Create directories if they do not exist.
    audio_dir = Path("data/audio")
    transcript_dir = Path("data/transcripts")
    audio_dir.mkdir(parents=True, exist_ok=True)
    transcript_dir.mkdir(parents=True, exist_ok=True)

    # yt_dlp options:
    # format selects the best available audio
    # outtmpl controls the output filename pattern (video id)
    # postprocessors tells yt_dlp to extract or convert audio to m4a
    ydl_opts = {
        "format": "bestaudio/best",
        "outtmpl": str(audio_dir / "%(id)s.%(ext)s"),
        "postprocessors": [
            {"key": "FFmpegExtractAudio", "preferredcodec": "m4a"}
        ],
        "quiet": True,
    }

    try:
        # Download and extract metadata.
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(link, download=True)
        audio_path = audio_dir / f"{info['id']}.m4a"

        if not audio_path.exists():
            return {"error": f"Audio file not created: {audio_path}"}

        # Transcribe the downloaded audio file.
        result = model.transcribe(str(audio_path))
        text = result.get("text", "").strip()
        if not text:
            return {"error": "Transcription returned empty text"}

        # Save transcript to file.
        transcript_path = transcript_dir / f"{info['id']}.txt"
        transcript_path.write_text(text, encoding="utf-8")

        return {
            "audio_file": str(audio_path),
            "transcript_file": str(transcript_path),
            "transcript_text": text,
            "video_title": info.get("title"),
        }

    except DownloadError as e:
        return {"error": f"Download failed: {e}"}
    except Exception as e:
        # Fallback for any other unexpected error
        return {"error": f"Unexpected error: {e}"}
    
test = tikTokConversion('https://www.tiktok.com/@foxnews/video/7530825267712134430?q=fox%20news&t=1753413009431')
print(test)
        