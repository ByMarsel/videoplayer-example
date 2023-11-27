# Welcome to Our Custom Video Player Example! [![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?text=React%20Custom%20Video%20Player%20Example&url=https://github.com/ByMarsel/videoplayer-example)

This repository serves as a comprehensive guide and example for building a custom video player. Here, we demonstrate how to create an intuitive, feature-rich video player using modern web technologies. The implementation showcases key functionalities such as play/pause, volume control, seeking, fullscreen toggle, and responsive design for various devices.

This example is perfect for developers looking to understand the ins and outs of video player functionality or for those seeking to implement a custom player into their own projects. Dive into our code to get started on enhancing your video content delivery! 


## Getting Started

Install deps
```
npm i
```

Run project

```
npm run start 
```

## Features
- Play/Pause **[implemented]**: Seamless start and stop functionalities with smooth transitions.
- Volume Control **[implemented]**: Easily adjustable volume slider to enhance the viewing experience.
- Seeking **[implemented]**: Fast-forward and rewind with a simple, user-friendly progress bar.
- Seeking. Frame Preview **[implemented]**: Seeking a video frame preview involves navigating through a video to locate a specific frame or moment.
- Fullscreen Mode **[implemented includes mobile iOS pseudo fullscreen]**: Immerse in full-screen viewing with a single click.
- Responsive Design **[implemented]**: Enjoy the video player on any device, be it desktop, tablet, or mobile.


## FAQ

### How to play video in fullscreen mode on iOS device?
1. First, add the [playisinline](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video#playsinline) attribute set to true in the video tag. This stops iOS from switching to full-screen right after user press play.
2. See [here](https://github.com/ByMarsel/videoplayer-example/blob/b755f5cc71e1641860d3d8bf84f639bc0b96fdf4/src/components/player/Player.tsx#L97) example how to request request fullscreen in iOS 
3. To ensure stable functioning of the full-screen mode on iOS, it's advisable to require the user to initiate the video playback with a first click. This can be achieved by displaying the video's poster and concealing all elements except the play button.


## Demo
See playground [here](https://bymarsel.github.io/videoplayer-example/)


## Built With
- [ReactJS](https://react.dev/) - The library for web and native user interfaces
- [TypeScript](https://typescriptlang.org) - TypeScript is a strongly typed programming language that builds on JavaScript
- [Styled Components](https://styled-components.com) - CSSinJS styling library
- [Screenfull](https://github.com/sindresorhus/screenfull) - Wrapper for cross-browser usage of the JavaScript [Fullscreen API](https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API)
- [Create React App](https://create-react-app.dev/) - ReactJS configured project template


## License
This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/ByMarsel/videoplayer-example/blob/main/LICENSE) file for details


