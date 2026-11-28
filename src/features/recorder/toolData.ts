import { FaVideo } from "react-icons/fa";

export const recorderTools = {
  slug: "recorder",

  title: "Screen Recorder",

  description:
    "Free browser based screen recording utilities to capture your screen, application windows, browser tabs, and microphone audio. Record and process your videos locally on your device without uploading your recordings to external servers.",

  category: "Screen Recorder",

  icon: FaVideo,

  badges: [
    "Open Source",
    "Privacy First",
    "Client Side",
    "No Uploads",
    "No Tracking",
    "Free Forever",
  ],

  features: [
    {
      title: "Screen Recorder",
      description:
        "Record your entire screen, selected application windows, or browser tabs directly from your browser without installing desktop software.",
    },
    {
      title: "Screen & Audio Recorder",
      description:
        "Capture screen activity along with supported system audio and microphone input for tutorials, presentations, and demonstrations.",
    },
    {
      title: "Microphone Recorder",
      description:
        "Record voice narration using your microphone while capturing screen activity, with browser based audio input support.",
    },
    {
      title: "Browser Tab Recorder",
      description:
        "Capture a specific browser tab, including supported tab audio, without recording your entire desktop.",
    },
    {
      title: "Window Recorder",
      description:
        "Record a selected application window for software demonstrations, debugging sessions, and professional walkthroughs.",
    },
    {
      title: "Webcam Recorder",
      description:
        "Capture webcam video directly in your browser using available camera permissions and supported media APIs.",
    },
    {
      title: "Screen & Webcam Recorder",
      description:
        "Combine screen sharing and webcam footage to create presentation-style recordings and tutorial videos.",
    },
    {
      title: "Audio Recorder",
      description:
        "Record microphone or supported audio sources directly in your browser and save recordings locally.",
    },
    {
      title: "Recording Preview",
      description:
        "Preview recorded videos before saving them, allowing you to review the captured content and audio.",
    },
    {
      title: "Video Download & Export",
      description:
        "Download completed recordings directly to your device in supported video formats without uploading files to a server.",
    },
    {
      title: "Recording Quality Settings",
      description:
        "Configure supported recording resolutions, frame rates, and video bitrates to balance recording quality and file size.",
    },
    {
      title: "Pause & Resume Recording",
      description:
        "Pause an active recording and resume it whenever needed without creating separate video files.",
    },
    {
      title: "Recording Timer",
      description:
        "Monitor recording duration with a real-time timer to keep track of your screen capture sessions.",
    },
    {
      title: "Video Format Support",
      description:
        "Record and export videos using browser-supported MediaRecorder formats and codecs, such as WebM where available.",
    },
    {
      title: "Local Recording Management",
      description:
        "Manage, preview, and download your recordings directly from your device without requiring an account or cloud storage.",
    },
  ],

  faqs: [
    {
      question: "Is the FlagsDev screen recorder free?",
      answer:
        "Yes. The screen recorder is designed to be free to use without subscriptions, accounts, or mandatory payments.",
    },
    {
      question: "Do I need to install software to record my screen?",
      answer:
        "No. You can record your screen directly from a supported web browser without installing additional desktop applications.",
    },
    {
      question: "Does FlagsDev upload my screen recordings?",
      answer:
        "No. Screen capture and recording are designed to happen locally in your browser. Your recordings do not need to be uploaded to FlagsDev servers.",
    },
    {
      question: "Can I record my entire screen?",
      answer:
        "Yes. Supported browsers allow you to select your entire screen, an application window, or an individual browser tab through the native screen-sharing permission dialog.",
    },
    {
      question: "Can I record microphone and system audio?",
      answer:
        "You can record microphone audio and supported system or tab audio. Audio capture availability depends on your browser, operating system, and selected screen-sharing source.",
    },
    {
      question: "Can I record my webcam and screen together?",
      answer:
        "Yes, using supported camera and screen capture APIs, both sources can be combined into a single recording.",
    },
    {
      question: "Which video formats are supported?",
      answer:
        "Recording formats depend on browser MediaRecorder support. WebM is commonly supported, while other formats and codecs vary between browsers.",
    },
    {
      question: "Can I pause and resume a screen recording?",
      answer:
        "Yes. Where supported, you can pause an active recording and resume it without starting a completely new recording session.",
    },
    {
      question: "Does the screen recorder work on mobile devices?",
      answer:
        "Screen recording support depends on the mobile browser and operating system. Some mobile browsers do not expose the necessary screen capture APIs.",
    },
    {
      question: "Can I record without an internet connection?",
      answer:
        "Once the required FlagsDev application resources are available locally or cached, supported recording features can operate without an active internet connection.",
    },
    {
      question: "Can I record unlimited videos?",
      answer:
        "There is no server-side recording duration limit. However, recording duration and file size are limited by your device memory, available storage, browser capabilities, and system resources.",
    },
    {
      question: "Does FlagsDev store my recordings?",
      answer:
        "No. Recordings are processed locally and can be downloaded directly to your device. FlagsDev does not require cloud storage for recording functionality.",
    },
    {
      question: "Which technologies power the screen recorder?",
      answer:
        "The screen recorder uses browser-native APIs such as MediaDevices.getDisplayMedia(), getUserMedia(), MediaRecorder, and supported Web Audio APIs.",
    },
    {
      question: "Is the screen recorder open source?",
      answer:
        "Yes. FlagsDev is an open-source project, allowing users to inspect the implementation and contribute improvements.",
    },
  ],

  lastUpdated: "26 November 2026",

  openSource: true,
  underConstruction: true,

  contributors: [
    {
      name: "Muhammad Ahmad",
      role: "Founder & Maintainer",
      email: "muhammadahmadkon@gmail.com",
    },
  ],
};
