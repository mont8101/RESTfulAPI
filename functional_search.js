var app;

app = new Vue({
    el: "#app",
    data: {
        crime_search: "",
        crime_type: "artist",
        criime_type_options: [
            { value: "album", text: "Violent Crimes" },
            { value: "artist", text: "Property Crimes" },
            { value: "playlist", text: "Other Crimes" },
        ],
        search_results: []
    },
    computed: {
        input_placeholder: function() {
            if (this.spotify_type[0] === "a")
                return "Search for an " + this.spotify_type;
            return "Search for a " + this.spotify_type;
        }
    }
});