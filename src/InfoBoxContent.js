import React, { Component } from "react";
import Loading from './Loading';

class InfoBoxContent extends Component {
  state = {
    data: '',
    dataFailed: false,
    loaded: false
  }

  componentDidMount() {
    this.wikiData(this.props.itemData.wiki)
  }

  wikiData(title) {
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${title}`;
    let text;
    fetch(url)
      .then(resp => resp.json())
      .then(data => {
        !data.extract ?
          text = `There's no Wikipedia article for '${this.props.itemData.title}' painting.` :
          text = data.extract;
        this.setState({
          data: text,
          loaded: true
        })
      }).catch(err => {
        console.log(err)
        this.setState({
          dataFailed: true,
          loaded: true
        })
      })
  }
  render() {
    const { itemData } = this.props;
    if (this.state.loaded === false) {
      return <Loading />
    } else {
      return (
        <div className="ibContent">
          <div className="painting">
            <img src={itemData.img} alt={itemData.title} />
          </div>
          <section className="info">
            <h2>{itemData.title}</h2>
            <p>Year: {itemData.year}</p>
            <p>Image: <em>wikiart.org</em></p>
          </section>
          <section className="wiki">
            <h3>WIKIPEDIA</h3>
            {(this.state.dataFailed === true) && <span className="error">FAILED TO FETCH DATA FROM WIKIPEDIA</span>}
            <p>{this.state.data}</p>
          </section>
        </div>
      );
    }
  }
}

export default InfoBoxContent;
