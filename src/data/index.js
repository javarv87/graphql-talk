const videoA = {
    id: 1,
    title: 'Learning Angular',
    duration: 30,
    watched: false
};
const videoB = {
    id: 2,
    title: 'Learning GraphQL',
    duration: 60,
    watched: true
};
const videos = [videoA, videoB];

const getVideoById = (id) => new Promise((resolve) => {
    const [video] = videos.filter((video) => {
        return video.id.toString() === id;
    });
    resolve(video);
});

const getVideos = () => new Promise((resolve) => resolve(videos));

const createVideo = ({ title, duration, watched}) => {
    const newID = (videos[videos.length - 1].id + 1);
    const video = {
        // id: (new Buffer(title, 'utf8')).toString('base64'),
        id: newID,
        title,
        duration,
        watched
    };
    videos.push(video);
    return video;
}

exports.getVideoById = getVideoById;
exports.getVideos = getVideos;
exports.createVideo = createVideo;