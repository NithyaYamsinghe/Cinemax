import React, { Component } from 'react';
import styled from 'styled-components';
import { Link  } from 'react-router-dom';


export default class Footer extends Component {
  render() {
    return <FooterWrapper class="page-footer font-small ">
    
     
      <div class="footer-copyright text-center py-3">
        © 2019 Copyright :
      <Link to="/"> Nithya Yamasinghe</Link>
      </div>
      
    
    </FooterWrapper>
    
  }
}

const FooterWrapper = styled.footer `

background:var(--lightBlue);
position:relative;
margin-top:430px;
bottom: 100%;
width: 100%;
color:var(--mainDark)

`