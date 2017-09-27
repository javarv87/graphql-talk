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

exports.getVideoById = getVideoById;