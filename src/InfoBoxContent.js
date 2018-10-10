import React, { Component } from "react";

class InfoBoxContent extends Component {
  state = {
    teste: '',
    dataFailed: false
  }

  componentDidMount() {
    this.testeWiki(this.props.artData.wiki)
  }

  testeWiki(title) {
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${title}`;
    let text;
    fetch(url)
      .then(resp => resp.json())
      .then(data => {
        !data.extract ?
          text = `There's no Wikipedia article for '${this.props.artData.title}' painting.` :
          text = data.extract;
        console.log(data)
        this.setState({
          teste: text
        })
      }).catch(err => {
        console.log(err)
        this.setState({
          dataFailed: true
        })
        console.log(this.state.dataFailed)
      })
  }
  render() {
    return (
      <div className="ibContent">
        <div className="painting">
          <img src={this.props.artData.img} alt={this.props.artData.title} />
        </div>
        <section className="info">
          <h2>{this.props.artData.title}</h2>
          <p>Year: {this.props.artData.year}</p>
          <p>Image: <em>wikiart.org</em></p>
        </section>
        <section className="wiki">
          <h3>WIKIPEDIA</h3>
          {(this.state.dataFailed === true) && <span className="error">FAILED TO FETCH DATA FROM WIKIPEDIA</span>}
          <p>{this.state.teste}</p>
        </section>
      </div>
    );
  }
}

export default InfoBoxContent;
