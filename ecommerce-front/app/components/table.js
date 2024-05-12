import styled from "styled-components";

const StyledTable = styled.table`
    width: 100%;
    th{
        text-align: left;
        text-transform: uppercase;
        color: #aaa;
        font-size: .8rem;
    }
    td{
        border-top: 1px solid black;
    }
`;

export default function Table(props) {
    return <StyledTable {...props}/>
};
