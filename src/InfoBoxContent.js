import React, { Component } from "react";
import Loading from './Loading';
import { LazyLoadImage } from 'react-lazy-load-image-component';

class InfoBoxContent extends Component {
  state = {
    data: '',
    dataFailed: false,
    loaded: false
  }

  componentDidMount() {
    this.wikiData(this.props.itemData.wiki)
  }

  // Fetch data from Wikipedia REST Api
  wikiData(title) {
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${title}`;
    let text;
    fetch(url)
      .then(resp => resp.json())
      .then(data => {
        !data.extract ? // If there's no 'extract' from response, the article page doesn't exist
          text = `There's no Wikipedia article for the '${this.props.itemData.title}' painting.` :
          text = data.extract;
        this.setState({
          data: text,
          loaded: true
        })
      }).catch(err => { // Catch possible errors when trying to fetch data from Wikipedia
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
        // Mounts the Info Box content with data from custom Google Fusion Tables and Wikipedia REST Api 
        <div className="ibContent">
          <div className="painting">
            <img src={itemData.img} alt={itemData.title} />
          </div>
          <section className="info">
            <h2>{itemData.title}</h2>
            <p>Year: <b>{itemData.year}</b></p>
            <p>Located at: <b>{itemData.loc}</b></p>
            <p>Image: <b>wikiart.org</b></p>
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
