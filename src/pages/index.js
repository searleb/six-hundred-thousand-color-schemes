import React from 'react'
import { Link } from 'gatsby'
import axios from 'axios'
import styled from 'styled-components'

import Layout from '../components/layout'
import Image from '../components/image'
import SEO from '../components/seo'

const Background = styled.div`
  background-color: ${props => props.background};
  color: ${props => props.color};
  transition: background-color 0.5s ease, color 0.5s ease;
`;

const Swatch = styled.div`
  height: 150px;
  width: 150px;
  margin: 0.5em;
  display: inline-block;
`;

class IndexPage extends React.Component {
  state = {
    colour: {
      combinations: [{hex: ''}]
    },
    loading: true,
  }
  
  componentDidMount() {
    this.getColours()
  }

  getColours = () => {
    this.setState({loading: true})
    axios.get('https://pantone-colours.now.sh/')
      .then(res => this.setState({...res.data, loading: false}))
      .catch(err => console.error(err))
  }

  render() {
    console.log(this.state);
    return (
      <Layout>
        <Background color={this.state.colour.hex} background={this.state.colour.combinations[Math.floor(Math.random()*(this.state.colour.combinations.length))].hex}>
          <SEO title="Home" keywords={[`Bill Searle`, `web developer`, `react`, `front end`, `front end web developer`, `freelance`]} />
          <h1>Hello 👋</h1>
          <p>
            I'm a front end web developer.
          </p>
          <p>
            I've built products for non-profits, creative agencies, start ups and enterprises.
          </p>
          <p>
            I'm freelancing right now, which means I might be able to help you too.
          </p>
          <p>
            If you're in need of an experienced developer, shoot me a message over at
            {' '}
            <a 
              href='https://www.linkedin.com/in/billsearle/'
              target='_blank'
              rel="noopener noreferrer"
            >
              Linkedin
            </a>
            <button 
              onClick={this.getColours}
              disabled={this.state.loading}
              >
              {this.state.loading ? 'Loading' : 'Update Colors'}
              </button>
          </p>
          <p>{this.state.index}</p>
          <p>{this.state.totalCombinations}</p>
          {this.state.colour.combinations.map(comb => <Swatch style={{ background:comb.hex }} key={comb.hex}>{comb.name} {comb.hex}</Swatch>)}
        </Background>
      </Layout>
    )
  }
}

export default IndexPage
