const Instagram = require('instagram-web-api');
const { username, password } = process.env
const client = new Instagram({ username, password })

let instagramFeeds = [];
for(let i = 0; i < 4; i++){
    instagramFeeds[i] = {
        imgUrl: 'https://lh3.googleusercontent.com/MgJS2D26eWVE9wOQ14vYQhVvot7NsgTsL9Fm-C8NwGC8Tn277Py-piniyyI5JkfyWLY4=s143',
        originUrl: '/'
    };
}

async function getInstagram() {
    try {
        let topHashTag = await client.getPhotosByHashtag({ hashtag: 'eatmod'});
        if (Object.keys(new Object(topHashTag)).length != 0) {
            topHashTag = topHashTag.hashtag.edge_hashtag_to_media.edges;
            topHashTag.forEach((post, i) => {
                instagramFeeds[i] = { 
                    imgUrl: post.node.thumbnail_src,
                    originUrl: `https://www.instagram.com/p/${post.node.shortcode}/`,
                    timestamp: post.node.taken_at_timestamp
                }
            })
            instagramFeeds = instagramFeeds.filter((feed) => {
                return ((Date.now() / 1000 - feed.timestamp) / 3600 / 24 / 30 ) <= 2;
            });
            instagramFeeds = instagramFeeds.slice(0,12);
        } else {
            throw 1;
        }
    } catch {
        try {
            let topHashTag = await client.getMediaFeedByHashtag({ hashtag: 'eatmod'});
            if (Object.keys(new Object(topHashTag)).length != 0) {
                topHashTag = topHashTag.edge_hashtag_to_media.edges;
                topHashTag.forEach((post, i) => {
                    instagramFeeds[i] = { 
                        imgUrl: post.node.thumbnail_src,
                        originUrl: `https://www.instagram.com/p/${post.node.shortcode}/`,
                        timestamp: post.node.taken_at_timestamp
                    }
                })
                instagramFeeds = instagramFeeds.filter((feed) => {
                   return ((Date.now() / 1000 - feed.timestamp) / 3600 / 24 / 30 ) <= 2;
                });
                instagramFeeds = instagramFeeds.slice(0,12);
            } else {
                throw 1;
            }
        } catch {
            return 0;
        }
    }
}



exports.initialize = async () => {
    await getInstagram();
    setInterval(getInstagram, 1200000);
}

exports.getFeed = () => {
    return instagramFeeds;
}