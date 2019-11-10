import styled from 'styled-components';

// Styled components for button
export const ButtonContainer = styled.button `
  text-transform:capitalize;
  font-size:1.4rem;
  background:transparent;
  border:0.05rem solid var(--mainYellow);
  border-color:${props => 
    props.cart ? "var(--mainYellow)" : "var(--lightBlue))" };
  
  color:${prop =>
    prop.cart ? "var(--mainYellow)" : "var(--lightBlue)"};
  border-radius:0.5rem;
  padding: 0.2rem 0.5rem;
  cursor:pointer;
  margin:0.2rem 0.5rem 0.2rem 0;
  transition:all 0.5 ease-in-out;
  &:hover{
    background:${prop => 
    prop.cart ? "var(--mainYellow)" : "var(--lightBlue)"};
    color:var(--mainBlue);

  }
  &focus{
    outline:none;
  }
`;