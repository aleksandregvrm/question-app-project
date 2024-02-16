import styled from "styled-components";

const Wrapper = styled.main`
    padding: 1rem;
    .home-text{
        margin-top: 2rem;
    }
    .leaderboard-home{
        margin-top: 2rem;
    }
    .leaderboard-photo img{
        max-width:600px;
    }
    .leaderboard-photo{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .prizes-home{
        margin-top: 2rem;
    }
    .prizes-photo{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .prizes-photo img{
        max-width: 600px;
    }
`
export default Wrapper;