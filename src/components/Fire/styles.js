import styled from 'styled-components';

export const Container = styled.div`
  table {
    border-spacing: 0px;
    background: white;
    display: inline-block;
    left: calc(50% - 150px);
    top: calc(50% - 150px);

    position: absolute;

    td, th {
      width: 3px;
      height: 3px;
      text-align: center;
      margin: 0px;
      padding: 0px;
      font-size: 10px;
    }
  }
`;
