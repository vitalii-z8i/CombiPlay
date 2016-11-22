'use_strict';
/**
 * YouTube API service
 */
App.services.api.youTube = (function(){

    // Private block
    /** checks if we're authorized on YouTube */
    var authorized = false;
    /** checks if the content loaded */
    var loaded = false;
    /** oAuth token for YouTube */
    var accessToken = null;

    /** @var Request object YouTube API endpoint URL */
    var request = App.services.request('https://www.googleapis.com/youtube/v3');
    /**
     * Authorize on YouTube.
     * @return function if success or void
     */
    function authorize(handleResponse) {
        chrome.identity.getAuthToken({
            'interactive': true
        }, function(token) {
            accessToken = token;
            authorized = true;
            handleResponse(token)
        });
    }

    /**
     * Ensure, that user is authorized. Needs to be called before every action
     * @param function handleResponse  // Make specified action with access token
     * @return function handleResponse execution
     */
    function ensureAuthorized(handleResponse) {
        if(!authorized) {
            authorize(handleResponse);
        } else {
            handleResponse(accessToken);
        }
    }

    function getPlaylists() {
        ensureAuthorized(function(token){
            request.get('/playlists', {access_token: token,
                                       key: App.manifest.youtube_app_key,
                                       mine: true,
                                       maxResults: 50,
                                       part: 'snippet'},
            function(event){
                rawResult = JSON.parse(event.responseText);
                console.log(rawResult);
            });
        })
    }

    // Public block
    return {
        loadPlaylists: getPlaylists
    }
});