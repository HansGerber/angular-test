var BKCleanApi = {
        baseURL: 'api/',
        makePath: function(endpoint, action){
            return (BKCleanApi.baseURL.match(/\/$/) ? BKCleanApi.baseURL : BKCleanApi.baseURL + "/") +
                    endpoint +
                    (typeof action !== "undefined" ? "?action=" + action : "");
        }
};
