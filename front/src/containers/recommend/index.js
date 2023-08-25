const RecommendContainer = () => {
  return (
    <main>
      <div className="gContainer  gList navVh">
        <div className="titleContainer">
          <h1>추천 경로</h1>
        </div>
        <div
          className="iframeContainer"
          style={{ width: '100%', height: '100%' }}
        >
          <iframe
            style={{ width: '100%', height: '100%' }}
            src="/seoul_course_map.html"
            title="Seoul Course Map"
            frameborder="0"
          ></iframe>
        </div>
      </div>
    </main>
  );
};

export default RecommendContainer;
