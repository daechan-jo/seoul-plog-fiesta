const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

  // groupId 찾기
  async function findByGroupName(groupName) {
    try {
      const groupId = await prisma.group.findUnique({
        where: {
          name: groupName
        }
      });
      return groupId;
    } catch (error) {
      throw error;
    }
  }

  // certificationId가 있는지 체크
  async function findByCertId(certificationId) {
    try {
      const result = await prisma.plogging_certification_board.findUnique({
        where: {
          id: certificationId
        }
      });
      return result;
    } catch (error) {
      throw error;
    }
  }

  async function createCertificationBoard(certData, writerUser) {
    try {
      const certificationBoard = await prisma.plogging_certification_board.create({
        data: {
          ...certData,
          writerUser: writerUser,
        },
      });
      console.log('Certification board created:', certificationBoard);
      return certificationBoard;
    } catch (error) {
      console.error('Error creating certification board:', error);
      throw error;
    }
  }
  
  async function getCertificationBoard(boardId) {
    try {
      const certificationBoard = await prisma.plogging_certification_board.findUnique({
        where: { id: boardId },
      });
      console.log('Certification board:', certificationBoard);
      return certificationBoard;
    } catch (error) {
      console.error('Error getting certification board:', error);
      throw error;
    }
  }

  // read : 글 1개
// async function getCertificationBoard(boardId) {
//   try {
//     const certificationBoard = await prisma.plogging_certification_board.findUnique({
//       where: { id: boardId },
//     });
//     console.log('Certification board:', certificationBoard);
//   } catch (error) {
//     console.error('Error getting certification board:', error);
//   } 
// }

// read : 글 전부
async function getAllCertificationBoards() {
  try {
    const certificationBoards = await prisma.plogging_certification_board.findMany();
    console.log('All certification boards:', certificationBoards);
    return certificationBoards;
  } catch (error) {
    console.error('Error getting certification boards:', error);
  }
}
  
async function updateCertificationBoard(boardId, updatedData) {
  try {
    const updatedCertificationBoard = await prisma.plogging_certification_board.update({
      where: { id: boardId },
      data: updatedData,
    });
    console.log('Certification board updated:', updatedCertificationBoard);
    return updatedCertificationBoard;
  } catch (error) {
    console.error('Error updating certification board:', error);
    throw error;
  }
}
  
  async function deleteCertificationBoard(boardId) {
    try {
      await prisma.plogging_certification_board.delete({
        where: { id: boardId },
      });
      console.log('Certification board deleted');
    } catch (error) {
      console.error('Error deleting certification board:', error);
      throw error;
    }
  }
  
  module.exports = {
    findByCertId,
    createCertificationBoard,
    getCertificationBoard,
    getAllCertificationBoards,
    updateCertificationBoard,
    deleteCertificationBoard,
  };

