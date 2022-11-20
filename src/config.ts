export const baseUrl = "https://api.flickr.com/services/rest/";

// api key should not be on the fe side,
// idealy we wold have some be/middleware service
// that way, our api key would stay unexposed
export const apiKey = "2870d1b8d52c470470bfd96384909f9e";

// this should be acquired from a flickr login
export const userId = "197041583@N08";

export const flickrMethods = {
  getRecent: "flickr.photos.getRecent",
};
