
//const axios = require('axios');

App = React.createClass({
    
    getInitialState() {
        return {
            loading: false,
            searchingText: '',
            gif: {},            
        };        
    },    
    
    handleSearch: function(searchingText) {  
        this.setState({
          loading: true  
        });
        const GIPHY_API_URL = 'https://api.giphy.com';
        const GIPHY_PUB_KEY = 'BuoPreQVJiLyBuCkEfhI26SyRpb3mwHo';
        const url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText;
        axios.get(url)

            .then((response) => {
                console.log("Log response:", response.data); 
                const gif = {  
                    url: response.data.data.fixed_width_downsampled_url,
                    sourceUrl: response.data.data.url 
                };
                this.setState({
                    loading: false,
                    gif: gif,
                    searchingText: searchingText
                })              
            })   

            .catch((error) => {
                this.setState({
                    loading: false,
                    gif: { url: './404.png', sourceUrl: './404.png' },
                    searchingText: searchingText
                });            
                console.log("Error log: ",error);
            })  
    },   
    
    render: function() {

        var styles = {
            margin: '0 auto',
            textAlign: 'center',
            width: '90%'
        };

        return (
            <div style={styles}>
                <h1>Wyszukiwarka GIFow!</h1>
                <p>Znajdź gif na <a href='http://giphy.com'>giphy</a>. Naciskaj enter, aby pobrać kolejne gify</p>
                <Search onSearch={this.handleSearch}/>
                    <Gif
                        loading={this.state.loading}
                        url={this.state.gif.url}
                        sourceUrl={this.state.gif.sourceUrl}
                    />
            </div>
        );
    }
});