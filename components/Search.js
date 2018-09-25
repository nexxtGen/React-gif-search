Search = React.createClass({

    getInitialState() {
        return {
            searchingText: ''
        };
    },

    handleChange: function(event) {
        var searchingText = event.target.value; // Dostaję sie do wartosci zdarzenia (klucza value)np wpisaniu tekstu na klawiaturze 
        this.setState({ searchingText: searchingText }); //aktualizuję stan mojego komponentu za pomocą setState
        
        if (searchingText.length > 2) {
            this.props.onSearch(searchingText); //przesyłamy wpisany przez nas tekst
        }
    },

    handleKeyUp: function(event) { // Metoda kt rozpoznaje, że wcisnelismy kl enter i wysyła wiadomość do rodzica, by jeszcze raz uruchomił funkcję wysyłającą zapytanie po gifa.
        if (event.keyCode === 13) { // 13 to kod klawisza enter
            this.props.onSearch(this.state.searchingText);
        }
    },

    render: function() {
        var styles = {fontSize: '1.5em', width: '90%', maxWidth: '350px'};

    return <input
             type="text"
             onChange={this.handleChange}
             onKeyUp={this.handleKeyUp}
             placeholder="Tutaj wpisz wyszukiwaną frazę"
             style={styles}
             value={this.state.searchTerm}
            />
    }
});