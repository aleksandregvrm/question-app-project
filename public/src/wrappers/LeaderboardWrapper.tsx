import styled from "styled-components";

const Wrapper = styled.main`
    min-height: 1000px;
    padding: 1rem;
    margin-bottom: 2rem;
    .leaderboard-text{
        margin-top: 2rem;
        display: flex;
        flex-wrap: wrap;
        gap: 4rem;
        align-items: center;
        justify-content: center;
    }
    p{
        max-width: 700px;
    }
    .leaderboard-list{
        margin-top: 2rem;
        text-align: center;
    }
    .leaderboard-list-container{
        display: flex;
        justify-content: space-between;
        max-width: 900px;
        height: 195px;
        padding: 1rem;
        align-items: center;
        border: 1px solid var(--primary-black);
        position: relative;
        border-radius: 1.5rem;
        margin: 1rem auto;
    }
    .leaderboard-list h2{
        font-size: 1.1rem;
    }
    .leaderboard-list h3{
        font-size: 1rem;
    }
    .leaderboard-img{
        width: 180px;
        object-fit: cover;
    }
    .leaderboard-stat-img{
        width: 110px;
        object-fit: cover;
    }
    .place{
        position: absolute;
      top: 1rem;
      right: 1rem;
    }
    .name-img{
        text-align: left;
    }
    .place1{
        background: gold;

    }
    .place2{
       background:#C0C0C0;
    }
    .place3{
      background: #7F735F;
    }
    @media screen and (min-width:980px){
        h2{
        font-size: 1.5rem;
        }
        h3{
        font-size: 1.1rem;
        }
    }
`
export default Wrapper;