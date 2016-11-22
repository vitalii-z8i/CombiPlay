'use strict';

App.services.request = function(url){
    /** @var string Url of a website, to request */
    var baseUrl = url;
    /** @var object HTTP request service */
    var xmlHttp = new XMLHttpRequest();

    /**
     * Build valid uri string with all the request parameters
     * @param uri string uri of our page
     * @param params object with request parameters
     * @return string requestUri
     */
    var buildRequestUrl = function(uri, params) {
      var paramString = [];
      for(var key in params)
          if (params.hasOwnProperty(key)) {
              paramString.push(encodeURIComponent(key) + "=" + encodeURIComponent(params[key]));
          }
      return baseUrl + uri + '?' + paramString.join('&');
    }

    /**
     * Makes GET request to the specified page
     * @param uri string specified page URI
     * @param params object with request parameters
     * @param handleResponse - function to call once the request is done
     * @return callback function or undefined
     */
    var get = function(uri, params = {}, handleResponse) {
      xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            handleResponse(xmlHttp);
      };
      xmlHttp.open("GET", buildRequestUrl(uri, params), true);

      xmlHttp.send(null);
    }

    /** Public methods for a specific wesite */
    return {
      get: get
    }
}