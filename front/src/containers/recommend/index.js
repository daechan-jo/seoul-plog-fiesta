const RecommendContainer = () => {
  return (
    <main>
      <div
        className="gContainer  gList navVh"
        style={{ justifyContent: 'space-between' }}
      >
        <div className="titleContainer">
          <h1>추천 경로</h1>
        </div>
        <div
          className="iframeContainer"
          style={{
            width: '75vw',
            maxWidth: '1200px',
            maxHeight: '700px',
            height: '80vh',
            overflow: 'hidden',
            overflowX: 'hidden',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <iframe
            style={{
              width: '75vw',
              maxWidth: '1200px',
              maxHeight: '700px',
              height: '80vw',
            }}
            src="/seoul_course_map.html"
            title="Seoul Course Map"
            frameBorder="0"
          ></iframe>
        </div>
      </div>
    </main>
  );
};

export default RecommendContainer;
