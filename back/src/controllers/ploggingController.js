import ploggingService from "../services/ploggingService.js";


const createCertification = async (req, res, next) => {
  try {
    // const certData = req.body;
    const {title, startDt, endDt, description, groupYn, groupName
    , groupId, region, location, distance, trashAmount, averagePace} = req.body;
    const writerUser = req.user.id;
    
    const certData = {title, startDt, endDt, description, groupYn, groupName
      , groupId, region, location, distance, trashAmount, averagePace};

    const certification = await ploggingService.createCertificationBoard(certData, writerUser);
    res.status(201).json({ message: "인증 게시글 저장 완료", certification });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" }); 
    next(error);
  }
};

const getCertification = async (req, res, next) => {
  const certificationId = parseInt(req.params.id);
  try {
    const certification = await ploggingService.getCertificationBoard(certificationId);
    res.status(200).json({ certification });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" }); // Sending a response to the client
    next(error);
  }
};

const getAllCertificationBoards = async (req, res, next) => {
  try {
    const certificationBoards = await ploggingService.getAllCertificationBoards();
    res.status(200).json({ certificationBoards });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" }); // Sending a response to the client
    next(error);
  }
};

const updateCertification = async (req, res, next) => {
  try {
    const certificationId = parseInt(req.params.id);
    const userId = req.user.id;
    const updatedCertData = req.body;
    const certPost = await ploggingService.findByCertId(certificationId);
    
    if(userId !== certPost.writerUser){
      const errorMessage ="해당하는 글의 작성자가 아닙니다. 다시 한 번 확인해 주세요.";
      return res.status(403).json({ message: errorMessage });
    }
    if(!certPost){
      const errorMessage ="해당하는 글의 작성 내역이 없습니다. 다시 한 번 확인해 주세요.";
      return res.status(404).json({ message: errorMessage });
    }

    const updatedCertification = await ploggingService.updateCertificationBoard(certificationId, updatedCertData);
    res.status(200).json({ message: "인증 게시글 수정 완료", certification: updatedCertification });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" }); // Sending a response to the client
    next(error);
  }
};

const deleteCertification = async (req, res, next) => {
  try {
    const certificationId = parseInt(req.params.id);
    const userId = req.user.id;
    // certificationId 찾아오기
    const certPost = await ploggingService.findByCertId(certificationId);
    
    if(userId !== certPost.writerUser){
      const errorMessage ="해당하는 글의 작성자가 아닙니다. 다시 한 번 확인해 주세요.";
      return res.status(403).json({ message: errorMessage });
    }
    if(!certPost){
      const errorMessage ="해당하는 글의 작성 내역이 없습니다. 다시 한 번 확인해 주세요.";
      return res.status(404).json({ message: errorMessage });
    }
  

    await ploggingService.deleteCertificationBoard(certificationId);
    res.status(200).json({ message: "인증 게시글 삭제 완료" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" }); // Sending a response to the client
    next(error);
  }
};

module.exports = {
  createCertification,
  getCertification,
  getAllCertificationBoards,
  updateCertification,
  deleteCertification,
};



