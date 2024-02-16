import LoadingWrapper from '../wrappers/LoadingWrapper';

//Loading which works as a default Loading animation on all pages

const Loading = () => {
    return (
        <LoadingWrapper>
            <div className="loading-container">
                <div className="loading-spinner"></div>
            </div>
        </LoadingWrapper>
    );
};

export default Loading