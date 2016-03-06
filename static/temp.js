/*
   Veritan  - HackerEarth
   Author - Varenya
*/


var SearchBox = React.createClass({

  getInitialState: function(){
    return {text:""};
  },
  handleClick: function(){
    var text = this.state.text.trim();
    if(!text){
      return;
    }
    this.props.onTextChange({text:text});
  },
  handleEnter: function (e) {
    //e.preventDefault();
    //console.log(e);
    //console.log(e.keyCode);
    if(e.keyCode == 13){
      var text = this.state.text.trim();
      if(!text){
        return;
      }
      this.props.onTextChange({text:text});

    }
  },

  handleTextChange: function (e) {
    this.setState( { text : e.target.value } );
  },
  render : function(){
    return (
      <div className="row">
        <div className="input-group">
          <span className="input-group-btn">
            <input className="btn btn-primary" type="submit" value="Go!" onClick={this.handleClick} />
          </span>
          <input type="text" className="form-control" placeholder="Search for..." value={this.state.text}   onChange={this.handleTextChange} onKeyDown={this.handleEnter}/>
        </div>
      </div>
    );
  }
});

var SearchList = React.createClass({

  render: function() {

    var searchResults = this.props.search.map(function(result){
      return (<MediaItem search_data={result} />);
    });
    return (
      <ul className="media-list searchresults">
        {searchResults}
      </ul>
    );
  }


});

var MediaItem = React.createClass({

  getInitialState: function () {
    return {animate: ""};

  },

  componentDidMount: function () {
    this.setState({animate:"bounceInUp animated"});
  },
  render : function() {
    var imgStyle = {"width":64,"height":64};
    let item = this.props.search_data;
    var premium = item.setup_fee === 1 ? "Setup Fee Applicable" : "No Setup Fees";
    var customization = item.branding == 1 ? "Brand Customization Possible" : "Brand Customization Not Possible";

    return (
      <li className= {"media " + this.state.animate}>
        <div className="media-left">
          <img src={item.image}  alt="Stream Pic" style={imgStyle} className="media-object img-circle" />
        </div>
        <div className="media-body">
          <a href={item.how_to_url}>
            <h4 className="media-heading">{item.name}</h4>
          </a>
          <p> {item.description} </p>
          <p> Rating : <strong>{item.rating}</strong></p>
          <p> Currencies : {item.currencies} </p>
          <p> Transaction Fees : {item.transaction_fees} </p>
          <p> <strong>{premium}</strong> </p>
          <p> <strong>{customization}</strong> </p>
        </div>
      </li>
    );
  }

});

var SearchItem = React.createClass({
  render: function() {
    let item = this.props.search_data;
    return (
      <a href={item.how_to_url} className="list-group-item" target="_blank">
        <h4 className="list-group-item-heading">{item.name}</h4>
        <p className="list-group-item-text"></p>
      </a>
    );
  }
})

var SearchWrapper = React.createClass({
  getSearchResults : function (search_text) {
    var text = search_text.text;
    var url = "/paymentdetail_list/?search="+text;
    $.ajax({
    url: url,
    dataType: "jsonp",
    type: 'GET',
    headers: { 'Api-User-Agent': 'Example/1.0' },
    success: function(data) {
      this.setState({ search : data});
    }.bind(this),
    error: function(xhr,err){
      console.error("Error occured file fetching!");
      console.error(xhr.responseText);

    }

   });
},

componentDidMount : function () {
    var url = "/paymentdetail_list/";
    $.ajax({
    url: url,
    dataType: "jsonp",
    type: 'GET',
    headers: { 'Api-User-Agent': 'Example/1.0' },
    success: function(data) {
      this.setState({ search : data});
    }.bind(this),
    error: function(xhr,err){
      console.error("Error occured file fetching!");
      console.error(xhr.responseText);
    }

   });

},

getInitialState: function () {
  return {search: []};
},

render: function() {
  return (
    <div className="container">
      <SearchBox onTextChange={this.getSearchResults} />
      <SearchList search={this.state.search} />
    </div>
  );
}

});

ReactDOM.render(<SearchWrapper />,document.getElementById('dummy'));
