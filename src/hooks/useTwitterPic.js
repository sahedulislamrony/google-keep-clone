import { Buffer } from "buffer";
import crypto from "crypto-browserify";
import OAuth from "oauth-1.0a";
window.Buffer = Buffer;


const generateSignature = (url, method, accessToken, accessTokenSecret, consumerKey, consumerSecret) => {
    const oauth = OAuth({
        consumer: { key: consumerKey, secret: consumerSecret },
        signature_method: "HMAC-SHA1",
        hash_function(baseString, key) {
            return crypto.createHmac("sha1", key).update(baseString).digest("base64");
        },
    });

    const request_data = {
        url,
        method,
    };

    const token = {
        key: accessToken,
        secret: accessTokenSecret,
    };

    return oauth.toHeader(oauth.authorize(request_data, token));
};

export default async function useTwitterPic(user, credential) {
    const accessToken = credential.accessToken;
    const accessTokenSecret = credential.secret;

    const apiKey = import.meta.env.VITE_TWITTER_API_KEY;
    const apiSecret = import.meta.env.VITE_TWITTER_API_SECRET_KEY;

    const url = `https://api.twitter.com/1.1/users/show.json?user_id=${user.providerData[0].uid}`;

    console.log("Twitter URL:", url);
    
    const headers = generateSignature(url, "GET", accessToken, accessTokenSecret, apiKey, apiSecret);
    console.log("Twitter headers:", headers);

    try {
        const twitterResponse = await fetch(url, {
            method: "GET",
            headers: {
                ...headers,
                "Content-Type": "application/json",
            },
        });

        if (!twitterResponse.ok) {
            throw new Error("Error fetching Twitter data");
        }

        const twitterData = await twitterResponse.json();
        const highResPhotoURL = twitterData.profile_image_url_https.replace("_normal", "");

        console.log("High-resolution photo URL:", highResPhotoURL);
        
        return highResPhotoURL;

    } catch (error) {
        console.error("Error fetching Twitter profile picture:", error);
        return null; 
    }
};



// incmoplete
// will work on this later